// 從 YouTube 影片標題拆出「歌名」與「歌手」。瀏覽器與 Node 共用。
export function parseTitle(raw, channel = '') {
  const CJK = /[㐀-鿿豈-﫿]/;
  const leadName = s => { s = s.trim(); const m = s.match(/^[㐀-鿿豈-﫿][㐀-鿿豈-﫿·・]*/); return m ? m[0] : s.replace(/\s*-\s*Topic$/i, '').slice(0, 24).trim(); };
  const cjkTokens = s => { const tk = s.trim().split('/')[0].split(/\s+/); const i = tk.findIndex(x => CJK.test(x)); if (i < 0) return ''; const out = []; for (let j = i; j < tk.length && CJK.test(tk[j]); j++) out.push(tk[j]); return out.join(' ').replace(/[【〈\[《(（].*$/, '').trim(); };
  const stripJunk = s => s.replace(/[（(\[【][^）)\]】]*[）)\]】]/g, ' ').replace(/[|｜].*$/, '').replace(/\b(official|music video|lyric video|lyrics?|visualizer|mv)\b.*$/i, '').replace(/\s+/g, ' ').trim();
  let t = String(raw).replace(/\s+/g, ' ').trim().replace(/[『「][^』」]*[』」]/g, ' ').replace(/[♫♪]/g, ' ');
  const noParen = t.replace(/[（(][^）)]*[）)]/g, ' ').replace(/\s+/g, ' ').trim();
  const base = CJK.test(noParen) ? noParen : t;
  let song = '', artist = '';
  const bm = base.match(/^(.*?)\s*[【〈\[《]\s*([^】〉\]》]+?)\s*[】〉\]》]/);
  const dm = base.match(/^(.+?)\s+[-–—]\s+(.+)$/);
  const bIdx = bm ? bm[1].length : Infinity, dIdx = dm ? dm[1].length : Infinity;
  if (bm && bm[2].trim() && bIdx <= dIdx && !/^(official|高音質|動態歌詞)/i.test(bm[2].trim())) { artist = bm[1]; song = bm[2]; }
  else if (dm) { artist = dm[1]; song = dm[2]; }
  else { song = base; artist = channel; }
  if (!artist.trim()) artist = channel;
  let s = cjkTokens(song) || cjkTokens(t.match(/[（(]([^）)]*)[）)]/)?.[1] || '');
  if (!s) { const q = song.match(/[“"]([^”"]+)[”"]/); s = q ? q[1] : stripJunk(song); }
  return { song: s.trim(), artist: leadName(artist.replace(/\s*[-–—]\s*$/, '')) };
}
