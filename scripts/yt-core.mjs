// YouTube 讀取核心（Node 與瀏覽器共用）。base: Node 用 'https://www.youtube.com'，瀏覽器用 ''。
export function makeYT(base = 'https://www.youtube.com', fetchFn = fetch) {
  const HDR = { 'Accept-Language': 'zh-TW,zh;q=0.9', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36', Cookie: 'SOCS=CAI; CONSENT=YES+1' };
  const get = async path => {
    const html = await (await fetchFn(base + path + (path.includes('?') ? '&' : '?') + 'hl=zh-TW&gl=TW', base ? { headers: HDR } : {})).text();
    const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
    const key = (html.match(/"INNERTUBE_API_KEY":"([^"]+)"/) || [])[1];
    const ver = (html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/) || [])[1];
    return { data: m ? JSON.parse(m[1]) : null, key, ver };
  };
  const walk = (o, fn) => { if (!o || typeof o !== 'object') return; if (fn(o) === false) return; for (const k in o) walk(o[k], fn); };
  const videosOf = data => {
    const out = [];
    walk(data, o => {
      if (o.lockupViewModel && o.lockupViewModel.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO') {
        const x = o.lockupViewModel, md = x.metadata?.lockupMetadataViewModel;
        const parts = (md?.metadata?.contentMetadataViewModel?.metadataRows || []).map(r => (r.metadataParts || []).map(p => p.text?.content || ''));
        out.push({ yt: x.contentId, raw: md?.title?.content || '', channel: parts[0]?.[0] || '' }); return false;
      }
      if (o.videoRenderer || o.playlistVideoRenderer || o.gridVideoRenderer) {
        const r = o.videoRenderer || o.playlistVideoRenderer || o.gridVideoRenderer;
        out.push({ yt: r.videoId, raw: r.title?.runs?.[0]?.text || r.title?.simpleText || '', channel: r.shortBylineText?.runs?.[0]?.text || r.ownerText?.runs?.[0]?.text || '' }); return false;
      }
    });
    return out;
  };
  const contToken = data => (JSON.stringify(data).match(/"continuationCommand":\{"token":"([^"]+)"/) || [])[1] || null;
  const browse = async (token, key, ver) => {
    const r = await fetchFn(base + '/youtubei/v1/browse?key=' + key + '&prettyPrint=false', { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, base ? HDR : {}), body: JSON.stringify({ context: { client: { clientName: 'WEB', clientVersion: ver, hl: 'zh-TW', gl: 'TW' } }, continuation: token }) });
    return r.json();
  };
  const allVideos = async (path, maxPages = 30) => {
    const { data, key, ver } = await get(path); if (!data) return [];
    let vids = videosOf(data), token = contToken(data), n = 0;
    while (token && key && n++ < maxPages) { const j = await browse(token, key, ver); vids = vids.concat(videosOf(j)); token = contToken(j); }
    const seen = new Set(); return vids.filter(v => v.yt && !seen.has(v.yt) && seen.add(v.yt));
  };
  const findPlaylist = async (query, match) => {
    const { data } = await get('/results?search_query=' + encodeURIComponent(query) + '&sp=EgIQAw%253D%253D');
    let hit = null;
    walk(data, o => {
      if (hit) return false;
      if (o.lockupViewModel && /PLAYLIST/.test(o.lockupViewModel.contentType)) {
        const title = o.lockupViewModel.metadata?.lockupMetadataViewModel?.title?.content || '';
        if (!match || title.includes(match)) hit = { id: o.lockupViewModel.contentId, title };
        return false;
      }
    });
    return hit;
  };
  return { get, allVideos, findPlaylist };
}
