// 每月由 GitHub Actions 執行：合併多個流行歌單 → charts.json；讀取木箱鼓翻奏頻道 → covers.json
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { parseTitle } from './parse-title.mjs';
import { makeYT } from './yt-core.mjs';
import { analyzeDrums } from './drums-core.mjs';
import { findBpm } from './bpm-core.mjs';
const cfg = JSON.parse(readFileSync(new URL('./sources.json', import.meta.url)));
const yt = makeYT();
const norm = s => String(s).toLowerCase().replace(/[\s·・,，.。!！?？'"“”‘’()（）\[\]【】-]/g, '');
const today = new Date().toISOString().slice(0, 10);

// 1) 排行榜
const pool = new Map(), used = [];
for (const src of cfg.sources) {
  try {
    let id = src.id, title = src.name;
    if (src.type === 'search') { const hit = await yt.findPlaylist(src.query, src.match); if (!hit) { console.log('找不到歌單：', src.name); continue; } id = hit.id; title = hit.title; }
    const vids = await yt.allVideos('/playlist?list=' + id, 3);
    const seen = new Set(); let rank = 0;
    for (const v of vids) {
      const { song, artist } = parseTitle(v.raw, v.channel); const k = norm(song);
      if (!song || seen.has(k)) continue; seen.add(k); rank++;
      const score = 1 - (rank - 1) / Math.max(vids.length, 1);
      const cur = pool.get(k) || { yt: v.yt, title: song, artist, score: 0, sources: [] };
      cur.score += score + 0.5; if (!cur.sources.includes(src.name)) cur.sources.push(src.name);
      pool.set(k, cur);
    }
    used.push({ name: src.name, title, id, count: rank });
    console.log(`${src.name}: ${rank} 首（${title}）`);
  } catch (e) { console.log('讀取失敗', src.name, e.message); }
}
const items = [...pool.values()].sort((a, b) => b.score - a.score).slice(0, cfg.max).map((x, i) => ({ rank: i + 1, yt: x.yt, title: x.title, artist: x.artist, sources: x.sources }));
if (items.length >= 15) {
  const prev = existsSync('charts.json') ? JSON.parse(readFileSync('charts.json', 'utf8')) : null;
  if (!prev || JSON.stringify(prev.items) !== JSON.stringify(items)) writeFileSync('charts.json', JSON.stringify({ updated: today, sources: used, items }, null, 1) + '\n');
} else console.log('歌曲太少，保留原本 charts.json');

// 2) 木箱鼓翻奏頻道（累積，不會刪除舊資料）
const covers = existsSync('covers.json') ? JSON.parse(readFileSync('covers.json', 'utf8')) : { updated: '', items: [] };
const have = new Set(covers.items.map(c => c.yt));
for (const ch of cfg.coverChannels) {
  try {
    const vids = await yt.allVideos('/' + ch.handle + '/videos', 40);
    let added = 0;
    for (const v of vids) {
      if (have.has(v.yt) || !/cajon|木箱鼓/i.test(v.raw) || /純鼓聲/.test(v.raw)) continue;
      const m = v.raw.match(/^(.*?)\s*-?\s*【([^】]+)】/) || v.raw.match(/^(.+?)\s+-\s+(.+?)\s+-\s+(?:木箱鼓|Cajon)/i);
      if (!m) continue;
      covers.items.push({ yt: v.yt, artist: m[1].replace(/\s*-\s*$/, '').trim(), song: m[2].replace(/\s*-\s*(簡易版|進階版|進階cover版).*$/, '').trim(), by: ch.name, sheet: /鼓譜|sheet/i.test(v.raw) });
      have.add(v.yt); added++;
    }
    console.log(`${ch.name}: 新增 ${added} 支，共 ${covers.items.length}`);
  } catch (e) { console.log('讀取失敗', ch.name, e.message); }
}
// 清單（含純鼓聲版）
const splitTitle = raw => raw.match(/^(.*?)\s*-?\s*【([^】]+)】/) || raw.match(/^(.+?)\s*-\s*(.+?)(?:\s*[\(（]?(?:音樂版&)?純鼓聲版?[\)）]?)?\s*-?\s*(?:木箱鼓|Cajon)/i);
for (const pl of cfg.coverPlaylists || []) {
  try {
    const vids = await yt.allVideos('/playlist?list=' + pl.id, 20); let added = 0;
    for (const v of vids) {
      if (have.has(v.yt)) continue;
      const m = splitTitle(v.raw); if (!m) continue;
      const pure = pl.pure || /純鼓聲/.test(v.raw);
      let song = m[2].replace(/[\(（]?(?:音樂版&)?純鼓聲版?[\)）]?/g, '').replace(/《.*?》.*$/, '').replace(/\s*-\s*(簡易版|進階版|進階cover版).*$/, '').trim();
      if (pure) song += '（純鼓聲版）';
      covers.items.push({ yt: v.yt, artist: m[1].replace(/\s*-\s*$/, '').trim(), song, by: pl.name, sheet: true, ...(pure ? { pure: true } : {}) });
      have.add(v.yt); added++;
    }
    console.log(`清單 ${pl.id}: 新增 ${added} 支`);
  } catch (e) { console.log('讀取清單失敗', pl.id, e.message); }
}
covers.updated = today;
writeFileSync('covers.json', JSON.stringify(covers, null, 1) + '\n');

// 3) 判讀 A FU 鼓譜影片的有鼓時段 → drums.json
const drums = existsSync('drums.json') ? JSON.parse(readFileSync('drums.json', 'utf8')) : { items: {} };
drums.tried = drums.tried || [];
const only = (process.env.DRUMS_ONLY || '').split(',').filter(Boolean);
const todo = only.length ? only : covers.items.filter(c => /A FU/i.test(c.by) && !drums.items[c.yt] && !drums.tried.includes(c.yt)).map(c => c.yt).slice(0, 60);
let dOk = 0;
for (const id of todo) {
  try {
    const r = await analyzeDrums(id);
    if (only.length) console.log('鼓譜判讀', id, JSON.stringify(r.fail ? 'fail' : r.on), r.len);
    if (r.fail) { if (!only.length) drums.tried.push(id); continue; }
    const pure = covers.items.find(c => c.yt === id)?.pure;
    if (!only.length) { drums.items[id] = { on: r.on, len: r.len, buy: r.buy || 'https://bit.ly/3ohHxzI', ...(pure ? { pure: 1 } : {}) }; dOk++; }
  } catch (e) { console.log('鼓譜判讀失敗', id, e.message); }
}
if (!only.length) { drums.updated = today; writeFileSync('drums.json', JSON.stringify(drums) + '\n'); }
console.log(`鼓譜判讀：處理 ${todo.length} 支，成功 ${dOk} 支`);

// 4) 查 BPM（songbpm.com）→ bpm.json
const bpms = existsSync('bpm.json') ? JSON.parse(readFileSync('bpm.json', 'utf8')) : { items: {} };
bpms.miss = bpms.miss || {};
const songsAll = [...covers.items.map(c => ({ yt: c.yt, artist: c.artist, title: c.song.replace('（純鼓聲版）', ''), len: drums.items[c.yt]?.len || 0 })), ...items.map(c => ({ yt: c.yt, artist: c.artist, title: c.title, len: 0 }))];
const byTitle = {}; for (const s of songsAll) if (bpms.items[s.yt]) byTitle[norm(s.title)] = bpms.items[s.yt];
let bOk = 0, bTry = 0;
for (const s of songsAll) {
  if (bpms.items[s.yt]) continue;
  if (byTitle[norm(s.title)]) { bpms.items[s.yt] = byTitle[norm(s.title)]; continue; }
  if (bpms.miss[s.yt] && bpms.miss[s.yt] > Date.now() - 90 * 864e5) continue;
  if (bTry++ >= 150) break;
  try {
    const p = await findBpm(s.artist, s.title, s.len);
    if (p) { bpms.items[s.yt] = p.bpm; byTitle[norm(s.title)] = p.bpm; bOk++; } else bpms.miss[s.yt] = Date.now();
  } catch (e) { console.log('BPM 查詢失敗', s.title, e.message); }
  await new Promise(r => setTimeout(r, 600));
}
bpms.updated = today; writeFileSync('bpm.json', JSON.stringify(bpms) + '\n');
console.log(`BPM：查詢 ${bTry} 首，找到 ${bOk} 首`);
