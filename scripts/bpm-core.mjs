// 用 songbpm.com（Spotify 資料）依「歌手 + 歌名」查 BPM
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const decode = s => s.replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));

export async function songbpm(q) {
  const res = await fetch('https://songbpm.com/searches', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': UA }, body: 'query=' + encodeURIComponent(q), redirect: 'follow' });
  const html = await res.text();
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0].replace(/<script[\s\S]*?<\/script>/g, '');
  const toks = main.split(/<[^>]+>/).map(s => decode(s).trim()).filter(Boolean);
  const out = [];
  for (let i = 0; i < toks.length; i++) {
    if (toks[i] !== 'Key') continue;
    let dur = 0, bpm = 0;
    for (let k = i; k < i + 8; k++) {
      if (toks[k] === 'Duration' && /^\d+:\d\d$/.test(toks[k + 1] || '')) { const [m, s] = toks[k + 1].split(':'); dur = +m * 60 + +s; }
      if (toks[k] === 'BPM' && /^\d+$/.test(toks[k + 1] || '')) bpm = +toks[k + 1];
    }
    if (bpm) out.push({ a: toks[i - 2], t: toks[i - 1], dur, bpm });
  }
  return out;
}

const norm = s => String(s || '').toLowerCase().replace(/(ft|feat)\.?.*/, '').replace(/[\s\-_,，.。!！?？'’"“”()（）\[\]【】《》<>:：/&×]+/g, '');
const ov = (a, b) => { const x = [...norm(a)], y = norm(b); return x.length ? x.filter(c => y.includes(c)).length / x.length : 0; };
const BAD = /dj|remix|伴奏|加速|減速|减速|0\.\d+x|live|cover|翻自|女版|男版|抖音|铃声|鈴聲|instrumental|karaoke|piano|钢琴|鋼琴|纯音乐|純音樂|版\)|版）|版$/i;

export function pickBpm(artist, title, len, res) {
  let best = null, bs = -1;
  const t0 = title.replace(/\s+[A-Za-z].*$/, '') || title, a0 = artist.replace(/[A-Za-z].*$/, '') || artist;
  for (const r of res) {
    if (BAD.test(r.t)) continue;
    const st = Math.max(ov(t0, r.t.replace(/[（(][^）)]*[）)]/g, '')), ov(title, r.t));
    if (st < 0.55) continue;
    let s = st + 0.3 * ov(a0, r.a) + 0.3 * ov(r.a, artist);
    if (len && r.dur) { const d = Math.abs(r.dur - len); s += d < 15 ? 0.5 : d < 35 ? 0.2 : -0.3; }
    if (s > bs) { bs = s; best = r; }
  }
  return best;
}

export async function findBpm(artist, title, len = 0) {
  const ar = String(artist || '').replace(/\(.*?\)/g, '').trim();
  let res = await songbpm((ar ? ar + ' ' : '') + title), p = pickBpm(ar, title, len, res);
  if (!p) { res = await songbpm(title); p = pickBpm(ar, title, len, res); }
  return p;
}
