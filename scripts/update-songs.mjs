// 每月由 GitHub Actions 執行：合併多個流行歌單 → charts.json；讀取木箱鼓翻奏頻道 → covers.json
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { parseTitle } from './parse-title.mjs';
import { makeYT } from './yt-core.mjs';
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
covers.updated = today;
writeFileSync('covers.json', JSON.stringify(covers, null, 1) + '\n');
