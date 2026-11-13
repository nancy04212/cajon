// 在 Chrome 的 youtube.com 分頁執行：判讀 A FU 鼓譜影片「有鼓的時段」。
// 用法：把整份檔案貼進 youtube.com 頁面執行，再呼叫 await cajonDrums(['影片id', ...])
// 回傳每支影片一行：id|len|有鼓時段(秒，a-b,c-d)|購譜連結(可空)；判讀不可靠的回傳 id|fail
(() => {
  const spec = async id => {
    const h = await (await fetch('/watch?v=' + id)).text();
    const m = h.match(/var ytInitialPlayerResponse = (\{.*?\});(?:var|<\/script>)/s);
    const pr = JSON.parse(m[1]), vd = pr.videoDetails || {};
    const p = pr.storyboards.playerStoryboardSpecRenderer.spec.split('|'), L = p.length - 2, f = p[p.length - 1].split('#');
    return { len: +vd.lengthSeconds, desc: vd.shortDescription || '', sb: { url: p[0].replace('$L', L), sig: f[7], w: +f[0], h: +f[1], n: +f[2], c: +f[3], r: +f[4], iv: +f[5] / 1000 } };
  };
  const sheets = async sb => {
    const per = sb.c * sb.r, out = [];
    for (let k = 0; k < Math.ceil(sb.n / per); k++) {
      const img = new Image(); img.crossOrigin = 'anonymous'; img.src = sb.url.replace('$N', 'M' + k) + '&sigh=' + sb.sig;
      await new Promise(r => { img.onload = r; img.onerror = r; });
      if (!img.width) break;
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0);
      for (let j = 0; j < per && k * per + j < sb.n; j++) out.push({ x, fx: (j % sb.c) * sb.w, fy: Math.floor(j / sb.c) * sb.h, t: (k * per + j) * sb.iv });
    }
    return out;
  };
  const hi = (fr, sb) => {
    const W = sb.w, y0 = Math.round(sb.h * 0.82), H = sb.h - y0, lines = []; let prev = null;
    for (const f of fr) {
      const d = f.x.getImageData(f.fx, f.fy + y0, W, H).data, g = (x, y) => { const i = (y * W + x) * 4; return (d[i] + d[i + 1] + d[i + 2]) / 3; };
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
    lines.forEach((l, i) => { if (l.blank || l.rest) return; const end = i + 1 < lines.length ? lines[i + 1].t : 1e9; const z = on[on.length - 1]; if (z && z[1] === l.t) z[1] = end; else on.push([l.t, end]); });
    return on;
  };
  const lo = (fr, sb) => {
    const y0 = Math.round(sb.h * 0.87);
    const st = fr.map(f => { const d = f.x.getImageData(f.fx + 2, f.fy + y0, sb.w - 4, sb.h - y0 - 1).data; let s = 0, dk = 0, n = 0; for (let i = 0; i < d.length; i += 4) { const v = (d[i] + d[i + 1] + d[i + 2]) / 3; s += v; if (v < 140) dk++; n++; } const dr = dk / n; return s / n > 185 && dr > 0.03 && dr < 0.35 ? 1 : 0; });
    for (let i = 1; i + 1 < st.length; i++) if (st[i - 1] === st[i + 1] && st[i] !== st[i - 1]) st[i] = st[i - 1];
    const on = []; st.forEach((v, i) => { if (!v) return; const t = i * sb.iv, z = on[on.length - 1]; if (z && z[1] === t) z[1] = t + sb.iv; else on.push([t, t + sb.iv]); });
    return on.filter(x => x[1] - x[0] >= 6);
  };
  const one = async id => {
    const v = await spec(id), fr = await sheets(v.sb);
    let on = v.sb.w >= 320 ? hi(fr, v.sb) : [];
    if (!on.length) on = lo(fr, v.sb);
    on = on.map(([a, b]) => [a, Math.min(b, v.len)]);
    const fm = v.desc.match(/有鼓的地方[^\d]*(\d+):(\d\d)/), fu = fm ? +fm[1] * 60 + +fm[2] : null;
    const tot = on.reduce((a, o) => a + o[1] - o[0], 0);
    let ok = on.length && tot >= 0.35 * v.len && on.length <= 8;
    if (ok && fu != null) { if (Math.abs(on[0][0] - fu) > 8) ok = false; else on[0][0] = fu; }
    if (!ok && fu != null) { on = [[fu, v.len]]; ok = true; }
    if (!ok) return id + '|fail';
    const m = []; on.forEach(o => { const z = m[m.length - 1]; if (z && o[0] - z[1] < 6) z[1] = o[1]; else m.push(o.slice()); });
    const b = v.desc.match(/https?:\/\/(?:www\.)?mymusic[\w.]*\/afucajon\/\d+/);
    return [id, v.len, m.filter(x => x[1] - x[0] >= 4).map(x => x.join('-')).join(','), b ? b[0].replace(/^https?:\/\//, '') : ''].join('|');
  };
  window.cajonDrums = async ids => { const out = []; for (const id of ids) { try { out.push(await one(id)); } catch (e) { out.push(id + '|error'); } } return out; };
})();
