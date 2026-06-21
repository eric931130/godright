export type MembershipTier = {
  id: string;
  name: string;
  benefits: string[];
  badge: string;
  color: string;
  unlocks: string[];
};

export type UserBadge = {
  id: string;
  name: string;
  description: string;
  color: string;
};

export type MockOrder = {
  id: string;
  date: string;
  status: "已付款" | "處理中" | "已取消";
  total: number;
  items: string[];
};

export const membershipTiers: MembershipTier[] = [
  {
    id: "free",
    name: "免費會員",
    badge: "初入神界",
    color: "#A8D8FF",
    benefits: ["收藏章節與角色", "接收更新通知", "保留閱讀進度"],
    unlocks: ["免費章節", "公開百科"],
  },
  {
    id: "reader",
    name: "付費讀者",
    badge: "星命觀測者",
    color: "#D9B45F",
    benefits: ["付費章節折扣", "會員限定番外", "章節提前閱讀"],
    unlocks: ["單章付費內容", "會員番外"],
  },
  {
    id: "vip",
    name: "VIP 會員",
    badge: "天界見證者",
    color: "#D9A7FF",
    benefits: ["電子書優惠", "設定集預覽", "角色投票權重"],
    unlocks: ["VIP 番外", "試讀設定集"],
  },
  {
    id: "collector",
    name: "神權收藏者",
    badge: "神權收藏者",
    color: "#F4EBD0",
    benefits: ["收藏版商品優先購買", "限定徽章", "完整下載庫"],
    unlocks: ["收藏版全套組", "典藏設定資料"],
  },
];

export const userBadges: UserBadge[] = [
  { id: "b1", name: "初入神界", description: "完成首次註冊。", color: "#A8D8FF" },
  { id: "b2", name: "星命觀測者", description: "閱讀任一星界章節。", color: "#D9A7FF" },
  { id: "b3", name: "天界見證者", description: "追蹤天位神榜更新。", color: "#D9B45F" },
  { id: "b4", name: "深淵契約者", description: "收藏深淵魔殿角色。", color: "#6D4DFF" },
  { id: "b5", name: "神權收藏者", description: "購買任一收藏商品。", color: "#F4EBD0" },
  { id: "b6", name: "最後天命追隨者", description: "閱讀最新章節。", color: "#D9B45F" },
  { id: "b7", name: "七界探索者", description: "瀏覽七界地圖。", color: "#A8D8FF" },
  { id: "b8", name: "角色收藏家", description: "收藏 5 位角色。", color: "#D9A7FF" },
];

export const mockOrders: MockOrder[] = [
  { id: "ORD-260620-001", date: "2026-06-20", status: "已付款", total: 1280, items: ["收藏版全套組"] },
  { id: "ORD-260618-002", date: "2026-06-18", status: "已付款", total: 340, items: ["第一卷電子書", "天魂角色設定集"] },
  { id: "ORD-260615-003", date: "2026-06-15", status: "處理中", total: 120, items: ["角色電腦桌布包"] },
];

export const recentActivities = [
  "閱讀〈最後天命的影子〉至 86%",
  "收藏角色：天魂",
  "加入書架：星界第七門",
  "購買：第一卷電子書",
  "訂閱：小說更新、活動通知",
];
