// 從 A FU Cajon 影片的 YouTube 分鏡圖（storyboard）判讀「有鼓的時段」。
// 影片下方會顯示動態鼓譜：有譜線且不是整行休止 = 有鼓；黑畫面或沒有譜 = 沒鼓。
import jpeg from 'jpeg-js';

const HDR = { 'Accept-Language': 'zh-TW,zh;q=0.9', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36', Cookie: 'SOCS=CAI; CONSENT=YES+1' };

export async function videoInfo(id) {
  const html = await (await fetch(`https://www.youtube.com/watch?v=${id}&hl=zh-TW`, { headers: HDR })).text();
  const m = html.match(/var ytInitialPlayerResponse = (\{.*?\});(?:var|<\/script>)/s);
  if (!m) throw new Error('no player response');
  const pr = JSON.parse(m[1]), vd = pr.videoDetails || {};
  const spec = pr.storyboards?.playerStoryboardSpecRenderer?.spec;
  if (!spec) throw new Error('no storyboard');
  const p = spec.split('|'), L = p.length - 2, f = p[p.length - 1].split('#');
  return {
    title: vd.title || '', len: +vd.lengthSeconds || 0, desc: vd.shortDescription || '',
    sb: { url: p[0].replace('$L', L), sig: f[7], w: +f[0], h: +f[1], n: +f[2], c: +f[3], r: +f[4], iv: +f[5] / 1000 }
  };
}

async function frames(sb) {
  const per = sb.c * sb.r, out = [];
  for (let k = 0; k < Math.ceil(sb.n / per); k++) {
    const res = await fetch(sb.url.replace('$N', 'M' + k) + '&sigh=' + sb.sig, { headers: HDR });
    if (!res.ok) break;
    const img = jpeg.decode(Buffer.from(await res.arrayBuffer()), { useTArray: true });
    for (let j = 0; j < per && k * per + j < sb.n; j++) out.push({ img, fx: (j % sb.c) * sb.w, fy: Math.floor(j / sb.c) * sb.h, t: (k * per + j) * sb.iv });
  }
  return out;
}
const px = (img, x, y) => { const i = (y * img.width + x) * 4; return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3; };

// 高解析分鏡（320 寬）：逐行讀譜，整行休止也算沒鼓
function linesHi(fr, sb) {
  const W = sb.w, y0 = Math.round(sb.h * 0.82), H = sb.h - y0, lines = []; let prev = null;
  for (const f of fr) {
    const g = (x, y) => px(f.img, f.fx + x, f.fy + y0 + y);
    let mean = 0; for (let y = 0; y < H; y++) for (let x = 0; x < W; x += 2) mean += g(x, y); mean /= H * W / 2;
    const sig = []; for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 4) sig.push(g(x, y));
    const diff = prev ? sig.reduce((a, v, i) => a + Math.abs(v - prev[i]), 0) / sig.length : 999; prev = sig;
    const last = lines[lines.length - 1];
    if (mean < 200) { if (!last || !last.blank) lines.push({ t: f.t, blank: true }); continue; }
    if (diff < 6 && last && !last.blank) continue;
    const staff = []; for (let y = 0; y < H; y++) { let c = 0; for (let x = 0; x < W; x++) if (g(x, y) < 180) c++; if (c / W > 0.6) staff.push(y); }
    if (staff.length < 2) { lines.push({ t: f.t, blank: true }); continue; }
    const top = staff[0], bot = staff[staff.length - 1], prof = [];
    for (let x = 0; x < W; x++) { let ink = 0; for (let y = Math.max(0, top - 9); y <= Math.min(H - 1, bot + 3); y++) { if (staff.includes(y)) continue; if (g(x, y) < 140) ink++; } prof.push(ink); }
    let empty = 0, st = -1;
    for (let x = 6; x <= W - 3; x++) { const e = x < W - 3 && prof[x] <= 1; if (e && st < 0) st = x; if (!e && st >= 0) { if (x - st >= 30) empty += x - st; st = -1; } }
    lines.push({ t: f.t, rest: empty / W >= 0.55 });
  }
  const on = [];
  lines.forEach((l, i) => { if (l.blank || l.rest) return; const end = i + 1 < lines.length ? lines[i + 1].t : Infinity; const last = on[on.length - 1]; if (last && last[1] === l.t) last[1] = end; else on.push([l.t, end]); });
  return on;
}
// 低解析分鏡（160 寬）：只看下方有沒有譜
function linesLo(fr, sb) {
  const y0 = Math.round(sb.h * 0.87), st = fr.map(f => {
    let sum = 0, dk = 0, cnt = 0;
    for (let y = y0; y < sb.h - 1; y++) for (let x = 2; x < sb.w - 2; x++) { const v = px(f.img, f.fx + x, f.fy + y); sum += v; if (v < 140) dk++; cnt++; }
    const mean = sum / cnt, dr = dk / cnt; return mean > 185 && dr > 0.03 && dr < 0.35 ? 1 : 0;
  });
  for (let i = 1; i + 1 < st.length; i++) if (st[i - 1] === st[i + 1] && st[i] !== st[i - 1]) st[i] = st[i - 1];
  const on = []; st.forEach((v, i) => { if (!v) return; const t = i * sb.iv, l = on[on.length - 1]; if (l && l[1] === t) l[1] = t + sb.iv; else on.push([t, t + sb.iv]); });
  return on.filter(x => x[1] - x[0] >= 6);
}

const BUY = /https?:\/\/(?:www\.)?mymusic[\w.]*\/afucajon\/\d+/;
// 回傳 { on, len, buy } 或 null（判讀不可靠）
export async function analyzeDrums(id) {
  const v = await videoInfo(id), fr = await frames(v.sb);
  let on = v.sb.w >= 320 ? linesHi(fr, v.sb) : [];
  if (!on.length) on = linesLo(fr, v.sb);
  on = on.map(([a, b]) => [a, Math.min(b, v.len)]);
  const fm = v.desc.match(/有鼓的地方[^\d]*(\d+):(\d\d)/), fu = fm ? +fm[1] * 60 + +fm[2] : null;
  const tot = on.reduce((a, o) => a + o[1] - o[0], 0);
  let ok = on.length && tot >= 0.35 * v.len && on.length <= 8;
  if (ok && fu != null) { if (Math.abs(on[0][0] - fu) > 8) ok = false; else on[0][0] = fu; }
  if (!ok && fu != null) { on = [[fu, v.len]]; ok = true; }
  if (!ok) return { title: v.title, fail: true };
  const m = []; on.forEach(o => { const l = m[m.length - 1]; if (l && o[0] - l[1] < 6) l[1] = o[1]; else m.push(o.slice()); });
  const b = v.desc.match(BUY);
  return { title: v.title, on: m.filter(x => x[1] - x[0] >= 4), len: v.len, buy: b ? b[0] : '' };
}
