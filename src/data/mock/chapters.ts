export type Chapter = {
  id: string;
  volume: string;
  title: string;
  number: number;
  excerpt: string;
  status: "免費" | "會員" | "付費";
  publishedAt: string;
  readingTime: string;
};

export const chapters: Chapter[] = [
  {
    id: "ch-001",
    volume: "第一卷：神榜裂痕",
    title: "天位神榜墜落之夜",
    number: 1,
    excerpt: "黃金神殿的鐘聲在深夜碎裂，天位神榜第一次寫下不可讀的名字。",
    status: "免費",
    publishedAt: "2026-06-01",
    readingTime: "12 分鐘",
  },
  {
    id: "ch-002",
    volume: "第一卷：神榜裂痕",
    title: "深淵魔印甦醒",
    number: 2,
    excerpt: "天魂胸口的黑金印記燃起，凡界北境的封印井開始倒流星光。",
    status: "免費",
    publishedAt: "2026-06-03",
    readingTime: "14 分鐘",
  },
  {
    id: "ch-003",
    volume: "第一卷：神榜裂痕",
    title: "夢幻之女入殿",
    number: 3,
    excerpt: "天芸踏入天幻神殿，聽見上古三大上神留在夢中的最後警告。",
    status: "免費",
    publishedAt: "2026-06-05",
    readingTime: "13 分鐘",
  },
  {
    id: "ch-004",
    volume: "第一卷：神榜裂痕",
    title: "九尊會審",
    number: 4,
    excerpt: "三殿九尊齊聚星階，卻沒有任何一位神願意說出真正的罪名。",
    status: "會員",
    publishedAt: "2026-06-08",
    readingTime: "16 分鐘",
  },
  {
    id: "ch-005",
    volume: "第二卷：七界王座",
    title: "蒼瀾古王的密詔",
    number: 5,
    excerpt: "凡界北境的王印被打開，四大古王國共同守護的秘密浮出冰海。",
    status: "會員",
    publishedAt: "2026-06-11",
    readingTime: "15 分鐘",
  },
  {
    id: "ch-006",
    volume: "第二卷：七界王座",
    title: "星界第七門",
    number: 6,
    excerpt: "琉璃星君開啟第七門，門後不是星空，而是一座被遺忘的神墓。",
    status: "付費",
    publishedAt: "2026-06-14",
    readingTime: "18 分鐘",
  },
  {
    id: "ch-007",
    volume: "第二卷：七界王座",
    title: "黃金裁決令",
    number: 7,
    excerpt: "金曜帝君下令抹除天魂之名，整個天界因此分裂成兩道神諭。",
    status: "付費",
    publishedAt: "2026-06-17",
    readingTime: "17 分鐘",
  },
  {
    id: "ch-008",
    volume: "第二卷：七界王座",
    title: "最後天命的影子",
    number: 8,
    excerpt: "當天魂以為自己是答案，天芸卻在夢中看見另一個無名的孩子。",
    status: "付費",
    publishedAt: "2026-06-19",
    readingTime: "19 分鐘",
  },
];
