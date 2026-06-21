export type Product = {
  id: string;
  name: string;
  category: "電子書" | "周邊" | "貼圖";
  description: string;
  price: string;
  badge: string;
  imageAlt: string;
};

export const products: Product[] = [
  {
    id: "ebook-v1",
    name: "第一卷：神榜裂痕",
    category: "電子書",
    description: "收錄序章至九尊會審，附角色設定小冊與封印陣草稿。",
    price: "NT$ 180",
    badge: "首卷",
    imageAlt: "第一卷電子書封面預留位置",
  },
  {
    id: "ebook-v2",
    name: "第二卷：七界王座",
    category: "電子書",
    description: "七界霸主現身，天命之子的真相開始反噬神權。",
    price: "NT$ 220",
    badge: "新刊預購",
    imageAlt: "第二卷電子書封面預留位置",
  },
  {
    id: "sticker-tianhun",
    name: "天魂 LINE 貼圖包",
    category: "貼圖",
    description: "神魔之子的冷面吐槽、戰鬥台詞與日常反差表情。",
    price: "NT$ 60",
    badge: "貼圖",
    imageAlt: "天魂貼圖包預留位置",
  },
  {
    id: "sticker-tianyun",
    name: "天芸夢印貼圖包",
    category: "貼圖",
    description: "夢幻之女的神諭、治癒、祈願與星光提示系列。",
    price: "NT$ 60",
    badge: "貼圖",
    imageAlt: "天芸貼圖包預留位置",
  },
  {
    id: "poster-seven-realms",
    name: "七界星圖典藏海報",
    category: "周邊",
    description: "深空黑底燙金版七界地圖，標示神殿、界門與封印點。",
    price: "NT$ 420",
    badge: "典藏",
    imageAlt: "七界星圖海報預留位置",
  },
  {
    id: "card-godrank",
    name: "天位神榜角色卡組",
    category: "周邊",
    description: "8 張角色卡與 8 張戰力位階卡，附神榜透明收納套。",
    price: "NT$ 360",
    badge: "限量",
    imageAlt: "天位神榜角色卡組預留位置",
  },
];
