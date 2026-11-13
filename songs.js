// 歌曲資料補充：排行榜歌單（charts.json）每月由 GitHub Actions 自動更新；
// 這裡補上速度、段落、木箱鼓示範與名稱修正。key 可用 YouTube 影片 id 或解析出的歌名。
// sections: [段落名稱, 節奏 id, 小節數]
window.SONG_META = {
  // 名稱修正
  'brDLsqPS9sY': { title: '再見的時候', artist: '洪佩瑜' },
  '沒有人像我一樣': { artist: '宇宙人' },
  '過了幾天': { artist: 'DIOR大穎、郭家瑋' },
  '跳楼机': { title: '跳樓機', artist: 'LBI 利比', bpm: 128, cover: { yt: 'SkSqJM5PMcc', by: 'Mr.One 木箱鼓' },
    sections: [['前奏', 'eighth-beat', 4], ['主歌', 'eighth-beat', 16], ['導歌', 'eighth-beat', 8], ['副歌', 'rock', 16], ['間奏', 'fill-1beat', 2], ['主歌', 'eighth-beat', 16], ['導歌', 'eighth-beat', 8], ['停頓', 'rest', 1], ['副歌', 'rock', 16], ['橋段', 'rest', 8], ['副歌', 'rock', 16], ['尾奏', 'eighth-beat', 4]] },
  '爱错': { title: '愛錯', artist: 'En' },
  '張紫寧 李鑫一': { title: '一念', artist: '張紫寧、李鑫一' },
  'I Do': { artist: '周杰倫' },
  '流星雨': { artist: 'F4 × 五月天' },
  '妥協': { artist: 'En' },
  // 已補速度
  '像晴天像雨天': { bpm: 128, cover: { yt: '0t6IzoOkfTA', by: 'Mr.One 木箱鼓' },
    sections: [['前奏', 'eighth-beat', 4], ['主歌', 'eighth-beat', 16], ['導歌', 'eighth-beat', 8], ['副歌', 'disco', 16], ['間奏', 'fill-2beat', 2], ['主歌', 'eighth-beat', 16], ['導歌', 'eighth-beat', 8], ['停頓', 'rest', 1], ['副歌', 'disco', 16], ['橋段', 'rest', 8], ['副歌', 'disco', 16], ['尾奏', 'eighth-beat', 4]] },
  '任性': { bpm: 136, artist: '五月天', cover: { yt: 'h7WmqdT8ES0', by: 'A FU Cajon' },
    sections: [['前奏', 'rock', 4], ['主歌', 'eighth-beat', 16], ['導歌', 'eighth-beat', 8], ['副歌', 'rock', 16], ['間奏', 'fill-2beat', 2], ['主歌', 'eighth-beat', 16], ['導歌', 'eighth-beat', 8], ['副歌', 'rock', 16], ['橋段', 'rest', 8], ['過門', 'fill-2beat', 1], ['副歌', 'rock', 16], ['尾奏', 'rock', 4]] },
  '看著我的眼睛說': { bpm: 77, cover: { yt: 'Ja4jG5Sqqtw', by: 'A FU Cajon' },
    sections: [['前奏', 'rest', 4], ['主歌', 'rest', 8], ['主歌', 'pop-ballad', 8], ['副歌', 'ghost-intro', 16], ['間奏', 'rest', 4], ['主歌', 'pop-ballad', 16], ['副歌', 'ghost-intro', 16], ['橋段', 'rest', 8], ['過門', 'fill-ballad', 1], ['副歌', 'ghost-intro', 16], ['尾奏', 'rest', 4]] },
  '幸福在歌唱': { bpm: 65, cover: { yt: 'IWEk3vO5UMk', by: 'Mr.One 木箱鼓' },
    sections: [['前奏', 'rest', 4], ['主歌', 'rest', 16], ['副歌', 'worship', 16], ['間奏', 'rest', 4], ['主歌', 'pop-ballad', 16], ['副歌', 'ghost-intro', 16], ['橋段', 'rest', 8], ['過門', 'fill-ballad', 1], ['副歌', 'ghost-intro', 16], ['尾奏', 'rest', 4]] },
  '海嶼你': { bpm: 75, artist: '馬也_Crabbit', cover: { yt: '1ZW7peoDayU', by: '動態鼓譜' },
    sections: [['前奏', 'rest', 4], ['主歌', 'rest', 16], ['副歌', 'pop-ballad', 16], ['間奏', 'rest', 4], ['主歌', 'pop-ballad', 16], ['副歌', 'ghost-intro', 16], ['橋段', 'rest', 8], ['過門', 'fill-ballad', 1], ['副歌', 'ghost-intro', 16], ['尾奏', 'rest', 4]] }
};
// 沒有速度資料時的預設段落
window.SONG_DEFAULT_SECTIONS = [['前奏', 'rest', 4], ['主歌', 'pop-ballad', 16], ['副歌', 'eighth-beat', 16], ['間奏', 'fill-basic', 2], ['主歌', 'pop-ballad', 16], ['副歌', 'eighth-beat', 16], ['橋段', 'rest', 8], ['副歌', 'eighth-beat', 16], ['尾奏', 'rest', 4]];
