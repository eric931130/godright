export type NewsItem = {
  id: string;
  title: string;
  category: "更新" | "活動" | "商品" | "公告";
  summary: string;
  date: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "news-001",
    title: "官方網站第一階段上線",
    category: "公告",
    summary: "七界宇宙首頁、角色精選、世界觀百科與商城預覽正式開啟。",
    date: "2026-06-19",
  },
  {
    id: "news-002",
    title: "第二卷《七界王座》開放預購",
    category: "商品",
    summary: "預購版將附贈天位神榜角色卡數位版與星界七門設定稿。",
    date: "2026-06-18",
  },
  {
    id: "news-003",
    title: "第八章〈最後天命的影子〉更新",
    category: "更新",
    summary: "天魂與天芸的命運線第一次分岔，真正的天命候選現身。",
    date: "2026-06-17",
  },
  {
    id: "news-004",
    title: "神榜角色人氣投票預告",
    category: "活動",
    summary: "投票活動將開放讀者為八位核心角色解鎖限定番外。",
    date: "2026-06-15",
  },
  {
    id: "news-005",
    title: "LINE 貼圖包視覺開發中",
    category: "商品",
    summary: "天魂與天芸首波貼圖將包含戰鬥台詞、日常梗與神諭回覆。",
    date: "2026-06-12",
  },
];
