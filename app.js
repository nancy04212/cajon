(() => {
'use strict';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const DESKTOP = matchMedia('(hover: hover) and (pointer: fine)').matches;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Icons ---------- */
const I = {
  metro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 3h5l4.5 18H5L9.5 3z"/><path d="M12 15l5-9"/><path d="M7.5 15h9"/></svg>',
  lib: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M8 4v16"/><circle cx="13" cy="14.5" r="1.4" fill="currentColor"/><circle cx="17" cy="14.5" r="1" fill="currentColor"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><path d="M17.5 14v7M14 17.5h7"/></svg>',
  me: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>',
  starF: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="8" y="8" width="13" height="13" rx="3"/><path d="M16 8V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h2"/></svg>',
  click: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9.5 3h5l4.5 18H5L9.5 3z"/><path d="M12 15l5-9"/></svg>',
  drum: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="3" width="14" height="18" rx="2.5"/><circle cx="12" cy="11.5" r="3"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  count: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/></svg>',
  swing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 15c3-8 6-8 9 0s6 8 9 0"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>',
  song: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  loop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>',
  sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>'
};

/* ---------- Storage ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem('cajon.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('cajon.' + k, JSON.stringify(v)); } catch (e) {} }
};
const S = Object.assign({
  theme: 'auto', bpm: 90, ts: [4, 4], sub: '1', sound: 'wood', accents: [3, 2, 2, 2], vol: 0.85,
  trainer: false, trStep: 5, trEvery: 4, trMax: 140, gap: false, gapPlay: 2, gapMute: 2,
  gClick: true, gDrum: true, gCount: true, gSwing: 0, gTrainer: false, gTrStep: 3, gTrEvery: 4, gTrMax: 0,
  drumVol: 1, clickVol: 0.55, gBpm: {}
}, store.get('settings', {}));
const saveS = () => store.set('settings', S);
let favs = new Set(store.get('favs', []));
let customs = store.get('customs', []);
let log = store.get('log', {});
let userCreators = store.get('creators', []);

/* ---------- Theme ---------- */
function applyTheme() {
  const t = S.theme === 'auto' ? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark') : S.theme;
  document.documentElement.dataset.theme = t;
  const m = $('meta[name="theme-color"]:not([media])') || (() => { const x = document.createElement('meta'); x.name = 'theme-color'; document.head.appendChild(x); return x; })();
  m.content = t === 'light' ? '#F4F4F6' : '#0B0B0D';
}
matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', applyTheme);
applyTheme();

/* ---------- Audio engine ---------- */
const A = { ctx: null, out: null, noise: null, playing: false, mode: null, nextTime: 0, tick: 0, bar: 0, step: 0, loop: 0, ci: 0, groove: null, owner: null };
const visQ = [];
function silentWav() {
  const n = 800, b = new ArrayBuffer(44 + n * 2), v = new DataView(b), w = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVEfmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, 8000, true); v.setUint32(28, 16000, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, n * 2, true);
  return URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
}
let unlockEl = null;
function ensureAudio() {
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
  if (!A.ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    A.ctx = new C({ latencyHint: 'interactive' });
    const comp = A.ctx.createDynamicsCompressor();
    comp.threshold.value = -10; comp.ratio.value = 4; comp.attack.value = 0.002; comp.release.value = 0.1;
    A.out = A.ctx.createGain(); A.out.gain.value = 0.9;
    A.out.connect(comp); comp.connect(A.ctx.destination);
    const len = A.ctx.sampleRate; const buf = A.ctx.createBuffer(1, len, A.ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    A.noise = buf;
  }
  if (A.ctx.state !== 'running') A.ctx.resume().catch(() => {});
  // iOS: play silent media so Web Audio isn't muted by the ring/silent switch
  if (!unlockEl) { try { unlockEl = new Audio(silentWav()); unlockEl.loop = true; unlockEl.volume = 0.01; unlockEl.play().catch(() => {}); } catch (e) {} }
}
function env(g, t, peak, dec, att = 0.002) {
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + att); g.gain.exponentialRampToValueAtTime(0.0001, t + att + dec);
}
function osc(type, f0, f1, t, peak, dec, glide = 0.08) {
  const c = A.ctx, o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f0, t); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + glide);
  env(g, t, peak, dec); o.connect(g); g.connect(A.out); o.start(t); o.stop(t + dec + 0.05);
}
function noise(t, peak, dec, ftype, freq, q = 1, att = 0.001) {
  const c = A.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = A.noise; f.type = ftype; f.frequency.value = freq; f.Q.value = q;
  env(g, t, peak, dec, att); s.connect(f); f.connect(g); g.connect(A.out);
  s.start(t, Math.random() * 0.5); s.stop(t + dec + 0.05);
}
const cajon = {
  B(t, v) { osc('sine', 130, 52, t, 1.1 * v, 0.42, 0.11); osc('triangle', 95, 60, t, 0.35 * v, 0.18); noise(t, 0.25 * v, 0.04, 'lowpass', 600); },
  T(t, v) { osc('triangle', 260, 175, t, 0.55 * v, 0.2, 0.06); osc('sine', 180, 140, t, 0.4 * v, 0.22); noise(t, 0.28 * v, 0.07, 'bandpass', 1400, 1.2); },
  S(t, v) { noise(t, 0.95 * v, 0.13, 'bandpass', 3200, 0.8); noise(t, 0.4 * v, 0.24, 'highpass', 5500, 0.7); osc('triangle', 380, 260, t, 0.35 * v, 0.06, 0.03); },
  s(t, v) { noise(t, 0.22 * v, 0.06, 'bandpass', 3000, 0.9); noise(t, 0.08 * v, 0.1, 'highpass', 6000); }
};
const SOUNDS = {
  wood: { name: '木魚', play(t, k, v) { const f = k === 'accent' ? 1650 : k === 'sub' ? 1050 : 1250; const p = k === 'accent' ? 1 : k === 'beat' ? 0.7 : k === 'soft' ? 0.35 : 0.3;
      osc('sine', f, f * 0.9, t, p * v, 0.06, 0.02); noise(t, 0.35 * p * v, 0.025, 'bandpass', f * 2, 3); } },
  click: { name: '電子', play(t, k, v) { const f = k === 'accent' ? 2400 : k === 'sub' ? 1300 : 1700; const p = k === 'accent' ? 0.8 : k === 'beat' ? 0.55 : k === 'soft' ? 0.28 : 0.25;
      osc('square', f, 0, t, p * v * 0.5, 0.025); } },
  beep: { name: '嗶聲', play(t, k, v) { const f = k === 'accent' ? 1760 : k === 'sub' ? 660 : 880; const p = k === 'accent' ? 0.6 : k === 'beat' ? 0.45 : k === 'soft' ? 0.22 : 0.2;
      osc('sine', f, 0, t, p * v, 0.09); } },
  cowbell: { name: '牛鈴', play(t, k, v) { const p = k === 'accent' ? 0.55 : k === 'beat' ? 0.4 : k === 'soft' ? 0.2 : 0.18; const m = k === 'accent' ? 1.12 : 1;
      osc('square', 540 * m, 0, t, p * v * 0.4, 0.22); osc('square', 800 * m, 0, t, p * v * 0.4, 0.2); } },
  cajon: { name: '木箱鼓', play(t, k, v) { if (k === 'accent') cajon.B(t, v); else if (k === 'beat') cajon.S(t, v * 0.8); else if (k === 'soft') cajon.s(t, v * 1.6); else cajon.s(t, v); } }
};
const SUBS = [
  { id: '1', name: '四分', g: '♩', n: 1, mask: [1] },
  { id: '2', name: '八分', g: '♫', n: 2, mask: [1, 1] },
  { id: '3', name: '三連音', g: '3', n: 3, mask: [1, 1, 1] },
  { id: '4', name: '十六分', g: '𝅘𝅥𝅯', n: 4, mask: [1, 1, 1, 1] },
  { id: 'sw', name: 'Shuffle', g: '♩♪', n: 3, mask: [1, 0, 1] },
  { id: '816', name: '八+十六', g: '♪♬', n: 4, mask: [1, 0, 1, 1] },
  { id: '168', name: '十六+八', g: '♬♪', n: 4, mask: [1, 1, 0, 1] }
];
const subOf = id => SUBS.find(s => s.id === id) || SUBS[0];
const TSIGS = [[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [2, 2], [3, 8], [5, 8], [6, 8], [7, 8], [9, 8], [12, 8]];
const tempoName = b => b < 40 ? 'Grave 極慢板' : b < 60 ? 'Largo 廣板' : b < 66 ? 'Larghetto 小廣板' : b < 76 ? 'Adagio 慢板' : b < 108 ? 'Andante 行板' : b < 120 ? 'Moderato 中板' : b < 156 ? 'Allegro 快板' : b < 176 ? 'Vivace 活潑' : b < 200 ? 'Presto 急板' : 'Prestissimo 最急板';

// Timer in a worker so background tabs keep time; fallback to setInterval
let timer = null, tickFn = () => schedule();
try {
  const w = new Worker(URL.createObjectURL(new Blob(["let i=null;onmessage=e=>{clearInterval(i);if(e.data==='go')i=setInterval(()=>postMessage(0),25)}"], { type: 'text/javascript' })));
  w.onmessage = tickFn; timer = { start: () => w.postMessage('go'), stop: () => w.postMessage('stop') };
} catch (e) { let id; timer = { start: () => { clearInterval(id); id = setInterval(tickFn, 25); }, stop: () => clearInterval(id) }; }

let wakeLock = null;
async function keepAwake(on) {
  try { if (on && 'wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); else if (!on && wakeLock) { wakeLock.release(); wakeLock = null; } } catch (e) {}
}

function start(mode, owner, opts = {}) {
  ensureAudio(); stop(true);
  A.mode = mode; A.owner = owner; A.playing = true; A.tick = 0; A.bar = 0; A.step = 0; A.loop = 0;
  A.groove = opts.groove || null; A.trainLoops = 0;
  A.ci = (mode !== 'metro' && S.gCount && A.groove) ? A.groove.beats * A.groove.spb : 0; A.ciTot = A.ci;
  A.nextTime = A.ctx.currentTime + 0.08;
  timer.start(); schedule(); keepAwake(true); practice.start(); updatePlayButtons();
}
function stop(silent) {
  if (!A.playing) return;
  A.playing = false; timer.stop(); visQ.length = 0; keepAwake(false); practice.stop();
  $$('.col.on').forEach(e => e.classList.remove('on')); $$('.bar.cur').forEach(e => e.classList.remove('cur'));
  $$('.beat.hit').forEach(e => e.classList.remove('hit')); $('#ci')?.classList.remove('show');
  if (!silent) updatePlayButtons(); else updatePlayButtons();
}
function schedule() {
  if (!A.playing) return;
  while (A.nextTime < A.ctx.currentTime + 0.12) A.mode === 'metro' ? metroTick() : grooveTick();
}
function metroTick() {
  const t = A.nextTime, sub = subOf(S.sub), n = sub.n, beats = S.ts[0];
  const beat = Math.floor(A.tick / n), si = A.tick % n;
  const muted = S.gap && (A.bar % (S.gapPlay + S.gapMute)) >= S.gapPlay;
  const lvl = S.accents[beat] ?? 2, snd = SOUNDS[S.sound] || SOUNDS.wood;
  if (!muted) {
    if (si === 0 && lvl > 0) snd.play(t, lvl === 3 ? 'accent' : lvl === 2 ? 'beat' : 'soft', S.vol);
    else if (si > 0 && sub.mask[si] && lvl > 0) snd.play(t, 'sub', S.vol * 0.75);
  }
  if (si === 0) visQ.push({ t, k: 'beat', beat, muted });
  A.nextTime += 60 / S.bpm / n;
  if (++A.tick >= beats * n) {
    A.tick = 0; A.bar++;
    if (S.trainer && A.bar % S.trEvery === 0 && S.bpm < S.trMax) { S.bpm = Math.min(S.trMax, S.bpm + S.trStep); visQ.push({ t: A.nextTime, k: 'bpm' }); }
  }
}
function grooveTick() {
  const G = A.groove, t = A.nextTime, bpm = G.getBpm();
  let dur = 60 / bpm / G.spb;
  if (A.ci > 0) {
    const i = A.ciTot - A.ci;
    if (i % G.spb === 0) { SOUNDS[S.sound === 'cajon' ? 'wood' : S.sound].play(t, i === 0 ? 'accent' : 'beat', S.clickVol + 0.2); visQ.push({ t, k: 'ci', n: G.beats - i / G.spb }); }
    A.ci--; A.nextTime += dur; if (A.ci === 0) visQ.push({ t: A.nextTime, k: 'ci', n: 0 }); return;
  }
  const ch = G.flat[A.step], spbNow = G.spbAt ? G.spbAt[A.step] : G.spb;
  dur = 60 / bpm / spbNow;
  let off = 0;
  if (S.gSwing && (spbNow === 2 || spbNow === 4) && A.step % 2 === 1) off = (S.gSwing / 100) * dur / 3;
  if (S.gDrum && ch && ch !== '.') cajon[ch](t + off, S.drumVol * (G.accent?.[A.step] ? 1.15 : 1));
  const isBeat = G.beatStart ? G.beatStart[A.step] : A.step % G.spb === 0;
  if (S.gClick && isBeat) {
    const isBar = G.barStart ? G.barStart[A.step] : (A.step / G.spb) % G.beats === 0;
    SOUNDS[S.sound === 'cajon' ? 'wood' : S.sound].play(t, isBar ? 'accent' : 'beat', S.clickVol);
  }
  visQ.push({ t: t + off, k: 'step', step: A.step });
  A.nextTime += dur;
  if (++A.step >= G.flat.length) {
    A.step = 0; A.loop++;
    if (S.gTrainer && G.onLoop) G.onLoop(A.loop, A.nextTime);
  }
}
let lastBeatEl = null;
function visLoop() {
  if (A.ctx && A.playing) {
    const now = A.ctx.currentTime;
    while (visQ.length && visQ[0].t <= now) handleVis(visQ.shift());
  }
  requestAnimationFrame(visLoop);
}
function handleVis(ev) {
  if (ev.k === 'beat') {
    const els = $$('#beats .beat');
    els.forEach(e => e.classList.remove('hit'));
    const el = els[ev.beat]; if (el && !ev.muted) { el.classList.add('hit'); }
    const p = $('#pulse'); if (p && !ev.muted && S.accents[ev.beat] > 0) { p.classList.add('on'); requestAnimationFrame(() => requestAnimationFrame(() => p.classList.remove('on'))); }
    const gs = $('#gapState'); if (gs) gs.textContent = S.gap ? (ev.muted ? '靜音中・心裡數拍' : '') : '';
  } else if (ev.k === 'bpm') { refreshBpm(); toast(`速度提升到 ${S.bpm} BPM`); }
  else if (ev.k === 'step') {
    const map = curGrid; if (!map) return;
    if (map.onStep) return map.onStep(ev.step);
    const prev = map.prev; if (prev) prev.classList.remove('on');
    const el = map.cols[ev.step]; if (el) { el.classList.add('on'); map.prev = el;
      const bar = el.closest('.bar'); if (map.prevBar !== bar) { map.prevBar?.classList.remove('cur'); bar.classList.add('cur'); map.prevBar = bar;
        if (map.autoScroll) { const r = bar.getBoundingClientRect(); if (r.top < 60 || r.bottom > innerHeight - 200) bar.scrollIntoView({ block: 'center', behavior: 'smooth' }); } } }
  } else if (ev.k === 'ci') {
    const b = $('#ci'); if (!b) return;
    if (ev.n > 0) { b.textContent = ev.n; b.classList.add('show'); } else b.classList.remove('show');
  } else if (ev.k === 'gbpm') { refreshPlayerBpm(); toast(`速度提升到 ${ev.bpm} BPM`); }
}
requestAnimationFrame(visLoop);

/* ---------- Practice log ---------- */
const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const practice = {
  t0: 0, iv: null,
  start() { this.t0 = performance.now(); clearInterval(this.iv); this.iv = setInterval(() => this.flush(), 10000); },
  flush() { if (!this.t0) return; const now = performance.now(); const sec = (now - this.t0) / 1000; this.t0 = now; const k = dayKey(); log[k] = (log[k] || 0) + sec; store.set('log', log); },
  stop() { this.flush(); this.t0 = 0; clearInterval(this.iv); }
};

/* ---------- Groove helpers ---------- */
const allGrooves = () => [...customs, ...GROOVES];
const findGroove = id => allGrooves().find(g => g.id === id);
const COUNTS = { 1: ['1'], 2: ['1', '&'], 3: ['1', '&', 'a'], 4: ['1', 'e', '&', 'a'] };
function prep(g, getBpm) {
  const flat = g.bars.join('').split('');
  const beats = g.ts[0], spb = g.spb;
  return { flat, beats, spb, getBpm };
}
function handsFor(g) {
  const n = g.ts[0] * g.spb;
  if (g.hands) return g.hands.split('');
  const used = []; g.bars.forEach(b => b.split('').forEach((c, i) => { if (c !== '.') used.push(i); }));
  let r = 1; for (const c of [4, 2]) if (g.spb % c === 0 && used.length && used.every(i => i % c === 0)) { r = c; break; }
  return Array.from({ length: n }, (_, i) => i % r ? '' : ((i / r) % 2 ? 'L' : 'R'));
}
function countsFor(g) {
  if (g.counts) return g.counts;
  const per = COUNTS[g.spb] || COUNTS[4];
  const out = [];
  for (let b = 0; b < g.ts[0]; b++) per.forEach((c, i) => out.push(i === 0 ? String(b + 1) : c));
  return out;
}
const levelHtml = lv => `<span class="lv">${[1, 2, 3].map(i => `<i class="${i <= lv ? 'f' : ''}"></i>`).join('')}</span>`;
const LV = ['', '入門', '進階', '挑戰'];
const tsLabel = g => g.counts ? `${g.counts.filter(c => c !== '&').length} 拍循環` : `${g.ts[0]}/${g.ts[1]}`;
function miniHtml(g) {
  const b = g.bars[0];
  return `<div class="mini">${b.split('').map((c, i) => (i && i % g.spb === 0 ? '<i class="gap"></i>' : '') + `<i class="${c === '.' ? '' : c}"></i>`).join('')}</div>`;
}
const legendHtml = () => `<div class="legend">
  <span><i class="k" style="background:var(--c-B);color:var(--on-B)">B</i>低音 Bass</span>
  <span><i class="k" style="background:var(--c-T);color:var(--on-T)">T</i>中音 Tone</span>
  <span><i class="k" style="background:var(--c-S);color:var(--on-S)">S</i>響音 Slap</span>
  <span><i class="k" style="color:var(--c-g);box-shadow:inset 0 0 0 1.5px var(--c-g)">s</i>鬼音 Ghost</span>
  <span><b style="color:var(--text)">R / L</b>&nbsp;右手 / 左手</span></div>`;

let curGrid = null;
function renderGrid(el, g, { editable = false, autoScroll = true } = {}) {
  const n = g.ts[0] * g.spb, hands = handsFor(g), counts = countsFor(g);
  const cols = [];
  el.innerHTML = '';
  el.className = 'bars' + (g.bars.length > 1 && n <= 16 ? ' two' : '');
  g.bars.forEach((bar, bi) => {
    const bd = document.createElement('div'); bd.className = 'bar' + (n > 16 ? ' wide' : '');
    let h = `<div class="bn">第 ${bi + 1} 小節</div><div class="row-g">`;
    const grpSize = g.counts ? 2 : g.spb; // bulerías: group per count
    for (let s = 0; s < n; s++) {
      if (s % grpSize === 0) h += (s ? '</div>' : '') + '<div class="grp">';
      const c = bar[s]; const idx = bi * n + s;
      const cnt = counts[s]; const isBeat = s % g.spb === 0;
      h += `<div class="col${editable ? ' edit' : ''}" data-i="${idx}"><div class="n ${c === '.' ? 'r' : c}">${c === '.' ? '·' : c}</div><div class="c${isBeat ? '' : ' off'}">${esc(cnt)}</div><div class="h">${hands[s]}</div></div>`;
    }
    h += '</div></div>';
    bd.innerHTML = h; el.appendChild(bd);
  });
  $$('.col', el).forEach(c => cols[+c.dataset.i] = c);
  const map = { cols, prev: null, prevBar: null, autoScroll };
  return map;
}

/* ---------- UI helpers ---------- */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800); }
function sheet(title, html, onMount) {
  const sc = document.createElement('div'); sc.className = 'scrim';
  sc.innerHTML = `<div class="sheet" role="dialog" aria-label="${esc(title)}"><div class="grab"></div><h3>${esc(title)}</h3>${html}</div>`;
  document.body.appendChild(sc); requestAnimationFrame(() => sc.classList.add('show'));
  const close = () => { sc.classList.remove('show'); setTimeout(() => sc.remove(), 300); };
  sc.addEventListener('click', e => { if (e.target === sc) close(); });
  onMount?.(sc.querySelector('.sheet'), close);
  return close;
}
function helpSheet(items) {
  sheet('說明', `<div class="helps">${items.map(([t, d]) => `<div><b>${t}</b><p>${d}</p></div>`).join('')}</div><button class="btn primary" style="width:100%;margin-top:16px" data-x>知道了</button>`, (el, close) => $('[data-x]', el).onclick = close);
}
function openBpmInput(get, set) {
  sheet('設定速度', `<input class="input num bpm-input" type="number" inputmode="numeric" min="20" max="300" value="${get()}" aria-label="BPM"><div class="chips quick">${[60, 70, 80, 90, 100, 110, 120, 130].map(b => `<button class="chip" data-b="${b}">${b}</button>`).join('')}</div><button class="btn primary" style="width:100%;margin-top:16px" data-ok>完成</button>`,
    (el, close) => {
      const i = $('input', el); setTimeout(() => { i.focus(); i.select(); }, 320);
      const ok = () => { const v = +i.value; if (v) set(v); close(); };
      $('[data-ok]', el).onclick = ok; i.onkeydown = e => { if (e.key === 'Enter') ok(); };
      $('.quick', el).onclick = e => { const b = e.target.closest('[data-b]'); if (b) { set(+b.dataset.b); close(); } };
    });
}
function bpmGesture(el, get, set) {
  if (!el) return;
  let x0 = null, y0 = 0, b0 = 0, axis = null, moved = false, last = 0;
  el.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; b0 = get(); last = b0; axis = null; moved = false; try { el.setPointerCapture(e.pointerId); } catch (_) {} });
  el.addEventListener('pointermove', e => {
    if (x0 == null) return;
    const dx = e.clientX - x0, dy = y0 - e.clientY;
    if (!axis && Math.hypot(dx, dy) > 6) axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
    if (!axis) return; moved = true;
    const nb = Math.round(b0 + (axis === 'x' ? dx : dy) / 5);
    if (nb !== last) { last = nb; set(nb); try { navigator.vibrate && navigator.vibrate(1); } catch (_) {} }
  });
  el.addEventListener('pointerup', () => { if (x0 != null && !moved) openBpmInput(get, set); x0 = null; });
  el.addEventListener('pointercancel', () => { x0 = null; });
  el.addEventListener('wheel', e => { e.preventDefault(); set(get() + (e.deltaY < 0 ? 1 : -1)); }, { passive: false });
}
function confirmSheet(title, msg, okLabel, onOk) {
  sheet(title, `<p style="text-align:center;color:var(--text-2);margin:0 0 18px">${esc(msg)}</p><div class="row"><button class="btn" style="flex:1" data-x>取消</button><button class="btn primary" style="flex:1;background:#D70015;color:#fff" data-ok>${esc(okLabel)}</button></div>`,
    (el, close) => { $('[data-x]', el).onclick = close; $('[data-ok]', el).onclick = () => { close(); onOk(); }; });
}
function setRangeFill(r) { const p = (r.value - r.min) / (r.max - r.min) * 100; r.style.setProperty('--p', p + '%'); }
function holdRepeat(btn, fn) {
  let t1, t2;
  const go = e => { e.preventDefault(); fn(); t1 = setTimeout(() => { t2 = setInterval(fn, 60); }, 380); };
  const end = () => { clearTimeout(t1); clearInterval(t2); };
  btn.addEventListener('pointerdown', go); ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => btn.addEventListener(ev, end));
}
const tapper = { times: [], tap() { const now = performance.now(); if (this.times.length && now - this.times[this.times.length - 1] > 2000) this.times = []; this.times.push(now); if (this.times.length > 6) this.times.shift();
  if (this.times.length < 2) return null; const iv = []; for (let i = 1; i < this.times.length; i++) iv.push(this.times[i] - this.times[i - 1]); return Math.round(60000 / (iv.reduce((a, b) => a + b) / iv.length)); } };

function updatePlayButtons() {
  $$('[data-play]').forEach(b => { const on = A.playing && A.owner === b.dataset.play; b.innerHTML = on ? I.stop : I.play; b.setAttribute('aria-label', on ? '停止' : '播放'); });
}

/* ---------- Router ---------- */
const views = { metro: viewMetro, library: viewLibrary, songs: viewSongs, editor: viewEditor, me: viewMe };
let route = { name: 'metro', arg: null };
function parseHash() {
  const h = location.hash.replace(/^#/, '');
  if (h.startsWith('g-')) return { name: 'groove', arg: h.slice(2) };
  if (h.startsWith('edit-')) return { name: 'editor', arg: h.slice(5) };
  if (h.startsWith('song-')) return { name: 'song', arg: h.slice(5) };
  if (h === 'songedit' || h.startsWith('songedit-')) return { name: 'songedit', arg: h.slice(9) || null };
  return { name: views[h] ? h : 'metro', arg: null };
}
function go(h) { if (location.hash !== '#' + h) location.hash = h; else render(); }
function render() {
  route = parseHash();
  $$('.scrim').forEach(s => s.remove());
  if (A.playing && A.owner !== 'metro' && A.owner !== (route.name === 'groove' ? 'g:' + route.arg : route.name === 'song' ? 's:' + route.arg : route.name)) stop();
  ytStop();
  adjBpm = null;
  curGrid = null;
  const tabName = route.name === 'groove' ? 'library' : (route.name === 'song' || route.name === 'songedit') ? 'songs' : route.name;
  $$('.tab').forEach(t => t.classList.toggle('on', t.dataset.go === tabName));
  const main = $('#main'); main.innerHTML = '';
  const v = document.createElement('div'); v.className = 'view'; main.appendChild(v);
  ({ groove: viewGroove, song: viewSong, songedit: viewSongEdit }[route.name] || views[route.name])(v, route.arg);
  window.scrollTo(0, 0); updatePlayButtons();
}
window.addEventListener('hashchange', render);

/* ---------- View: Metronome ---------- */
let refreshBpm = () => {};
let adjBpm = null;
function viewMetro(v) {
  const sub = subOf(S.sub);
  if (S.accents.length !== S.ts[0]) S.accents = Array.from({ length: S.ts[0] }, (_, i) => i === 0 ? 3 : 2);
  v.innerHTML = `
  <div class="hd"><div class="grow"><h1>節拍器</h1><div class="sub">${DESKTOP ? '點節拍格切換重音・空白鍵播放' : '點節拍格切換重音'}</div></div></div>
  <div class="metro">
    <div class="card dial-card">
      <div class="pulse" id="pulse"></div>
      <div class="tempo-name" id="tname"></div>
      <div class="bpm-row">
        <button class="round-btn" id="bm" aria-label="減速">${I.minus}</button>
        <div class="bpm-touch" id="bpmTouch"><div class="bpm-big num" id="bpmBig"></div><div class="bpm-unit">‹ BPM ›</div></div>
        <button class="round-btn" id="bp" aria-label="加速">${I.plus}</button>
      </div>
      <input type="range" min="20" max="300" id="bpmR" aria-label="速度">
      <div class="beats" id="beats"></div>
      <div class="beat-hint" id="gapState"></div>
      <button class="play-xl" data-play="metro" aria-label="播放"></button>
    </div>
    <div>
      <div class="card">
        <div class="ctrl-grid">
          <button class="ctrl" id="cTs"><small>拍號</small><b class="num">${S.ts[0]}/${S.ts[1]}</b></button>
          <button class="ctrl" id="cSub"><small>細分</small><b>${sub.g}</b></button>
          <button class="ctrl" id="cSnd"><small>音色</small><b style="font-size:16px">${SOUNDS[S.sound].name}</b></button>
        </div>
        <button class="tap-btn" id="tap">TAP 點擊測速</button>
        <div class="row" style="margin-top:14px;gap:12px"><span style="color:var(--text-2);font-size:13px;font-weight:600;white-space:nowrap">音量</span><input type="range" min="0" max="100" id="vol" class="slider"></div>
      </div>
      <div class="section-t row" style="justify-content:space-between">訓練模式<button class="help" id="mHelp" aria-label="說明">?</button></div>
      <div class="list">
        <div class="li"><div class="lbl">速度訓練<small>每 ${S.trEvery} 小節 +${S.trStep}，至 ${S.trMax}</small></div><button class="btn sm" id="trSet">設定</button><button class="switch ${S.trainer ? 'on' : ''}" id="trSw" aria-label="速度訓練"></button></div>
        <div class="li"><div class="lbl">靜音訓練<small>響 ${S.gapPlay} 小節・停 ${S.gapMute} 小節</small></div><button class="btn sm" id="gapSet">設定</button><button class="switch ${S.gap ? 'on' : ''}" id="gapSw" aria-label="靜音訓練"></button></div>
      </div>
      <div class="section-t">快速選速</div>
      <div class="chips" id="presets">${[60, 70, 80, 90, 100, 110, 120, 140].map(b => `<button class="chip" data-b="${b}">${b}</button>`).join('')}</div>
    </div>
  </div>`;
  const big = $('#bpmBig', v), r = $('#bpmR', v);
  refreshBpm = () => { if (!big.isConnected) return; big.textContent = S.bpm; r.value = S.bpm; setRangeFill(r); $('#tname').textContent = tempoName(S.bpm); $$('#presets .chip').forEach(c => c.classList.toggle('on', +c.dataset.b === S.bpm)); };
  const setBpm = b => { S.bpm = clamp(Math.round(b), 20, 300); refreshBpm(); saveS(); };
  refreshBpm();
  r.oninput = () => setBpm(+r.value);
  holdRepeat($('#bm', v), () => setBpm(S.bpm - 1)); holdRepeat($('#bp', v), () => setBpm(S.bpm + 1));
  // drag on number
  bpmGesture($('#bpmTouch', v), () => S.bpm, setBpm);
  const beatsEl = $('#beats', v);
  const drawBeats = () => { beatsEl.innerHTML = S.accents.map((l, i) => `<button class="beat" data-l="${l}" data-i="${i}" aria-label="第${i + 1}拍"><span class="n">${i + 1}</span><span class="fill"></span></button>`).join(''); };
  drawBeats();
  beatsEl.onclick = e => { const b = e.target.closest('.beat'); if (!b) return; const i = +b.dataset.i; S.accents[i] = (S.accents[i] + 3) % 4; b.dataset.l = S.accents[i]; saveS(); };
  $('[data-play]', v).onclick = () => A.playing && A.owner === 'metro' ? stop() : start('metro', 'metro');
  $('#tap', v).onclick = () => { ensureAudio(); const b = tapper.tap(); SOUNDS[S.sound].play(A.ctx.currentTime + 0.005, 'beat', S.vol * 0.6); if (b) setBpm(b); };
  const vol = $('#vol', v); vol.value = S.vol * 100; setRangeFill(vol); vol.oninput = () => { S.vol = vol.value / 100; setRangeFill(vol); saveS(); };
  $('#presets', v).onclick = e => { const c = e.target.closest('.chip'); if (c) setBpm(+c.dataset.b); };
  $('#cTs', v).onclick = () => sheet('拍號', `<div class="grid-btns">${TSIGS.map(t => `<button class="num ${t[0] === S.ts[0] && t[1] === S.ts[1] ? 'on' : ''}" data-t="${t.join('/')}">${t[0]}/${t[1]}</button>`).join('')}</div>`,
    (el, close) => el.onclick = e => { const b = e.target.closest('[data-t]'); if (!b) return; S.ts = b.dataset.t.split('/').map(Number);
      S.accents = Array.from({ length: S.ts[0] }, (_, i) => i === 0 ? 3 : (S.ts[1] === 8 && S.ts[0] % 3 === 0 && i % 3 === 0) ? 2 : (S.ts[1] === 8 && S.ts[0] % 3 === 0) ? 1 : 2);
      saveS(); close(); render(); });
  $('#cSub', v).onclick = () => sheet('細分音符', `<div class="grid-btns">${SUBS.map(s => `<button class="${s.id === S.sub ? 'on' : ''}" data-s="${s.id}">${s.g}<small>${s.name}</small></button>`).join('')}</div>`,
    (el, close) => el.onclick = e => { const b = e.target.closest('[data-s]'); if (!b) return; S.sub = b.dataset.s; saveS(); close(); $('#cSub b').textContent = subOf(S.sub).g; });
  $('#cSnd', v).onclick = () => sheet('音色', `<div class="grid-btns" style="grid-template-columns:repeat(3,1fr)">${Object.entries(SOUNDS).map(([k, s]) => `<button class="${k === S.sound ? 'on' : ''}" data-k="${k}" style="font-size:16px">${s.name}</button>`).join('')}</div>`,
    (el, close) => el.onclick = e => { const b = e.target.closest('[data-k]'); if (!b) return; S.sound = b.dataset.k; saveS(); ensureAudio(); SOUNDS[S.sound].play(A.ctx.currentTime + 0.01, 'accent', S.vol);
      $$('[data-k]', el).forEach(x => x.classList.toggle('on', x === b)); $('#cSnd b').textContent = SOUNDS[S.sound].name; setTimeout(close, 250); });
  $('#mHelp', v).onclick = () => helpSheet([['速度訓練', '每隔幾小節自動加快，<br>到上限就停。'], ['靜音訓練', '響幾小節、停幾小節。<br>停的時候繼續打，練穩定。'], ['TAP', '跟著音樂點幾下，<br>自動算出速度。'], ['重音', '點節拍格切換：<br>重 → 中 → 輕 → 靜音。']]);
  $('#trSw', v).onclick = e => { S.trainer = !S.trainer; e.currentTarget.classList.toggle('on', S.trainer); saveS(); toast(S.trainer ? '速度訓練已開啟' : '速度訓練已關閉'); };
  $('#gapSw', v).onclick = e => { S.gap = !S.gap; e.currentTarget.classList.toggle('on', S.gap); saveS(); if (!S.gap) $('#gapState').textContent = ''; };
  $('#trSet', v).onclick = () => numSheet('速度訓練', [['每幾小節', 'trEvery', 1, 32], ['每次加速 BPM', 'trStep', 1, 20], ['最高 BPM', 'trMax', 40, 300]], () => { S.trainer = true; render(); });
  $('#gapSet', v).onclick = () => numSheet('靜音訓練', [['發聲小節', 'gapPlay', 1, 16], ['靜音小節', 'gapMute', 1, 16]], () => { S.gap = true; render(); });
}
function numSheet(title, fields, done) {
  sheet(title, `<div class="list" style="margin-bottom:16px">${fields.map(([l, k, mn, mx]) => `<div class="li"><div class="lbl">${l}</div><div class="stepper"><button data-k="${k}" data-d="-1" data-mn="${mn}" data-mx="${mx}">−</button><span class="num" id="v-${k}">${S[k]}</span><button data-k="${k}" data-d="1" data-mn="${mn}" data-mx="${mx}">+</button></div></div>`).join('')}</div><button class="btn primary" style="width:100%" data-ok>完成並開啟</button>`,
    (el, close) => {
      $$('.stepper button', el).forEach(b => holdRepeat(b, () => { const k = b.dataset.k; S[k] = clamp(S[k] + +b.dataset.d, +b.dataset.mn, +b.dataset.mx); $('#v-' + k, el).textContent = S[k]; }));
      $('[data-ok]', el).onclick = () => { saveS(); close(); done(); };
    });
}

/* ---------- View: Library ---------- */
let libCat = 'all', libQ = '';
function viewLibrary(v) {
  const cats = [{ id: 'all', name: '全部' }, { id: 'fav', name: '★ 收藏' }, { id: 'mine', name: '我的節奏' }, ...CATS];
  v.innerHTML = `<div class="hd"><div class="grow"><h1>節奏庫</h1><div class="sub">${GROOVES.length} 種律動・木箱鼓格狀譜</div></div><button class="btn sm primary" onclick="location.hash='editor'">${I.plus}自編</button></div>
  <div class="search">${I.search}<input class="input" id="q" placeholder="搜尋節奏，例如：抒情、Funk、6/8" value="${esc(libQ)}"></div>
  <div class="chips" id="cats">${cats.map(c => `<button class="chip ${c.id === libCat ? 'on' : ''}" data-c="${c.id}">${c.name}</button>`).join('')}</div>
  <div id="gl"></div>`;
  const draw = () => {
    const q = libQ.trim().toLowerCase();
    let list = allGrooves().filter(g => !g.hidden).filter(g => libCat === 'all' || (libCat === 'fav' ? favs.has(g.id) : libCat === 'mine' ? g.custom : g.cat === libCat));
    if (q) list = list.filter(g => (g.name + g.en + (CATS.find(c => c.id === g.cat)?.name || '') + tsLabel(g) + (g.note || '')).toLowerCase().includes(q));
    const gl = $('#gl', v);
    if (!list.length) { gl.innerHTML = `<div class="empty">${libCat === 'fav' ? '還沒有收藏，進入節奏頁點 ☆ 加入收藏' : libCat === 'mine' ? '還沒有自編節奏<br><br><button class="btn primary" onclick="location.hash=\'editor\'">開始自編</button>' : '找不到符合的節奏'}</div>`; return; }
    if (libCat === 'all' && !q) {
      const groups = [['mine', '我的節奏'], ...CATS.map(c => [c.id, c.name])];
      gl.innerHTML = groups.map(([id, nm]) => { const gs = list.filter(g => id === 'mine' ? g.custom : g.cat === id && !g.custom); return gs.length ? `<div class="section-t">${nm}</div><div class="gl">${gs.map(cardHtml).join('')}</div>` : ''; }).join('');
    } else gl.innerHTML = `<div class="gl">${list.map(cardHtml).join('')}</div>`;
  };
  const cardHtml = g => `<button class="gc" data-id="${esc(g.id)}"><div class="t"><b>${esc(g.name)}</b>${favs.has(g.id) ? `<span class="star">${I.starF}</span>` : ''}</div>
    <div class="meta"><span>${esc(g.en || '自編')}</span><span>·</span><span class="num">${tsLabel(g)}</span><span>·</span><span class="num">${g.bpm} BPM</span><span style="margin-left:auto">${levelHtml(g.lv || 1)}</span></div>${miniHtml(g)}</button>`;
  draw();
  $('#q', v).oninput = e => { libQ = e.target.value; draw(); };
  $('#cats', v).onclick = e => { const c = e.target.closest('.chip'); if (!c) return; libCat = c.dataset.c; $$('#cats .chip').forEach(x => x.classList.toggle('on', x === c)); draw(); };
  $('#gl', v).onclick = e => { const c = e.target.closest('.gc'); if (c) go('g-' + c.dataset.id); };
}

/* ---------- View: Groove player ---------- */
let refreshPlayerBpm = () => {};
function viewGroove(v, id) {
  const g = findGroove(id);
  if (!g) { v.innerHTML = `<div class="empty">找不到這個節奏<br><br><button class="btn" onclick="location.hash='library'">回節奏庫</button></div>`; return; }
  const owner = 'g:' + id;
  let bpm = S.gBpm[id] || g.bpm;
  const cat = CATS.find(c => c.id === g.cat);
  const ref = g.url || ('https://www.youtube.com/results?search_query=' + encodeURIComponent(g.q || (g.en + ' cajon groove')));
  v.innerHTML = `
  <div class="hd"><button class="icon-btn" onclick="history.length>1?history.back():location.hash='library'" aria-label="返回">${I.back}</button>
    <div class="grow ph-title"><b>${esc(g.name)}</b><small>${esc(g.en || '自編節奏')}</small></div>
    <button class="icon-btn" id="fav" aria-label="收藏" style="color:${favs.has(id) ? 'var(--amber)' : 'inherit'}">${favs.has(id) ? I.starF : I.star}</button>
    <button class="icon-btn" id="dup" aria-label="${g.custom ? '編輯' : '複製到編輯器'}" title="${g.custom ? '編輯' : '複製到編輯器修改'}">${g.custom ? I.edit : I.copy}</button></div>
  <div class="tags"><span class="tag">${cat ? cat.name : '我的節奏'}</span><span class="tag num">${tsLabel(g)}</span><span class="tag">${LV[g.lv || 1]} ${levelHtml(g.lv || 1)}</span><span class="tag num">建議 ${g.range ? g.range.join('–') : g.bpm} BPM</span><span class="tag">${g.bars.length} 小節循環</span></div>
  <div class="card">${legendHtml()}<div id="grid"></div></div>
  ${g.note ? `<div class="note">${I.bulb}${esc(g.note)}</div>` : ''}
  <div class="row" style="margin-top:12px;flex-wrap:wrap"><a class="btn sm" href="${esc(ref)}" target="_blank" rel="noopener">${I.video}${g.url ? '觀看示範影片' : '搜尋示範影片'}</a></div>
  <div class="dock">
    <div class="dock-main">
      <button class="play-lg" data-play="${esc(owner)}" aria-label="播放"></button>
      <div class="bpm-mini"><button class="icon-btn" id="m" aria-label="減速">${I.minus}</button><div class="bpm-touch" id="bvw"><div class="v num" id="bv"></div><div class="u">‹ BPM ›</div></div><button class="icon-btn" id="p" aria-label="加速">${I.plus}</button></div>
      <input type="range" class="slider" min="30" max="260" id="br" aria-label="速度">
    </div>
    <div class="toggles">
      <button class="tg" data-t="gDrum">${I.drum}鼓聲</button>
      <button class="tg" data-t="gClick">${I.click}節拍</button>
      <button class="tg" data-t="gCount">${I.count}預備拍</button>
      <button class="tg" data-t="gTrainer">${I.rocket}速度訓練</button>
      <button class="tg" id="mix">${I.sliders}混音・Swing</button>
      <button class="tg" id="tapG">TAP</button>
      <button class="tg help-tg" id="pHelp" aria-label="說明">?</button>
    </div>
    <div class="trainer-status" id="trs"></div>
  </div>`;
  curGrid = renderGrid($('#grid', v), g);
  const bv = $('#bv', v), br = $('#br', v);
  const trs = $('#trs', v);
  const upTr = () => { trs.classList.toggle('show', S.gTrainer); const mx = S.gTrMax || (g.range ? g.range[1] : bpm + 30); trs.textContent = `每 ${S.gTrEvery} 次循環 +${S.gTrStep}，至 ${mx} BPM・點此設定`; };
  trs.onclick = () => { if (!S.gTrMax) S.gTrMax = g.range ? g.range[1] : bpm + 30; numSheet('速度訓練', [['每幾次循環', 'gTrEvery', 1, 32], ['每次加速 BPM', 'gTrStep', 1, 20], ['目標 BPM', 'gTrMax', 40, 300]], () => { S.gTrainer = true; upTr(); syncT(); }); };
  refreshPlayerBpm = () => { if (!bv.isConnected) return; bv.textContent = bpm; br.value = bpm; setRangeFill(br); };
  const setBpm = b => { bpm = clamp(Math.round(b), 30, 260); S.gBpm[id] = bpm; saveS(); refreshPlayerBpm(); };
  refreshPlayerBpm(); upTr(); adjBpm = dd => setBpm(bpm + dd); bpmGesture($('#bvw', v), () => bpm, setBpm);
  br.oninput = () => setBpm(+br.value);
  holdRepeat($('#m', v), () => setBpm(bpm - 1)); holdRepeat($('#p', v), () => setBpm(bpm + 1));
  const syncT = () => $$('.tg[data-t]', v).forEach(b => b.classList.toggle('on', !!S[b.dataset.t]));
  syncT();
  $$('.tg[data-t]', v).forEach(b => b.onclick = () => { const k = b.dataset.t; S[k] = !S[k]; saveS(); syncT(); if (k === 'gTrainer') { upTr(); toast(S.gTrainer ? '速度訓練已開啟' : '速度訓練已關閉'); } });
  $('#pHelp', v).onclick = () => helpSheet([['鼓聲', '播放木箱鼓示範。<br>關掉就只剩節拍，自己打。'], ['節拍', '同時播放節拍器。'], ['預備拍', '開始前先數一小節。'], ['速度訓練', '每循環幾次自動加快，<br>到目標速度就停。'], ['混音', '調整鼓聲、節拍音量，<br>以及 Swing 搖擺感。'], ['TAP', '跟著歌曲點幾下，<br>自動算出速度。']]);
  $('#tapG', v).onclick = () => { const b = tapper.tap(); if (b) setBpm(b); };
  $('#mix', v).onclick = () => sheet('混音・Swing', `<div class="list">
      <div class="li"><div class="lbl">鼓聲音量</div><input type="range" min="0" max="150" data-k="drumVol" data-s="100" style="max-width:55%"></div>
      <div class="li"><div class="lbl">節拍音量</div><input type="range" min="0" max="150" data-k="clickVol" data-s="100" style="max-width:55%"></div>
      <div class="li"><div class="lbl">Swing 搖擺感<small id="swv">${S.gSwing}%</small></div><input type="range" min="0" max="100" data-k="gSwing" data-s="1" style="max-width:55%"></div></div>
      <p class="fine">Swing：反拍往後延，變成搖擺感。</p>`,
    el => $$('input[type=range]', el).forEach(r => { r.value = S[r.dataset.k] * +r.dataset.s; setRangeFill(r); r.oninput = () => { S[r.dataset.k] = r.value / +r.dataset.s; setRangeFill(r); saveS(); if (r.dataset.k === 'gSwing') $('#swv', el).textContent = r.value + '%'; }; }));
  $('#fav', v).onclick = e => { favs.has(id) ? favs.delete(id) : favs.add(id); store.set('favs', [...favs]); const on = favs.has(id); e.currentTarget.innerHTML = on ? I.starF : I.star; e.currentTarget.style.color = on ? 'var(--amber)' : 'inherit'; toast(on ? '已加入收藏' : '已取消收藏'); };
  $('#dup', v).onclick = () => { if (g.custom) go('edit-' + id); else { draft = { ...JSON.parse(JSON.stringify(g)), id: null, name: g.name + '（改編）', custom: true }; go('editor'); } };
  const G = prep(g, () => bpm);
  G.onLoop = (loop, t) => { const mx = S.gTrMax || (g.range ? g.range[1] : bpm + 30); if (loop % S.gTrEvery === 0 && bpm < mx) { bpm = Math.min(mx, bpm + S.gTrStep); S.gBpm[id] = bpm; saveS(); visQ.push({ t, k: 'gbpm', bpm }); } };
  $('[data-play]', v).onclick = () => A.playing && A.owner === owner ? stop() : start('groove', owner, { groove: G });
}

/* ---------- View: Editor ---------- */
let draft = null;
function blankDraft() { return { id: null, name: '我的節奏', en: '', cat: 'mine', lv: 1, bpm: 80, range: null, ts: [4, 4], spb: 4, bars: ['................'], custom: true, tip: '' }; }
function viewEditor(v, id) {
  if (id) { const g = customs.find(c => c.id === id); if (g) draft = JSON.parse(JSON.stringify(g)); }
  if (!draft) draft = blankDraft();
  const d = draft; let brush = 'B'; let bpm = d.bpm;
  const owner = 'editor';
  v.innerHTML = `<div class="hd"><div class="grow"><h1>${d.id ? '編輯節奏' : '自編節奏'}</h1><div class="sub">選音色，點格子填入</div></div></div>
  <div class="card">
    <input class="input" id="nm" value="${esc(d.name)}" placeholder="節奏名稱" style="font-weight:700;font-size:17px">
    <div class="ed-opts">
      <div><label>拍號</label><div class="seg" id="tsSeg">${[[2, 4], [3, 4], [4, 4], [5, 4], [6, 8], [7, 8]].map(t => `<button data-t="${t.join('/')}" class="${t[0] === d.ts[0] && t[1] === d.ts[1] ? 'on' : ''}">${t[0]}/${t[1]}</button>`).join('')}</div></div>
      <div><label>每拍格數</label><div class="seg" id="spbSeg">${[[2, '八分'], [3, '三連音'], [4, '十六分']].map(([n, l]) => `<button data-n="${n}" class="${n === d.spb ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      <div><label>小節數</label><div class="row"><div class="stepper"><button id="barM">−</button><span class="num" id="barN">${d.bars.length}</span><button id="barP">+</button></div><button class="btn sm" id="clr" style="margin-left:auto">${I.trash}清空</button></div></div>
    </div>
    <div class="brushes" id="brushes">${[['B', '低音', 'background:var(--c-B);color:var(--on-B)'], ['T', '中音', 'background:var(--c-T);color:var(--on-T)'], ['S', '響音', 'background:var(--c-S);color:var(--on-S)'], ['s', '鬼音', 'color:var(--c-g);box-shadow:inset 0 0 0 1.5px var(--c-g)'], ['.', '休止', 'color:var(--text-3);background:var(--surface-3)']]
      .map(([k, l, st]) => `<button class="brush ${k === brush ? 'on' : ''}" data-b="${k}"><span class="k" style="${st}">${k === '.' ? '·' : k}</span>${l}</button>`).join('')}</div>
  </div>
  <div class="card" style="margin-top:14px"><div id="grid"></div></div>
  <div class="dock">
    <div class="dock-main">
      <button class="play-lg" data-play="${owner}" aria-label="播放"></button>
      <div class="bpm-mini"><button class="icon-btn" id="m">${I.minus}</button><div class="bpm-touch" id="bvw"><div class="v num" id="bv"></div><div class="u">‹ BPM ›</div></div><button class="icon-btn" id="p">${I.plus}</button></div>
      <div style="flex:1"></div>
      ${d.id ? `<button class="icon-btn" id="del" aria-label="刪除">${I.trash}</button>` : ''}
      <button class="btn primary" id="save">儲存</button>
    </div>
  </div>`;
  const n = () => d.ts[0] * d.spb;
  const gridEl = $('#grid', v);
  const draw = () => { curGrid = renderGrid(gridEl, d, { editable: true }); };
  const restart = () => { if (A.playing && A.owner === owner) play(); };
  draw();
  gridEl.onclick = e => {
    const c = e.target.closest('.col'); if (!c) return;
    const i = +c.dataset.i, bi = Math.floor(i / n()), si = i % n();
    const cur = d.bars[bi][si]; const nv = cur === brush ? '.' : brush;
    d.bars[bi] = d.bars[bi].slice(0, si) + nv + d.bars[bi].slice(si + 1);
    const nEl = $('.n', c); nEl.className = 'n ' + (nv === '.' ? 'r' : nv); nEl.textContent = nv === '.' ? '·' : nv;
    if (nv !== '.') { ensureAudio(); cajon[nv](A.ctx.currentTime + 0.005, S.drumVol); }
    if (A.playing && A.owner === owner) A.groove.flat = d.bars.join('').split('');
  };
  $('#brushes', v).onclick = e => { const b = e.target.closest('.brush'); if (!b) return; brush = b.dataset.b; $$('.brush', v).forEach(x => x.classList.toggle('on', x === b)); };
  const resize = () => { const len = n(); d.bars = d.bars.map(b => (b + '.'.repeat(len)).slice(0, len)); d.hands = null; d.counts = null; draw(); restart(); };
  $('#tsSeg', v).onclick = e => { const b = e.target.closest('button'); if (!b) return; d.ts = b.dataset.t.split('/').map(Number); $$('#tsSeg button').forEach(x => x.classList.toggle('on', x === b)); resize(); };
  $('#spbSeg', v).onclick = e => { const b = e.target.closest('button'); if (!b) return; d.spb = +b.dataset.n; $$('#spbSeg button').forEach(x => x.classList.toggle('on', x === b)); d.bars = d.bars.map(() => '.'.repeat(n())); resize(); };
  $('#barP', v).onclick = () => { if (d.bars.length >= 8) return; d.bars.push('.'.repeat(n())); $('#barN').textContent = d.bars.length; draw(); restart(); };
  $('#barM', v).onclick = () => { if (d.bars.length <= 1) return; d.bars.pop(); $('#barN').textContent = d.bars.length; draw(); restart(); };
  $('#clr', v).onclick = () => { d.bars = d.bars.map(() => '.'.repeat(n())); draw(); restart(); };
  $('#nm', v).oninput = e => d.name = e.target.value;
  const bv = $('#bv', v); const setBpm = b => { bpm = clamp(Math.round(b), 30, 260); d.bpm = bpm; bv.textContent = bpm; };
  setBpm(bpm); adjBpm = dd => setBpm(bpm + dd); bpmGesture($('#bvw', v), () => bpm, setBpm); holdRepeat($('#m', v), () => setBpm(bpm - 1)); holdRepeat($('#p', v), () => setBpm(bpm + 1));
  const play = () => start('groove', owner, { groove: prep(d, () => bpm) });
  $('[data-play]', v).onclick = () => A.playing && A.owner === owner ? stop() : play();
  $('#save', v).onclick = () => {
    if (!d.bars.join('').replace(/\./g, '')) { toast('先填入幾個音符吧'); return; }
    d.name = d.name.trim() || '我的節奏'; d.bpm = bpm;
    if (!d.id) { d.id = 'my' + Date.now().toString(36); customs.unshift(d); } else { const i = customs.findIndex(c => c.id === d.id); if (i >= 0) customs[i] = d; else customs.unshift(d); }
    store.set('customs', customs); toast('已儲存到「我的節奏」'); const sid = d.id; draft = null; go('g-' + sid);
  };
  $('#del', v)?.addEventListener('click', () => confirmSheet('刪除節奏', `確定刪除「${d.name}」？刪除後無法復原。`, '刪除', () => { customs = customs.filter(c => c.id !== d.id); store.set('customs', customs); favs.delete(d.id); store.set('favs', [...favs]); draft = null; toast('已刪除'); go('library'); }));
}

/* ---------- Songs ---------- */
let songCustoms = store.get('songs', []);
let songSync = store.get('songSync', {});
let songCat = 'chart', songQ = '';
let CHART = store.get('chart', { updated: '', items: [] });
const chartSongs = () => (CHART.items || []).map(it => {
  const src = it.sources || [];
  const m = Object.assign({}, SONG_META[it.title] || {}, SONG_META[it.yt] || {});
  return { id: it.yt, rank: it.rank, sources: src, title: m.title || it.title, artist: m.artist || it.artist, cat: '本月排行', yt: it.yt, bpm: m.bpm || 80, needsBpm: !m.bpm, cover: m.cover || null, sections: m.sections || SONG_DEFAULT_SECTIONS };
});
let COVERS = store.get('covers', { items: [] });
const normT = s => String(s || '').toLowerCase().replace(/[\s·・,，.。!！?？'"“”‘’()（）\[\]【】\-]/g, '');
const coverMap = () => { const m = new Map(); for (const c of COVERS.items || []) { const k = normT(c.song); if (!m.has(k)) m.set(k, c); } return m; };
const afuSongs = () => (COVERS.items || []).map(c => {
  const m = Object.assign({}, SONG_META[c.song] || {}, SONG_META[c.yt] || {});
  return { id: c.yt, title: m.title || c.song, artist: m.artist || c.artist, cat: 'cover', yt: c.yt, coverOnly: true, coverBy: c.by, sheet: c.sheet, bpm: m.bpm || 80, needsBpm: !m.bpm, cover: null, sections: m.sections || SONG_DEFAULT_SECTIONS };
});
const allSongs = () => { const cm = coverMap(); const ch = chartSongs().map(s => { if (!s.cover) { const c = cm.get(normT(s.title)); if (c) s.cover = { yt: c.yt, by: c.by + (c.sheet ? '（附鼓譜）' : '') }; } return s; }); return [...songCustoms, ...ch, ...afuSongs()]; };
fetch('covers.json', { cache: 'no-cache' }).then(r => r.json()).then(j => { const changed = (j.items || []).length !== (COVERS.items || []).length; COVERS = j; store.set('covers', j); if (changed && route && route.name === 'songs') render(); }).catch(() => {});
fetch('charts.json', { cache: 'no-cache' }).then(r => r.json()).then(j => {
  const changed = JSON.stringify(j.items) !== JSON.stringify(CHART.items);
  CHART = j; store.set('chart', j);
  if (changed && route && (route.name === 'songs' || (route.name === 'song' && !A.playing))) render();
}).catch(() => {});
const findSong = id => allSongs().find(s => s.id === id);
const ytThumb = id => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
const ytWatch = id => `https://www.youtube.com/watch?v=${id}`;
function parseYT(u) { u = String(u || '').trim(); if (!u) return ''; const m = u.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/|live\/)([\w-]{11})/); return m ? m[1] : (/^[\w-]{11}$/.test(u) ? u : ''); }
function songPlan(song) {
  const secs = []; let beat = 0;
  song.sections.forEach(([name, gid, bars], i) => {
    const g = findGroove(gid) || findGroove('basic-beat');
    const n = g.ts[0] * g.spb, pat = g.bars.join('');
    secs.push({ i, name, g, bars, n, pat, beats: bars * g.ts[0], startBeat: beat, steps: bars * n });
    beat += bars * g.ts[0];
  });
  return { secs, totalBeats: beat };
}
function buildSeq(plan, from, to, getBpm) {
  const flat = [], spbAt = [], beatStart = [], barStart = [], map = [];
  for (let k = from; k <= to; k++) {
    const s = plan.secs[k];
    for (let j = 0; j < s.steps; j++) { const local = j % s.pat.length; flat.push(s.pat[local]); spbAt.push(s.g.spb); beatStart.push(j % s.g.spb === 0); barStart.push(j % s.n === 0); map.push([k, local]); }
  }
  const f = plan.secs[from];
  return { flat, spbAt, beatStart, barStart, map, spb: f.g.spb, beats: f.g.ts[0], getBpm };
}
let ytApi = null, ytPlayer = null, ytRaf = 0;
function loadYT() {
  if (window.YT && window.YT.Player) return Promise.resolve(true);
  if (ytApi) return ytApi;
  ytApi = new Promise(res => {
    const t = setTimeout(() => { ytApi = null; res(false); }, 7000);
    window.onYouTubeIframeAPIReady = () => { clearTimeout(t); res(true); };
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api';
    s.onerror = () => { clearTimeout(t); ytApi = null; res(false); };
    document.head.appendChild(s);
  });
  return ytApi;
}
function ytStop() { cancelAnimationFrame(ytRaf); ytRaf = 0; try { ytPlayer && ytPlayer.destroy(); } catch (e) {} ytPlayer = null; }

function viewSongs(v) {
  const cats = [['chart', '排行榜'], ['cover', 'A FU 木箱鼓'], ['mine', '我的']];
  if (!['chart', 'cover', 'mine'].includes(songCat)) songCat = 'chart';
  v.innerHTML = `<div class="hd"><div class="grow"><h1>歌曲</h1><div class="sub">${CHART.updated ? `排行榜每月自動更新・${CHART.updated}` : '跟著原曲練節奏'}</div></div><button class="btn sm primary" id="addSong">${I.plus}新增</button></div>
  <div class="search">${I.search}<input class="input" id="sq" placeholder="搜尋歌名或歌手" value="${esc(songQ)}"></div>
  <div class="chips" id="scats">${cats.map(([k, l]) => `<button class="chip ${k === songCat ? 'on' : ''}" data-c="${k}">${l}</button>`).join('')}</div>
  <div class="fine" id="shint" style="margin:6px 4px 0"></div>
  <div class="sl" id="sl"></div>`;
  const draw = () => {
    const q = songQ.trim().toLowerCase();
    let list = allSongs().filter(s => songCat === 'mine' ? s.custom : songCat === 'cover' ? s.coverOnly : (!s.custom && !s.coverOnly));
    if (q) list = allSongs().filter(s => (s.title + ' ' + s.artist).toLowerCase().includes(q));
    $('#shint', v).textContent = q ? `找到 ${list.length} 首` : songCat === 'chart' ? (CHART.sources ? '合併 ' + CHART.sources.map(x => x.name).join('、') : '') : songCat === 'cover' ? `A FU Cajon 共 ${list.length} 首・多數附鼓譜` : '';
    $('#sl', v).innerHTML = list.length ? list.map(s => `<button class="sc" data-id="${esc(s.id)}"><div class="th">${I.song}${s.yt ? `<img src="${ytThumb(s.yt)}" alt="" loading="lazy" onerror="this.remove()">` : ''}${s.rank ? `<span class="rank num">${s.rank}</span>` : ''}</div>
      <div class="si"><b>${esc(s.title)}</b><small>${esc(s.artist || '')}${s.sources && s.sources.length > 1 ? `<i class="srcs">${s.sources.length} 榜</i>` : ''}</small><span class="num">${(S.sBpm || {})[s.id] ? S.sBpm[s.id] + ' BPM' : s.needsBpm ? '<em class="need">速度待測</em>' : s.bpm + ' BPM'}${s.coverOnly ? (s.sheet ? '・附鼓譜' : '') : s.cover ? '・有木箱鼓示範' : ''}</span></div></button>`).join('')
      : `<div class="empty">還沒有自己的歌曲<br><br><button class="btn primary" onclick="location.hash='songedit'">新增歌曲</button></div>`;
  };
  draw();
  $('#addSong', v).onclick = () => { songDraft = null; go('songedit'); };
  $('#sq', v).oninput = e => { songQ = e.target.value; draw(); };
  $('#scats', v).onclick = e => { const c = e.target.closest('.chip'); if (!c) return; songCat = c.dataset.c; songQ = ''; $('#sq', v).value = ''; $$('#scats .chip').forEach(x => x.classList.toggle('on', x === c)); draw(); };
  $('#sl', v).onclick = e => { const c = e.target.closest('.sc'); if (c) go('song-' + c.dataset.id); };
}

function viewSong(v, id) {
  const song = findSong(id);
  if (!song) { v.innerHTML = `<div class="empty">找不到這首歌<br><br><button class="btn" onclick="location.hash='songs'">回歌曲</button></div>`; return; }
  const owner = 's:' + id, plan = songPlan(song), last = plan.secs.length - 1;
  S.sBpm = S.sBpm || {};
  let bpm = S.sBpm[id] || song.bpm, mode = song.yt ? 'video' : 'app', src = 'orig', sel = 0, loopOn = false, curSec = -1, gmap = null, G = null;
  let offset = songSync[id] ?? 0;
  v.innerHTML = `
  <div class="hd"><button class="icon-btn" onclick="history.length>1?history.back():location.hash='songs'" aria-label="返回">${I.back}</button>
    <div class="grow ph-title"><b>${esc(song.title)}</b><small>${esc(song.artist || '')}</small></div>
    <button class="icon-btn" id="sEdit" aria-label="${song.custom ? '編輯' : '複製後修改'}">${song.custom ? I.edit : I.copy}</button></div>
  <div class="song-top">
    <div>
      ${song.yt ? `<div class="seg" id="srcSeg" style="margin-bottom:10px${song.cover ? '' : ';display:none'}"><button data-s="orig" class="on">原曲</button><button data-s="cover">木箱鼓示範</button></div>
      <div class="yt-box" id="yt"></div>
      ${song.cover ? `<div class="fine" id="coverBy" style="display:none;margin-top:6px">示範：${esc(song.cover.by || '')}</div>` : ''}
      ${song.coverOnly ? `<div class="fine" style="margin-top:6px">${esc(song.coverBy || '')} 木箱鼓示範${song.sheet ? '・影片附鼓譜' : ''}</div>` : ''}` : `<div class="card empty" style="padding:24px">沒有影片・使用 App 伴奏練習</div>`}
    </div>
    <div>
      ${song.yt ? `<div class="seg" id="modeSeg"><button data-m="video" class="on">跟著影片</button><button data-m="app">App 伴奏</button></div>` : ''}
      <div class="card sync" id="syncCard" style="margin-top:12px${song.yt ? '' : ';display:none'}">
        <div class="row"><div class="grow" style="flex:1"><b>對拍</b><small id="syncHint"></small></div><button class="help" id="sHelp" aria-label="說明">?</button></div>
        ${song.needsBpm && !S.sBpm[id] ? `<div class="tip" style="margin:10px 0 0">${I.bulb}<div>還沒有速度資料。<br>播放影片，跟著拍子按 TAP。</div></div>` : ''}
        <div class="row" style="margin-top:10px"><button class="btn primary" id="tapSync" style="flex:1">${I.target}對齊這一拍</button><button class="btn" id="tapS">TAP</button>
          <div class="stepper"><button id="offM" aria-label="提早">−</button><span class="num" id="offV"></span><button id="offP" aria-label="延後">+</button></div></div>
      </div>
      <div class="section-t">段落</div>
      <div class="secs" id="secs">${plan.secs.map((s, k) => `<button class="secchip${s.g.id === 'rest' ? ' rest' : ''}" data-k="${k}"><b>${esc(s.name)}</b><small class="num">${s.g.id === 'rest' ? '無鼓・' : ''}${s.bars} 小節</small></button>`).join('')}</div>
    </div>
  </div>
  <div class="card" style="margin-top:14px"><div class="row" style="margin-bottom:10px"><b id="secTitle" style="font-size:17px"></b><a class="fine" id="secGroove" style="margin:0 0 0 auto"></a></div><div id="lg">${legendHtml()}</div><div id="grid"></div></div>
  <div class="dock">
    <div class="dock-main">
      <button class="play-lg" data-play="${esc(owner)}" aria-label="播放">${I.play}</button>
      <div class="bpm-mini"><button class="icon-btn" id="m" aria-label="減速">${I.minus}</button><div class="bpm-touch" id="bvw"><div class="v num" id="bv"></div><div class="u">‹ BPM ›</div></div><button class="icon-btn" id="p" aria-label="加速">${I.plus}</button></div>
      <input type="range" class="slider" min="30" max="260" id="br" aria-label="速度">
    </div>
    <div class="toggles" id="appToggles">
      <button class="tg" data-t="gDrum">${I.drum}鼓聲</button>
      <button class="tg" data-t="gClick">${I.click}節拍</button>
      <button class="tg" data-t="gCount">${I.count}預備拍</button>
      <button class="tg" id="loopT">${I.loop}循環此段</button>
      <button class="tg help-tg" id="pHelp" aria-label="說明">?</button>
    </div>
  </div>`;
  const gridEl = $('#grid', v), playBtn = $('[data-play]', v);
  const secStartSec = k => offset + plan.secs[k].startBeat * 60 / bpm;
  function showSec(k) {
    if (k === curSec) return; curSec = k;
    $$('.secchip', v).forEach(c => c.classList.toggle('on', +c.dataset.k === k));
    const s = plan.secs[k];
    $('#secTitle', v).textContent = `${s.name}・${s.bars} 小節`;
    const a = $('#secGroove', v); a.textContent = s.g.id === 'rest' ? '無鼓' : s.g.name + ' →'; a.href = s.g.id === 'rest' ? 'javascript:void 0' : '#g-' + s.g.id;
    $('#lg', v).style.display = s.g.id === 'rest' ? 'none' : '';
    if (s.g.id === 'rest') { gridEl.className = ''; gridEl.innerHTML = `<div class="rest-box"><b>這段沒有鼓聲</b><span class="num">${s.bars} 小節・先聽，準備下一段</span></div>`; gmap = { cols: [], prev: null, prevBar: null }; }
    else gmap = renderGrid(gridEl, s.g, { autoScroll: false });
    curGrid = { onStep: step => { const m = G && G.map[step]; if (m) highlight(m[0], m[1]); } };
    $('#syncHint', v).textContent = `影片播到「${s.name}」第一拍時按下`;
    const chip = $(`.secchip[data-k="${k}"]`, v); chip?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }
  function highlight(k, local) {
    if (k !== curSec) showSec(k);
    if (gmap.prev) gmap.prev.classList.remove('on');
    const el = gmap.cols[local]; if (!el) return; el.classList.add('on'); gmap.prev = el;
    const bar = el.closest('.bar'); if (gmap.prevBar !== bar) { gmap.prevBar?.classList.remove('cur'); bar.classList.add('cur'); gmap.prevBar = bar; }
  }
  showSec(0);
  // BPM
  const bv = $('#bv', v), br = $('#br', v);
  const setBpm = b => { bpm = clamp(Math.round(b), 30, 260); S.sBpm[id] = bpm; saveS(); bv.textContent = bpm; br.value = bpm; setRangeFill(br); };
  setBpm(bpm); adjBpm = d => setBpm(bpm + d); bpmGesture($('#bvw', v), () => bpm, setBpm);
  br.oninput = () => setBpm(+br.value);
  holdRepeat($('#m', v), () => setBpm(bpm - 1)); holdRepeat($('#p', v), () => setBpm(bpm + 1));
  // toggles
  const syncT = () => { $$('.tg[data-t]', v).forEach(b => b.classList.toggle('on', !!S[b.dataset.t])); $('#loopT', v).classList.toggle('on', loopOn); };
  syncT();
  $$('.tg[data-t]', v).forEach(b => b.onclick = () => { S[b.dataset.t] = !S[b.dataset.t]; saveS(); syncT(); });
  $('#loopT', v).onclick = () => { loopOn = !loopOn; syncT(); if (A.playing && A.owner === owner) playApp(); toast(loopOn ? `循環「${plan.secs[sel].name}」` : '播放整首'); };
  $('#pHelp', v).onclick = () => helpSheet([['跟著影片', '播放原曲，鼓譜跟著歌走。<br>先用「對拍」對齊。'], ['App 伴奏', '不放影片，由 App 打出整首節奏。<br>可放慢速度練習。'], ['循環此段', '只重複目前選的段落。'], ['段落', '點段落可跳到該段。']]);
  // offset
  const offV = $('#offV', v);
  const showOff = () => { if (offV) offV.textContent = (offset >= 0 ? '' : '−') + Math.abs(offset).toFixed(2) + 's'; };
  const saveOff = () => { songSync[id] = Math.round(offset * 100) / 100; store.set('songSync', songSync); showOff(); };
  showOff();
  if (song.yt) {
    holdRepeat($('#offM', v), () => { offset -= 0.05; saveOff(); });
    holdRepeat($('#offP', v), () => { offset += 0.05; saveOff(); });
    $('#tapS', v).onclick = () => { const b = tapper.tap(); if (b) setBpm(b); };
    $('#tapSync', v).onclick = () => {
      if (!ytPlayer || !ytPlayer.getCurrentTime) { toast('先播放影片'); return; }
      offset = ytPlayer.getCurrentTime() - plan.secs[curSec].startBeat * 60 / bpm; saveOff(); toast('已對齊');
    };
    $('#sHelp', v).onclick = () => helpSheet([['對拍', '播放影片，在選定段落的第一拍按「對齊這一拍」。<br>鼓譜就會跟著歌走。'], ['− / +', '鼓譜太快就按 −，太慢就按 +，每次 0.05 秒。'], ['速度', '原曲速度已設好。<br>越後面越跑掉，可微調 BPM。']]);
  }
  // modes
  function setMode(m) {
    mode = m; stop(); if (ytPlayer?.pauseVideo) try { ytPlayer.pauseVideo(); } catch (e) {}
    $$('#modeSeg button', v).forEach(b => b.classList.toggle('on', b.dataset.m === m));
    $('#appToggles', v).style.display = m === 'app' ? '' : 'none';
    const sc = $('#syncCard', v); if (sc) sc.style.display = m === 'video' ? '' : 'none';
    playBtn.innerHTML = I.play;
  }
  $('#modeSeg', v)?.addEventListener('click', e => { const b = e.target.closest('button'); if (b) setMode(b.dataset.m); });
  // video
  async function mountVideo() {
    ytStop();
    const box = $('#yt', v); if (!box) return;
    const vid = src === 'cover' ? song.cover.yt : song.yt;
    const cb = $('#coverBy', v); if (cb) cb.style.display = src === 'cover' ? '' : 'none';
    box.innerHTML = `<div class="yt-ph"><img src="${ytThumb(vid)}" alt="" onerror="this.remove()"><span>載入影片中…</span></div>`;
    const ok = await loadYT();
    if (!box.isConnected) return;
    if (!ok) { box.innerHTML = `<a class="yt-ph" href="${ytWatch(vid)}" target="_blank" rel="noopener"><img src="${ytThumb(vid)}" alt="" onerror="this.remove()"><span>${I.yt}此處無法內嵌・點此在 YouTube 開啟</span></a>`; return; }
    box.innerHTML = '<div id="ytp"></div>';
    ytPlayer = new YT.Player('ytp', { videoId: vid, host: 'https://www.youtube-nocookie.com', playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
      events: { onStateChange: e => {
        const playing = e.data === 1;
        if (mode === 'video') playBtn.innerHTML = playing ? I.stop : I.play;
        cancelAnimationFrame(ytRaf);
        if (playing && mode === 'video' && src === 'orig') { practice.start(); syncLoop(); } else practice.stop();
      } } });
  }
  function syncLoop() {
    if (!ytPlayer || !ytPlayer.getCurrentTime || !v.isConnected) return;
    const beats = (ytPlayer.getCurrentTime() - offset) * bpm / 60;
    if (beats >= 0 && beats < plan.totalBeats) {
      const k = plan.secs.findIndex(s => beats < s.startBeat + s.beats), s = plan.secs[k];
      highlight(k, Math.floor((beats - s.startBeat) * s.g.spb) % s.pat.length);
    }
    ytRaf = requestAnimationFrame(syncLoop);
  }
  $('#srcSeg', v)?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b || b.dataset.s === src) return; src = b.dataset.s; $$('#srcSeg button', v).forEach(x => x.classList.toggle('on', x === b)); mountVideo(); });
  if (song.yt) mountVideo();
  // app playback
  function playApp() {
    G = loopOn ? buildSeq(plan, sel, sel, () => bpm) : buildSeq(plan, sel, last, () => bpm);
    start('groove', owner, { groove: G });
  }
  playBtn.onclick = () => {
    if (mode === 'video') {
      if (!ytPlayer || !ytPlayer.getPlayerState) { const a = $('#yt a', v); if (a) a.click(); return; }
      ytPlayer.getPlayerState() === 1 ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
    } else (A.playing && A.owner === owner) ? stop() : playApp();
  };
  $('#secs', v).onclick = e => {
    const c = e.target.closest('.secchip'); if (!c) return; sel = +c.dataset.k; showSec(sel);
    if (mode === 'video' && ytPlayer?.seekTo) ytPlayer.seekTo(Math.max(0, secStartSec(sel)), true);
    else if (A.playing && A.owner === owner) playApp();
  };
  $('#sEdit', v).onclick = () => { songDraft = song.custom ? null : { ...JSON.parse(JSON.stringify(song)), id: null, title: song.title, custom: true, cat: '我的' }; go(song.custom ? 'songedit-' + id : 'songedit'); };
  setMode(mode);
}

let songDraft = null;
const SEC_NAMES = ['前奏', '主歌', '導歌', '副歌', '間奏', '橋段', '過門', '尾奏'];
function viewSongEdit(v, id) {
  if (id) { const s = songCustoms.find(x => x.id === id); if (s) songDraft = JSON.parse(JSON.stringify(s)); }
  if (!songDraft) songDraft = { id: null, title: '', artist: '', cat: '我的', bpm: 80, yt: '', cover: null, sections: [['前奏', 'basic-beat', 4], ['主歌', 'pop-mid', 16], ['副歌', 'soul', 16]], custom: true };
  const d = songDraft;
  const opts = cur => `<option value="rest" ${cur === 'rest' ? 'selected' : ''}>休息（無鼓）</option>` + CATS.map(c => `<optgroup label="${c.name}">${allGrooves().filter(g => g.cat === c.id && !g.custom).map(g => `<option value="${g.id}" ${g.id === cur ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</optgroup>`).join('')
    + (customs.length ? `<optgroup label="我的節奏">${customs.map(g => `<option value="${g.id}" ${g.id === cur ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</optgroup>` : '');
  v.innerHTML = `<div class="hd"><button class="icon-btn" onclick="history.back()" aria-label="返回">${I.back}</button><div class="grow"><h1 style="font-size:26px">${d.id ? '編輯歌曲' : '新增歌曲'}</h1></div></div>
  <div class="card form">
    <label>歌名</label><input class="input" id="fT" value="${esc(d.title)}" placeholder="例如：稻香">
    <label>歌手</label><input class="input" id="fA" value="${esc(d.artist || '')}" placeholder="例如：周杰倫">
    <label>YouTube 連結</label><input class="input" id="fY" value="${d.yt ? ytWatch(d.yt) : ''}" placeholder="貼上影片網址" inputmode="url">
    <label>木箱鼓示範（選填）</label><input class="input" id="fC" value="${d.cover?.yt ? ytWatch(d.cover.yt) : ''}" placeholder="貼上示範影片網址" inputmode="url">
    <label>速度</label><div class="row"><div class="bpm-mini"><button class="icon-btn" id="m">${I.minus}</button><div class="bpm-touch" id="bvw"><div class="v num" id="bv">${d.bpm}</div><div class="u">‹ BPM ›</div></div><button class="icon-btn" id="p">${I.plus}</button></div><button class="btn sm" id="tapB" style="margin-left:auto">TAP 測速</button></div>
  </div>
  <div class="section-t">段落</div>
  <div class="list" id="secList"></div>
  <button class="btn" id="addSec" style="margin-top:10px;width:100%">${I.plus}新增段落</button>
  <div class="row" style="margin:20px 0 8px;gap:10px">${d.id ? `<button class="btn" id="delS" style="color:var(--danger)">${I.trash}刪除</button>` : ''}<button class="btn primary" id="saveS" style="flex:1">儲存</button></div>`;
  const drawSecs = () => {
    $('#secList', v).innerHTML = d.sections.map(([nm, gid, bars], i) => `<div class="li sec-row" data-i="${i}">
      <select class="input sel-name" data-f="0">${[...new Set([...SEC_NAMES, nm])].map(n => `<option ${n === nm ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select>
      <select class="input sel-g" data-f="1">${opts(gid)}</select>
      <div class="stepper"><button data-b="-1">−</button><span class="num">${bars}</span><button data-b="1">+</button></div>
      <button class="icon-btn ghost" data-del aria-label="刪除段落">${I.trash}</button></div>`).join('');
  };
  drawSecs();
  const list = $('#secList', v);
  list.addEventListener('change', e => { const r = e.target.closest('.sec-row'); if (!r) return; d.sections[+r.dataset.i][+e.target.dataset.f] = e.target.value; });
  list.addEventListener('click', e => {
    const r = e.target.closest('.sec-row'); if (!r) return; const i = +r.dataset.i;
    if (e.target.closest('[data-del]')) { if (d.sections.length > 1) { d.sections.splice(i, 1); drawSecs(); } return; }
    const b = e.target.closest('[data-b]'); if (b) { const up = +b.dataset.b > 0, cur = d.sections[i][2], st = (up ? cur >= 8 : cur > 8) ? 4 : 1; d.sections[i][2] = clamp(cur + (up ? st : -st), 1, 64); r.querySelector('.stepper span').textContent = d.sections[i][2]; }
  });
  $('#addSec', v).onclick = () => { const lastS = d.sections[d.sections.length - 1]; d.sections.push(['副歌', lastS ? lastS[1] : 'pop-mid', 8]); drawSecs(); };
  const bv = $('#bv', v); const setB = b => { d.bpm = clamp(Math.round(b), 30, 260); bv.textContent = d.bpm; };
  holdRepeat($('#m', v), () => setB(d.bpm - 1)); holdRepeat($('#p', v), () => setB(d.bpm + 1)); bpmGesture($('#bvw', v), () => d.bpm, setB);
  $('#tapB', v).onclick = () => { const b = tapper.tap(); if (b) setB(b); };
  $('#saveS', v).onclick = () => {
    d.title = $('#fT', v).value.trim(); d.artist = $('#fA', v).value.trim();
    if (!d.title) { $('#fT', v).focus(); toast('請輸入歌名'); return; }
    const y = $('#fY', v).value.trim(); d.yt = parseYT(y); if (y && !d.yt) { toast('YouTube 連結無法辨識'); return; }
    const c = parseYT($('#fC', v).value); d.cover = c ? { yt: c, by: '木箱鼓示範' } : null;
    if (!d.id) { d.id = 'mysong' + Date.now().toString(36); songCustoms.unshift(d); } else { const i = songCustoms.findIndex(x => x.id === d.id); if (i >= 0) songCustoms[i] = d; else songCustoms.unshift(d); }
    store.set('songs', songCustoms); toast('已儲存'); const sid = d.id; songDraft = null; go('song-' + sid);
  };
  $('#delS', v)?.addEventListener('click', () => confirmSheet('刪除歌曲', `確定刪除「${d.title}」？`, '刪除', () => { songCustoms = songCustoms.filter(x => x.id !== d.id); store.set('songs', songCustoms); songDraft = null; go('songs'); }));
}

/* ---------- View: Me ---------- */
let installEvt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (route.name === 'me') render(); });
const COLORS = ['#F59E0B', '#22C55E', '#3B82F6', '#EC4899', '#8B5CF6', '#14B8A6'];
function viewMe(v) {
  const today = log[dayKey()] || 0;
  let streak = 0; { const d = new Date(); if (!(log[dayKey(d)] > 30)) d.setDate(d.getDate() - 1); while (log[dayKey(d)] > 30) { streak++; d.setDate(d.getDate() - 1); } }
  const week = []; for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); week.push({ k: dayKey(d), s: log[dayKey(d)] || 0, l: '日一二三四五六'[d.getDay()], today: i === 0 }); }
  const wsum = week.reduce((a, b) => a + b.s, 0), wmax = Math.max(600, ...week.map(w => w.s));
  const fmt = s => s < 60 ? `${Math.round(s)}<small style="font-size:14px"> 秒</small>` : `${Math.round(s / 60)}<small style="font-size:14px"> 分</small>`;
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const creators = [...CREATORS, ...userCreators];
  v.innerHTML = `<div class="hd"><div class="grow"><h1>我的練習</h1><div class="sub">每天一點點</div></div></div>
  <div class="me-grid"><div>
    <div class="stats"><div class="stat"><small>今天</small><b class="num">${fmt(today)}</b></div><div class="stat"><small>本週</small><b class="num">${fmt(wsum)}</b></div><div class="stat"><small>連續天數</small><b class="num">${streak}<small style="font-size:14px"> 天</small></b></div></div>
    <div class="card" style="margin-top:12px"><div style="font-weight:700">近 7 天</div><div class="week">${week.map(w => `<div class="d ${w.today ? 'today' : ''}"><i style="height:${Math.max(4, w.s / wmax * 100)}%"></i><span>${w.l}</span></div>`).join('')}</div></div>
    <div class="section-t">設定</div>
    <div class="list">
      <div class="li"><div class="lbl">外觀</div><div class="seg" id="theme" style="width:200px">${[['auto', '自動'], ['light', '淺色'], ['dark', '深色']].map(([k, l]) => `<button data-k="${k}" class="${S.theme === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      ${DESKTOP ? `<div class="li"><div class="lbl">快捷鍵<small><span class="kbd">Space</span> 播放　<span class="kbd">↑</span><span class="kbd">↓</span> 速度　<span class="kbd">T</span> 測速</small></div></div>` : ''}
      <div class="li"><div class="lbl">清除練習紀錄</div><button class="btn sm" id="clrLog">清除</button></div>
    </div>
    <div class="section-t">安裝到主畫面</div>
    <div class="card">
      ${standalone ? '<div style="font-weight:600">✓ 已以 App 模式開啟</div>' : installEvt ? `<button class="btn primary" id="inst" style="width:100%">安裝 Cajon App</button>` : isIOS ? `<div style="font-weight:600">iPhone / iPad</div><ol class="install-steps"><li>用 <b>Safari</b> 開啟本頁網址</li><li>點下方 <b>分享</b> 按鈕</li><li>選擇 <b>加入主畫面</b></li></ol>` :
      `<div style="font-weight:600">Android / 電腦</div><ol class="install-steps"><li>用 Chrome 或 Edge 開啟本頁網址</li><li>點網址列右側的 <b>安裝</b> 圖示，或選單 → <b>安裝應用程式／加入主畫面</b></li></ol>`}
    </div>
  </div><div>
    <div class="section-t" style="margin-top:4px">參考創作者</div>
    <div class="list">${creators.map((c, i) => `<div class="li" style="align-items:flex-start"><div class="creator" style="flex:1"><div class="avatar" style="background:${COLORS[i % COLORS.length]}">${esc(c.name[0])}</div><div style="min-width:0"><b>${esc(c.name)}</b><div style="color:var(--text-2);font-size:13px">${esc(c.handle || '')}${c.desc ? ' · ' + esc(c.desc) : ''}</div><div class="links">${c.links.map(l => `<a class="btn sm" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')}</div></div></div>${c.user ? `<button class="icon-btn ghost" data-rm="${i - CREATORS.length}" aria-label="移除">${I.trash}</button>` : ''}</div>`).join('')}
      <div class="li"><button class="btn sm" id="addC">${I.plus}新增創作者</button></div></div>
  </div></div>`;
  $('#theme', v).onclick = e => { const b = e.target.closest('button'); if (!b) return; S.theme = b.dataset.k; saveS(); applyTheme(); $$('#theme button').forEach(x => x.classList.toggle('on', x === b)); };
  $('#clrLog', v).onclick = () => confirmSheet('清除練習紀錄', '所有練習時間紀錄將被刪除，無法復原。', '清除', () => { log = {}; store.set('log', log); render(); });
  $('#inst', v)?.addEventListener('click', async () => { installEvt.prompt(); await installEvt.userChoice; installEvt = null; render(); });
  $$('[data-rm]', v).forEach(b => b.onclick = () => { userCreators.splice(+b.dataset.rm, 1); store.set('creators', userCreators); render(); });
  $('#addC', v).onclick = () => sheet('新增創作者', `<div style="display:grid;gap:10px"><input class="input" id="cn" placeholder="名稱（必填）"><input class="input" id="ch" placeholder="帳號，例如 @cajon_xxx"><input class="input" id="cu" placeholder="連結網址（YouTube / Instagram）" inputmode="url"><button class="btn primary" id="cok">新增</button></div>`,
    (el, close) => $('#cok', el).onclick = () => { const name = $('#cn', el).value.trim(); let url = $('#cu', el).value.trim(); if (!name) { $('#cn', el).focus(); return; }
      if (url && !/^https?:\/\//.test(url)) url = 'https://' + url;
      const label = /instagram/.test(url) ? 'Instagram' : /youtu/.test(url) ? 'YouTube' : '連結';
      userCreators.push({ name, handle: $('#ch', el).value.trim(), desc: '', links: url ? [{ label, url }] : [], user: true }); store.set('creators', userCreators); close(); render(); });
}

/* ---------- Shell ---------- */
function shell() {
  const tabs = [['metro', '節拍器', I.metro], ['library', '節奏庫', I.lib], ['songs', '歌曲', I.song], ['editor', '自編', I.edit], ['me', '我的', I.me]];
  const tabHtml = tabs.map(([k, l, ic]) => `<button class="tab" data-go="${k}">${ic}<span>${l}</span></button>`).join('');
  document.body.innerHTML = `<div class="app">
    <nav class="side" aria-label="主選單"><div class="brand"><img src="${window.CAJON_ICON || 'icon-192.png'}" alt=""><div><b>Cajon</b><small>木箱鼓節拍訓練</small></div></div>${tabHtml}<div class="foot">B 低音・T 中音<br>S 響音・s 鬼音</div></nav>
    <main class="main" id="main"></main>
    <nav class="tabbar" aria-label="主選單">${tabHtml}</nav></div>
    <div class="toast" id="toast" role="status"></div><div class="ci-badge num" id="ci"></div>`;
  $$('.tab').forEach(t => t.onclick = () => { if (t.dataset.go === 'editor' && route.name !== 'editor') draft = null; go(t.dataset.go); });
}
document.addEventListener('keydown', e => {
  if (e.target.matches('input,textarea,select') || e.metaKey || e.ctrlKey) return;
  if (e.code === 'Space') { e.preventDefault(); const b = $('[data-play]'); b?.click(); }
  else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault(); const d = (e.key === 'ArrowUp' ? 1 : -1) * (e.shiftKey ? 5 : 1);
    if (route.name === 'metro') { S.bpm = clamp(S.bpm + d, 20, 300); saveS(); refreshBpm(); }
    else adjBpm?.(d);
  } else if (e.key === 't' || e.key === 'T') { ($('#tap') || $('#tapG'))?.click(); }
});
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && A.playing) keepAwake(true); });
shell(); render();
if ('serviceWorker' in navigator && location.protocol === 'https:' && !window.CAJON_NO_SW) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
