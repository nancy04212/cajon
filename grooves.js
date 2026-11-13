// Cajon groove library. Notes: B=低音 Bass, T=中音 Tone, S=響音 Slap, s=鬼音 Ghost, .=休止
// spb = steps per beat (2=八分, 3=三連音, 4=十六分)
window.CATS = [
  { id: 'basic', name: '入門基礎', en: 'Basics' },
  { id: 'pop', name: '流行・搖滾', en: 'Pop & Rock' },
  { id: 'funk', name: '放克・靈魂', en: 'Funk & Soul' },
  { id: 'swing', name: 'Shuffle・三拍', en: 'Shuffle & 3' },
  { id: 'latin', name: '拉丁・巴西', en: 'Latin & Brazil' },
  { id: 'flamenco', name: '佛朗明哥', en: 'Flamenco' },
  { id: 'world', name: '世界節奏', en: 'World' },
  { id: 'tech', name: '技巧練習', en: 'Technique' },
  { id: 'fill', name: '過門 Fills', en: 'Fills' }
];

window.GROOVES = [
  // 歌曲段落用：沒有鼓聲（不在節奏庫顯示）
  { id: 'rest', name: '休息（無鼓）', en: 'Rest', cat: 'rest', hidden: true, lv: 1, bpm: 80, ts: [4, 4], spb: 4, bars: ['................'] },
  // ---- 入門基礎
  { id: 'basic-beat', name: '基本四拍', en: 'Basic Beat', cat: 'basic', lv: 1, bpm: 70, range: [50, 110], ts: [4, 4], spb: 4,
    bars: ['B...S...B...S...'] },
  { id: 'eighth-beat', name: '八分音符基本拍', en: '8th-Note Groove', cat: 'basic', lv: 1, bpm: 70, range: [50, 110], ts: [4, 4], spb: 4,
    bars: ['B.s.S.s.B.s.S.s.'] },
  { id: 'ghost-intro', name: '鬼音入門律動', en: 'Ghost Note Groove', cat: 'basic', lv: 1, bpm: 70, range: [55, 100], ts: [4, 4], spb: 4,
    bars: ['BsBsSsssBsBsSsss'],
    url: 'https://www.youtube.com/watch?v=f1tn60_zAlI' },
  { id: 'tone-colors', name: '三種音色練習', en: 'Bass · Tone · Slap', cat: 'basic', lv: 1, bpm: 72, range: [50, 110], ts: [4, 4], spb: 4,
    bars: ['BBTTSSTTBBTTSSSS'] },

  // ---- 流行・搖滾
  { id: 'pop-ballad', name: '抒情慢歌', en: 'Pop Ballad', cat: 'pop', lv: 1, bpm: 66, range: [55, 82], ts: [4, 4], spb: 4,
    bars: ['B..sS..sB.BsS..s'], q: '木箱鼓 抒情 節奏 教學' },
  { id: 'pop-mid', name: '中板流行', en: 'Mid-tempo Pop', cat: 'pop', lv: 1, bpm: 92, range: [80, 110], ts: [4, 4], spb: 4,
    bars: ['B.sBS.s.B.sBS.s.'], q: 'cajon pop groove' },
  { id: 'pop-16', name: '16 Beat 流行', en: '16th Pop', cat: 'pop', lv: 2, bpm: 88, range: [70, 105], ts: [4, 4], spb: 4,
    bars: ['BsssSsssBsBsSsss'] },
  { id: 'rock', name: '基本搖滾', en: 'Rock Beat', cat: 'pop', lv: 1, bpm: 100, range: [80, 140], ts: [4, 4], spb: 4,
    bars: ['B...S...B.B.S...'], q: 'cajon rock beat' },
  { id: 'half-time', name: '半拍感', en: 'Half-time', cat: 'pop', lv: 2, bpm: 75, range: [60, 95], ts: [4, 4], spb: 4,
    bars: ['B.s.s.s.S.s.sBs.'] },
  { id: 'disco', name: '迪斯可', en: 'Disco', cat: 'pop', lv: 1, bpm: 112, range: [100, 128], ts: [4, 4], spb: 4,
    bars: ['B.T.S.T.B.T.S.T.'] },
  { id: 'pop-punk', name: '流行龐克', en: 'Pop Punk', cat: 'pop', lv: 2, bpm: 160, range: [130, 190], ts: [4, 4], spb: 2,
    bars: ['BSBSBSBS'] },
  { id: 'worship', name: '敬拜節奏', en: 'Worship Groove', cat: 'pop', lv: 1, bpm: 72, range: [60, 90], ts: [4, 4], spb: 4,
    bars: ['B..sS.sBB.s.S..s'], q: 'worship grooves cajon' },

  // ---- 放克・靈魂
  { id: 'funk-1', name: '放克律動 1', en: 'Funk Groove', cat: 'funk', lv: 2, bpm: 95, range: [80, 110], ts: [4, 4], spb: 4,
    bars: ['B.sBSs.Bs.BsSs.s'], q: 'cajon funk groove' },
  { id: 'funk-2', name: '切分放克', en: 'Syncopated Funk', cat: 'funk', lv: 3, bpm: 90, range: [75, 105], ts: [4, 4], spb: 4,
    bars: ['B..sS.sB.sB.S..B'] },
  { id: 'soul', name: '靈魂樂律動', en: 'Soul / R&B', cat: 'funk', lv: 2, bpm: 85, range: [70, 100], ts: [4, 4], spb: 4,
    bars: ['B.sBS.s.sBs.S.sB'], q: 'cajon soul funk groove' },

  // ---- Shuffle・三拍
  { id: 'shuffle', name: '基本 Shuffle', en: 'Shuffle', cat: 'swing', lv: 1, bpm: 90, range: [70, 130], ts: [4, 4], spb: 3,
    bars: ['B.sS.sB.sS.s'], q: 'cajon shuffle groove' },
  { id: 'blues-shuffle', name: '藍調 Shuffle', en: 'Blues Shuffle', cat: 'swing', lv: 2, bpm: 100, range: [80, 140], ts: [4, 4], spb: 3,
    bars: ['B.BS.sB.BS.B'] },
  { id: 'halftime-shuffle', name: '半拍 Shuffle', en: 'Half-time Shuffle', cat: 'swing', lv: 3, bpm: 80, range: [65, 100], ts: [4, 4], spb: 3,
    bars: ['Bss.ssSss.sB'] },
  { id: 'waltz', name: '華爾滋 3/4', en: 'Waltz', cat: 'swing', lv: 1, bpm: 120, range: [90, 160], ts: [3, 4], spb: 2,
    bars: ['B.S.S.'] },
  { id: 'six-eight', name: '6/8 抒情', en: '6/8 Ballad', cat: 'swing', lv: 1, bpm: 120, range: [90, 160], ts: [6, 8], spb: 2,
    bars: ['B.s.s.S.s.s.'], note: 'BPM 以八分音符計' },
  { id: 'six-eight-rock', name: '6/8 搖滾', en: '6/8 Rock', cat: 'swing', lv: 2, bpm: 120, range: [90, 160], ts: [6, 8], spb: 2,
    bars: ['B.s.BsS.s.sB'] },

  // ---- 拉丁・巴西
  { id: 'bossa', name: '巴薩諾瓦', en: 'Bossa Nova', cat: 'latin', lv: 2, bpm: 75, range: [60, 95], ts: [4, 4], spb: 4,
    bars: ['B.sBS.sBB.sBS.sB', 'B.sBs.SBB.sBS.sB'], q: 'bossa nova cajon' },
  { id: 'samba', name: '森巴（簡化）', en: 'Samba', cat: 'latin', lv: 3, bpm: 90, range: [70, 120], ts: [4, 4], spb: 4,
    bars: ['Bs.SsBsSBs.SsBsS'], q: 'samba cajon' },
  { id: 'cha-cha', name: '恰恰', en: 'Cha-cha', cat: 'latin', lv: 1, bpm: 115, range: [100, 130], ts: [4, 4], spb: 2,
    bars: ['B.S.S.SS'] },
  { id: 'forro', name: '佛霍', en: 'Forró', cat: 'latin', lv: 2, bpm: 100, range: [85, 130], ts: [4, 4], spb: 4,
    bars: ['B..BS.s.B..BS.s.'], q: 'forro cajon' },

  // ---- 佛朗明哥
  { id: 'rumba', name: '倫巴佛朗明哥', en: 'Rumba Flamenca', cat: 'flamenco', lv: 2, bpm: 100, range: [85, 125], ts: [4, 4], spb: 4,
    bars: ['B.sS.sSsB.sS.sSs'], q: 'rumba flamenca cajon' },
  { id: 'bulerias', name: '布雷里亞 12 拍', en: 'Bulerías', cat: 'flamenco', lv: 3, bpm: 160, range: [110, 240], ts: [12, 8], spb: 2,
    counts: ['12','&','1','&','2','&','3','&','4','&','5','&','6','&','7','&','8','&','9','&','10','&','11','&'],
    bars: ['S.ssB.ssS.ssB.S.B.S.B.S.'], note: '從 12 開始數', q: 'bulerias cajon' },

  // ---- 世界節奏
  { id: 'reggae', name: '雷鬼 One Drop', en: 'Reggae One Drop', cat: 'world', lv: 2, bpm: 75, range: [60, 90], ts: [4, 4], spb: 4,
    bars: ['s.s.s.s.B.s.s.s.'], q: 'reggae cajon' },
  { id: 'dembow', name: '雷鬼動 Dembow', en: 'Reggaeton', cat: 'world', lv: 2, bpm: 95, range: [85, 105], ts: [4, 4], spb: 4,
    bars: ['B..SB.S.B..SB.S.'] },
  { id: 'afrobeats', name: '非洲節奏', en: 'Afrobeats', cat: 'world', lv: 2, bpm: 105, range: [95, 115], ts: [4, 4], spb: 4,
    bars: ['B..sS.sBs.B.S..s'], q: 'afrobeats cajon' },
  { id: 'kizomba', name: '基宗巴', en: 'Kizomba', cat: 'world', lv: 2, bpm: 90, range: [80, 100], ts: [4, 4], spb: 4,
    bars: ['B..sS..BB..sS..s'], q: 'kizomba cajon' },

  // ---- 世界節奏（參考 Mr.One 世界節奏系列）
  { id: 'hiphop', name: '嘻哈', en: 'Hip Hop', cat: 'world', lv: 2, bpm: 88, range: [75, 100], ts: [4, 4], spb: 4,
    bars: ['B.s.S..BB.B.S.s.'], q: 'hip hop cajon groove' },
  { id: 'cumbia', name: '昆比亞', en: 'Cumbia', cat: 'latin', lv: 2, bpm: 95, range: [80, 115], ts: [4, 4], spb: 4,
    bars: ['B.s.S.sSB.s.S.sS'], q: 'cumbia cajon' },
  { id: 'merengue', name: '梅倫格', en: 'Merengue', cat: 'latin', lv: 2, bpm: 130, range: [110, 150], ts: [4, 4], spb: 4,
    bars: ['B.sSBsSsB.sSBsSs'], q: 'merengue cajon' },
  { id: 'bolero', name: '波麗露', en: 'Bolero', cat: 'latin', lv: 1, bpm: 80, range: [65, 95], ts: [4, 4], spb: 4,
    bars: ['B..sS.ssB.s.S.ss'], q: 'bolero cajon' },
  { id: 'salsa', name: '騷莎', en: 'Salsa', cat: 'latin', lv: 3, bpm: 95, range: [80, 110], ts: [4, 4], spb: 4,
    bars: ['s.S.S.sBs.S.s.sB', 'S.sS.sBs.S.S.s.B'], note: '兩小節一循環', q: 'salsa cajon' },
  { id: 'songo', name: '頌戈', en: 'Songo', cat: 'latin', lv: 3, bpm: 100, range: [85, 120], ts: [4, 4], spb: 4,
    bars: ['S.sBs.SsB.sSs.Bs'], q: 'songo cajon' },
  { id: 'lando', name: '蘭多', en: 'Landó', cat: 'world', lv: 3, bpm: 75, range: [60, 95], ts: [4, 4], spb: 3,
    bars: ['B.SB.SBsS.ss'], note: '秘魯木箱鼓原生節奏', q: 'lando cajon peruano' },
  { id: 'gaita', name: '蓋塔', en: 'Gaita', cat: 'world', lv: 3, bpm: 120, range: [95, 150], ts: [6, 8], spb: 2,
    bars: ['S.sBs.S.sBs.'], q: 'gaita cajon' },
  { id: 'chacarera', name: '查卡雷拉', en: 'Chacarera', cat: 'world', lv: 3, bpm: 120, range: [95, 150], ts: [6, 8], spb: 2,
    bars: ['S.BsS.S.BsS.'], q: 'chacarera cajon' },

  // ---- 技巧練習
  { id: 'singles', name: '單擊＋重音', en: 'Single Strokes', cat: 'tech', lv: 1, bpm: 70, range: [50, 130], ts: [4, 4], spb: 4,
    bars: ['SsssSsssSsssSsss'] },
  { id: 'doubles', name: '雙擊練習', en: 'Double Strokes', cat: 'tech', lv: 2, bpm: 65, range: [50, 120], ts: [4, 4], spb: 4,
    hands: 'RRLLRRLLRRLLRRLL', bars: ['SsSsSsSsSsSsSsSs'] },
  { id: 'paradiddle', name: '複點擊 Paradiddle', en: 'Paradiddle', cat: 'tech', lv: 2, bpm: 70, range: [50, 120], ts: [4, 4], spb: 4,
    hands: 'RLRRLRLLRLRRLRLL', bars: ['SsssSsssSsssSsss'], q: 'paradiddle cajon' },
  { id: 'ghost-control', name: '鬼音控制', en: 'Ghost Note Control', cat: 'tech', lv: 2, bpm: 70, range: [55, 100], ts: [4, 4], spb: 4,
    bars: ['Bs.sS.s.Bs.sS.s.'], q: 'ghost notes cajon lesson' },

  // ---- 過門
  { id: 'fill-basic', name: '基礎過門', en: 'Basic Fill', cat: 'fill', lv: 1, bpm: 75, range: [55, 110], ts: [4, 4], spb: 4,
    bars: ['B.s.S.s.B.s.S.s.', 'B.s.S.s.SsSsSsSs'], q: 'basic cajon fills' },
  { id: 'fill-16', name: '十六分過門', en: '16th Fill', cat: 'fill', lv: 2, bpm: 80, range: [60, 110], ts: [4, 4], spb: 4,
    bars: ['BsBsSsssBsBsSsss', 'BsBsSsssSsSSsSSS'] },
  { id: 'fill-bass', name: '低音滾奏過門', en: 'Bass Roll Fill', cat: 'fill', lv: 2, bpm: 85, range: [65, 110], ts: [4, 4], spb: 4,
    bars: ['B.sBS.s.B.sBS.s.', 'B.sBS.s.BBSSBBSS'] },
  { id: 'fill-triplet', name: '三連音過門', en: 'Triplet Fill', cat: 'fill', lv: 3, bpm: 85, range: [65, 110], ts: [4, 4], spb: 3,
    bars: ['B.sS.sB.sS.s', 'B.sS.sSssSss'] },
  { id: 'fill-1beat', name: '一拍小過門', en: 'One-beat Fill', cat: 'fill', lv: 1, bpm: 75, range: [55, 110], ts: [4, 4], spb: 4,
    bars: ['B.s.S.s.B.s.S.s.', 'B.s.S.s.B.s.SSSS'] },
  { id: 'fill-2beat', name: '兩拍八分過門', en: 'Two-beat 8th Fill', cat: 'fill', lv: 1, bpm: 75, range: [55, 110], ts: [4, 4], spb: 4,
    bars: ['B.s.S.s.B.s.S.s.', 'B.s.S.s.S.S.S.S.'] },
  { id: 'fill-ballad', name: '抒情過門', en: 'Ballad Fill', cat: 'fill', lv: 1, bpm: 68, range: [55, 85], ts: [4, 4], spb: 4,
    bars: ['B..sS..sB.BsS..s', 'B..sS..sS.S.SSSS'] },
  { id: 'fill-break', name: '停頓 Break', en: 'Stop Break', cat: 'fill', lv: 1, bpm: 80, range: [60, 120], ts: [4, 4], spb: 4,
    bars: ['B.s.S.s.B.s.S.s.', 'B.s.S.s.S.......'], note: '後兩拍完全靜止' },
  { id: 'fill-down', name: '下行過門', en: 'High-to-Low Fill', cat: 'fill', lv: 2, bpm: 80, range: [60, 110], ts: [4, 4], spb: 4,
    bars: ['B.s.S.s.B.s.S.s.', 'B.s.S.s.SSTTBBBB'], note: '響音 → 中音 → 低音' },
  { id: 'fill-up', name: '上行過門', en: 'Low-to-High Fill', cat: 'fill', lv: 2, bpm: 80, range: [60, 110], ts: [4, 4], spb: 4,
    bars: ['B.s.S.s.B.s.S.s.', 'B.s.S.s.BBTTSSSS'], note: '低音 → 中音 → 響音' },
  { id: 'fill-sync', name: '切分過門', en: 'Syncopated Fill', cat: 'fill', lv: 2, bpm: 85, range: [65, 115], ts: [4, 4], spb: 4,
    bars: ['B.s.S.s.B.s.S.s.', 'B.s.S.s.S..S..S.'] },
  { id: 'fill-cresc', name: '漸強過門', en: 'Crescendo Fill', cat: 'fill', lv: 2, bpm: 80, range: [60, 110], ts: [4, 4], spb: 4,
    bars: ['BsBsSsssBsBsSsss', 'ssssSsssSsSsSSSS'], note: '由輕到重' },
  { id: 'fill-para', name: 'Paradiddle 過門', en: 'Paradiddle Fill', cat: 'fill', lv: 2, bpm: 75, range: [55, 105], ts: [4, 4], spb: 4,
    hands: 'RLRLRLRLRLRRLRLL', bars: ['B.s.S.s.B.s.S.s.', 'B.s.S.s.SsssSsss'] },
  { id: 'fill-shuffle', name: 'Shuffle 過門', en: 'Shuffle Fill', cat: 'fill', lv: 2, bpm: 90, range: [70, 130], ts: [4, 4], spb: 3,
    bars: ['B.sS.sB.sS.s', 'B.sS.sS.SSSS'] },
  { id: 'fill-68', name: '6/8 過門', en: '6/8 Fill', cat: 'fill', lv: 2, bpm: 120, range: [90, 160], ts: [6, 8], spb: 2,
    bars: ['B.s.s.S.s.s.', 'B.s.s.SSSSSS'] },
  { id: 'fill-funk', name: '放克過門', en: 'Funk Fill', cat: 'fill', lv: 3, bpm: 90, range: [75, 110], ts: [4, 4], spb: 4,
    bars: ['B.sBSs.Bs.BsSs.s', 'B.sBSs.BSsSBSsSB'] },
  { id: 'fill-bass-dbl', name: '低音雙擊過門', en: 'Double Bass Fill', cat: 'fill', lv: 3, bpm: 80, range: [60, 105], ts: [4, 4], spb: 4,
    bars: ['B.s.S.s.B.s.S.s.', 'BBSsBBSsBBSSBBSS'] },
  { id: 'fill-full', name: '整小節過門', en: 'Full-bar Fill', cat: 'fill', lv: 3, bpm: 80, range: [60, 105], ts: [4, 4], spb: 4,
    bars: ['BsBsSsssBsBsSsss', 'SsSSBsSSTsSSSSSS'] }
];

window.CREATORS = [
  { name: 'Cajon Master', handle: '@CajonMaster', desc: '彩色格狀譜教學', links: [
    { label: 'YouTube', url: 'https://www.youtube.com/@CajonMaster' }, { label: '官網', url: 'https://cajonmaster.com' } ] },
  { name: 'Mr.One 小萬先生', handle: '@mr.one_cajon', desc: '華語流行歌翻奏與教學', links: [
    { label: 'YouTube', url: 'https://www.youtube.com/@mr.one_cajon' }, { label: 'Instagram', url: 'https://www.instagram.com/mr.one_cajon/' } ] },
  { name: 'cajon_s.y.x0410', handle: '@cajon_s.y.x0410', desc: 'IG 木箱鼓創作者', links: [
    { label: 'Instagram', url: 'https://www.instagram.com/cajon_s.y.x0410/' } ] }
];
