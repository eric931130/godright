export type HallCategory = "story" | "character" | "lore" | "paid_help" | "merch" | "question" | "official";

export type HallPost = {
  id: string;
  authorUid: string;
  authorPublicUid: string;
  authorDisplayName: string;
  authorAvatarUrl?: string;
  title: string;
  content: string;
  category: HallCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  isPinned: boolean;
  isLocked: boolean;
  isHidden: boolean;
  isOfficial: boolean;
};

export type HallComment = {
  id: string;
  postId: string;
  authorUid: string;
  authorPublicUid: string;
  authorDisplayName: string;
  authorAvatarUrl?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  isHidden: boolean;
};

export type HallReport = {
  id: string;
  targetType: "post" | "comment";
  targetId: string;
  reporterUid: string;
  reason: string;
  createdAt: string;
  status: "pending" | "reviewed" | "resolved" | "dismissed";
};

export const hallCategoryLabels: Record<HallCategory, string> = {
  story: "劇情討論",
  character: "角色討論",
  lore: "世界觀討論",
  paid_help: "付費章節問題",
  merch: "周邊與貼圖",
  question: "新手發問",
  official: "官方公告",
};

export const hallPosts: HallPost[] = [
  {
    id: "hall-official-001",
    authorUid: "official",
    authorPublicUid: "0000000001",
    authorDisplayName: "神權官方",
    title: "閱讀大廳試營運開啟",
    content: "歡迎來到七界閱讀大廳。請避免劇透付費章節完整內容，付費問題可使用專屬分類回報。",
    category: "official",
    tags: ["公告", "試營運"],
    createdAt: "2026-06-21",
    updatedAt: "2026-06-21",
    likeCount: 128,
    commentCount: 12,
    isPinned: true,
    isLocked: false,
    isHidden: false,
    isOfficial: true,
  },
  {
    id: "hall-story-001",
    authorUid: "mock-user",
    authorPublicUid: "1000000001",
    authorDisplayName: "星命觀測者",
    title: "天魂的神魔雙屬性是不是封印漏洞？",
    content: "第八章後我覺得天魂不是單純被選中，而是上古封印自己製造出的矛盾。",
    category: "story",
    tags: ["天魂", "上古封印"],
    createdAt: "2026-06-21",
    updatedAt: "2026-06-21",
    likeCount: 43,
    commentCount: 8,
    isPinned: false,
    isLocked: false,
    isHidden: false,
    isOfficial: false,
  },
  {
    id: "hall-paid-001",
    authorUid: "mock-paid",
    authorPublicUid: "1000000002",
    authorDisplayName: "深淵契約者",
    title: "購買第二卷後第九章仍顯示鎖定",
    content: "已完成付款但權限沒有更新，想確認是不是需要人工補解鎖。",
    category: "paid_help",
    tags: ["權限", "付款"],
    createdAt: "2026-06-20",
    updatedAt: "2026-06-20",
    likeCount: 7,
    commentCount: 3,
    isPinned: false,
    isLocked: false,
    isHidden: false,
    isOfficial: false,
  },
];

export const hallComments: HallComment[] = [
  {
    id: "comment-001",
    postId: "hall-story-001",
    authorUid: "mock-user-2",
    authorPublicUid: "1000000003",
    authorDisplayName: "夢印讀者",
    content: "我也覺得魔印和夢印可能是一組鑰匙。",
    createdAt: "2026-06-21",
    isHidden: false,
  },
];
