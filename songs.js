// 歌曲練習資料。sections: [段落名稱, 節奏 id, 小節數]
// 速度參考 Tunebat（Spotify 資料）；段落是木箱鼓練習用的簡化編排，可在 App 內修改。
window.SONG_CATS = ['熱門華語', '神曲'];
window.SONGS = [
  // ---- 熱門華語（2025 台灣播放量最高新歌）
  { id: 'xiangqingtian', title: '像晴天像雨天', artist: '汪蘇瀧', cat: '熱門華語', bpm: 128, yt: 'sT-wpjhYy-0',
    cover: { yt: '0t6IzoOkfTA', by: 'Mr.One 木箱鼓' },
    sections: [['前奏', 'eighth-beat', 4], ['主歌', 'eighth-beat', 16], ['副歌', 'disco', 16], ['過門', 'fill-2beat', 2], ['主歌', 'eighth-beat', 16], ['副歌', 'disco', 16], ['尾奏', 'eighth-beat', 4]] },
  { id: 'renxing', title: '任性', artist: '五月天', cat: '熱門華語', bpm: 136, yt: '85n8v6D3hNY',
    cover: { yt: 'h7WmqdT8ES0', by: 'A FU Cajon' },
    sections: [['前奏', 'rock', 4], ['主歌', 'eighth-beat', 16], ['副歌', 'rock', 16], ['過門', 'fill-2beat', 2], ['主歌', 'eighth-beat', 16], ['副歌', 'rock', 16], ['尾奏', 'rock', 4]] },
  { id: 'kanzhewo', title: '看著我的眼睛說', artist: '張遠', cat: '熱門華語', bpm: 77, yt: 'IkZFVOcahnQ',
    cover: { yt: 'Ja4jG5Sqqtw', by: 'A FU Cajon' },
    sections: [['前奏', 'basic-beat', 4], ['主歌', 'pop-ballad', 16], ['副歌', 'ghost-intro', 16], ['過門', 'fill-ballad', 2], ['主歌', 'pop-ballad', 16], ['副歌', 'ghost-intro', 16], ['尾奏', 'pop-ballad', 4]] },
  { id: 'xingfu', title: '幸福在歌唱', artist: 'A-Lin', cat: '熱門華語', bpm: 65, yt: 'jeRu6h4XbUU',
    cover: { yt: 'IWEk3vO5UMk', by: 'Mr.One 木箱鼓' },
    sections: [['前奏', 'basic-beat', 4], ['主歌', 'pop-ballad', 16], ['副歌', 'worship', 16], ['過門', 'fill-ballad', 2], ['主歌', 'pop-ballad', 16], ['副歌', 'ghost-intro', 16], ['尾奏', 'pop-ballad', 4]] },
  // ---- 神曲（短影音爆紅）
  { id: 'tiaolouji', title: '跳樓機', artist: 'LBI 利比', cat: '神曲', bpm: 128, yt: 'HegSBovl24I',
    cover: { yt: 'SkSqJM5PMcc', by: 'Mr.One 木箱鼓' },
    sections: [['前奏', 'eighth-beat', 4], ['主歌', 'eighth-beat', 16], ['副歌', 'rock', 16], ['過門', 'fill-1beat', 2], ['主歌', 'eighth-beat', 16], ['副歌', 'rock', 16], ['尾奏', 'eighth-beat', 4]] },
  { id: 'haiyuni', title: '海嶼你', artist: '馬也_Crabbit', cat: '神曲', bpm: 75, yt: 'aGlVMnvsSio',
    cover: { yt: '1ZW7peoDayU', by: '動態鼓譜' },
    sections: [['前奏', 'basic-beat', 4], ['主歌', 'pop-ballad', 16], ['副歌', 'ghost-intro', 16], ['過門', 'fill-ballad', 2], ['主歌', 'pop-ballad', 16], ['副歌', 'ghost-intro', 16], ['尾奏', 'pop-ballad', 4]] },
  { id: 'wozouhou', title: '我走後', artist: 'En', cat: '神曲', bpm: 60, yt: 'EqvAqeaUpRQ',
    cover: { yt: 'bBdIpJEd-tc', by: 'Mr.One 木箱鼓（小咪版）' },
    sections: [['前奏', 'basic-beat', 4], ['主歌', 'pop-ballad', 16], ['副歌', 'eighth-beat', 16], ['過門', 'fill-ballad', 2], ['主歌', 'pop-ballad', 16], ['副歌', 'eighth-beat', 16], ['尾奏', 'pop-ballad', 4]] }
];
