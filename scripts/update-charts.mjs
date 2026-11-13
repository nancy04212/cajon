// 每月由 GitHub Actions 執行：讀取 YouTube 排行榜播放清單，寫入 charts.json
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { parseTitle } from './parse-title.mjs';
const PLAYLIST = process.env.PLAYLIST_ID || 'PL3oW2tjiIxvTUfDOkivqSDxrxfQccwxsN';
const res = await fetch(`https://www.youtube.com/playlist?list=${PLAYLIST}&hl=zh-TW&gl=TW`, {
  headers: { 'Accept-Language': 'zh-TW,zh;q=0.9', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36', Cookie: 'SOCS=CAI; CONSENT=YES+1' }
});
const html = await res.text();
const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
if (!m) { console.error('找不到播放清單資料'); process.exit(1); }
const data = JSON.parse(m[1]);
const rows = [];
(function walk(o) {
  if (!o || typeof o !== 'object') return;
  if (o.lockupViewModel && o.lockupViewModel.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO') {
    const x = o.lockupViewModel, md = x.metadata?.lockupMetadataViewModel;
    const parts = (md?.metadata?.contentMetadataViewModel?.metadataRows || []).map(r => (r.metadataParts || []).map(p => p.text?.content || ''));
    rows.push({ yt: x.contentId, raw: md?.title?.content || '', channel: parts[0]?.[0] || '' }); return;
  }
  if (o.playlistVideoRenderer) { const r = o.playlistVideoRenderer; rows.push({ yt: r.videoId, raw: r.title?.runs?.[0]?.text || '', channel: r.shortBylineText?.runs?.[0]?.text || '' }); return; }
  for (const k in o) walk(o[k]);
})(data);
const seen = new Set(), items = [];
for (const r of rows) {
  const { song, artist } = parseTitle(r.raw, r.channel);
  if (!song || seen.has(song)) continue; seen.add(song);
  items.push({ rank: items.length + 1, yt: r.yt, title: song, artist, raw: r.raw.slice(0, 160) });
}
if (items.length < 10) { console.error('歌曲太少，可能讀取失敗：', items.length); process.exit(1); }
const out = { updated: new Date().toISOString().slice(0, 10), playlist: PLAYLIST, items };
const prev = existsSync('charts.json') ? JSON.parse(readFileSync('charts.json', 'utf8')) : null;
if (prev && JSON.stringify(prev.items) === JSON.stringify(items)) { console.log('沒有變化'); process.exit(0); }
writeFileSync('charts.json', JSON.stringify(out, null, 1) + '\n');
console.log(`已更新 ${items.length} 首`);
