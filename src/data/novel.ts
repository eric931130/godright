export type Volume = {
  id: string;
  title: string;
  slug: string;
  description: string;
  order: number;
};

export type Chapter = {
  id: string;
  title: string;
  slug: string;
  volume: string;
  volumeSlug: string;
  excerpt: string;
  content: string[];
  isFree: boolean;
  isPaid: boolean;
  price: number;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  authorNote: string;
  // 付費章節鎖定頁用的安全短欄位（非正文，可送至 client）。
  previewText?: string;
  appearingCharacterSlugs?: string[];
  keyLore?: string[];
};

export type NovelCatalog = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  status: "連載中" | "已完結" | "籌備中";
  wordCount: string;
  categories: string[];
  coverAlt: string;
  description: string;
  volumes: Volume[];
  chapters: Chapter[];
};

export type UserUnlock = {
  id: string;
  userId: string;
  chapterId: string;
  unlockedAt: string;
  source: "single_chapter" | "volume_purchase" | "membership";
};

export type Purchase = {
  id: string;
  userId: string;
  targetType: "chapter" | "volume" | "ebook";
  targetId: string;
  amount: number;
  currency: "TWD";
  status: "pending" | "paid" | "failed" | "refunded";
  purchasedAt: string;
};

export type ReadingProgress = {
  chapterId: string;
  volumeSlug: string;
  chapterSlug: string;
  progress: number;
  updatedAt: string;
};

export type Bookmark = {
  chapterId: string;
  volumeSlug: string;
  chapterSlug: string;
  title: string;
  note?: string;
  createdAt: string;
};

const makeContent = (title: string, keyword: string) => [
  `${title} 的夜色從神殿穹頂垂落，像一張覆滿星屑的黑色長卷。${keyword}在遠方震動，所有被遺忘的誓約都開始發熱。`,
  "天魂站在裂開的石階前，聽見血脈深處同時傳來神諭與魔音。它們互相撕咬，卻又指向同一個答案：神權正在失去它最後的合法性。",
  "天芸閉上眼，夢印在眉心綻放。她看見三殿九尊的影子投向凡界，看見上古封印下有一個名字被反覆抹去，又反覆浮現。",
  "風從星界七門吹入凡界，帶著月光、灰燼與金色律令。沒有任何人能判斷這是救贖的開始，還是另一場審判的序章。",
  "當鐘聲第三次響起，天位神榜上的文字像燃燒的雨落下。所有人都明白，真正的天命之子不會被神選出，而會在神權崩壞後自行站起。",
];

export const volumes: Volume[] = [
  {
    id: "vol-1",
    title: "第一卷：神榜裂痕",
    slug: "godrank-fracture",
    description: "天位神榜首次出現禁名，神權崩壞的裂痕從黃金神殿蔓延至凡界。",
    order: 1,
  },
  {
    id: "vol-2",
    title: "第二卷：七界王座",
    slug: "seven-realms-throne",
    description: "七界霸主被迫表態，星界七門開啟，凡界古王國重新立誓。",
    order: 2,
  },
  {
    id: "vol-3",
    title: "第三卷：最後天命",
    slug: "final-mandate",
    description: "神魔之子與夢幻之女抵達上古封印核心，最後天命的候選者浮出水面。",
    order: 3,
  },
];

export const chapters: Chapter[] = [
  {
    id: "ch-001",
    title: "天位神榜墜落之夜",
    slug: "night-of-fallen-godrank",
    volume: volumes[0].title,
    volumeSlug: volumes[0].slug,
    excerpt: "黃金神殿的鐘聲在深夜碎裂，天位神榜第一次寫下不可讀的名字。",
    content: makeContent("天位神榜墜落之夜", "天位神榜"),
    isFree: true,
    isPaid: false,
    price: 0,
    publishedAt: "2026-06-01",
    readingTime: "12 分鐘",
    tags: ["神榜", "黃金神殿", "開篇"],
    authorNote: "這一章是七界秩序崩塌的第一聲鐘響。",
  },
  {
    id: "ch-002",
    title: "深淵魔印甦醒",
    slug: "abyssal-mark-awakens",
    volume: volumes[0].title,
    volumeSlug: volumes[0].slug,
    excerpt: "天魂胸口的黑金印記燃起，凡界北境的封印井開始倒流星光。",
    content: makeContent("深淵魔印甦醒", "深淵魔印"),
    isFree: true,
    isPaid: false,
    price: 0,
    publishedAt: "2026-06-03",
    readingTime: "13 分鐘",
    tags: ["天魂", "深淵魔殿", "魔印"],
    authorNote: "天魂的力量不是單純外掛，而是世界觀衝突本身。",
  },
  {
    id: "ch-003",
    title: "夢幻之女入殿",
    slug: "dream-maiden-enters-temple",
    volume: volumes[0].title,
    volumeSlug: volumes[0].slug,
    excerpt: "天芸踏入天幻神殿，聽見上古三大上神留在夢中的最後警告。",
    content: makeContent("夢幻之女入殿", "夢印"),
    isFree: true,
    isPaid: false,
    price: 0,
    publishedAt: "2026-06-05",
    readingTime: "14 分鐘",
    tags: ["天芸", "天幻神殿", "夢印"],
    authorNote: "天芸的視角會把神話感拉回人的情感。",
  },
  {
    id: "ch-004",
    title: "九尊會審",
    slug: "trial-of-nine-venerables",
    volume: volumes[0].title,
    volumeSlug: volumes[0].slug,
    excerpt: "三殿九尊齊聚星階，卻沒有任何一位神願意說出真正的罪名。",
    content: makeContent("九尊會審", "三殿九尊"),
    isFree: true,
    isPaid: false,
    price: 0,
    publishedAt: "2026-06-08",
    readingTime: "16 分鐘",
    tags: ["三殿九尊", "審判", "神權"],
    authorNote: "這章奠定三大神殿彼此猜忌的政治張力。",
  },
  {
    id: "ch-005",
    title: "蒼瀾古王的密詔",
    slug: "edict-of-canglan-king",
    volume: volumes[0].title,
    volumeSlug: volumes[0].slug,
    excerpt: "凡界北境的王印被打開，四大古王國共同守護的秘密浮出冰海。",
    content: makeContent("蒼瀾古王的密詔", "蒼瀾王印"),
    isFree: true,
    isPaid: false,
    price: 0,
    publishedAt: "2026-06-11",
    readingTime: "15 分鐘",
    tags: ["凡界", "古王國", "密詔"],
    authorNote: "凡界不是弱者舞台，而是天命真正的保管者。",
  },
  {
    id: "ch-006",
    title: "星界第七門",
    slug: "seventh-star-gate",
    volume: volumes[0].title,
    volumeSlug: volumes[0].slug,
    excerpt: "琉璃星君開啟第七門，門後不是星空，而是一座被遺忘的神墓。",
    content: makeContent("星界第七門", "星界七門"),
    isFree: true,
    isPaid: false,
    price: 0,
    publishedAt: "2026-06-14",
    readingTime: "18 分鐘",
    tags: ["星界", "琉璃星君", "神墓"],
    authorNote: "第七門是世界觀第一次露出真正的深度。",
  },
  {
    id: "ch-007",
    title: "黃金裁決令",
    slug: "golden-decree",
    volume: volumes[0].title,
    volumeSlug: volumes[0].slug,
    excerpt: "金曜帝君下令抹除天魂之名，整個天界因此分裂成兩道神諭。",
    content: makeContent("黃金裁決令", "黃金裁決"),
    isFree: true,
    isPaid: false,
    price: 0,
    publishedAt: "2026-06-17",
    readingTime: "17 分鐘",
    tags: ["黃金神殿", "裁決", "金曜帝君"],
    authorNote: "裁決令讓天魂第一次成為制度性的敵人。",
  },
  {
    id: "ch-008",
    title: "最後天命的影子",
    slug: "shadow-of-final-mandate",
    volume: volumes[0].title,
    volumeSlug: volumes[0].slug,
    excerpt: "當天魂以為自己是答案，天芸卻在夢中看見另一個無名的孩子。",
    content: makeContent("最後天命的影子", "最後天命"),
    isFree: true,
    isPaid: false,
    price: 0,
    publishedAt: "2026-06-19",
    readingTime: "19 分鐘",
    tags: ["天命之子", "天魂", "天芸"],
    authorNote: "免費篇章到這裡告一段落，也留下付費篇章的核心懸念。",
  },
  ...Array.from({ length: 12 }, (_, index) => {
    const number = index + 9;
    const volumeIndex = number <= 14 ? 1 : 2;
    const titlePool = [
      "七界王座初鳴",
      "深淵王冠的裂縫",
      "天界四神的背誓",
      "夢印照見神墓",
      "凡界古盟重啟",
      "七界霸主降臨",
      "無涯書聖的原始榜卷",
      "封印核心的低語",
      "神魔血契燃盡",
      "天芸夢中審判",
      "神權最後一日",
      "天命之子無名",
    ];
    const title = titlePool[index];

    return {
      id: `ch-${String(number).padStart(3, "0")}`,
      title,
      slug: [
        "seven-realms-throne-sounds",
        "abyss-crown-fracture",
        "betrayal-of-four-gods",
        "dream-mark-sees-god-tomb",
        "mortal-ancient-oath",
        "arrival-of-seven-overlords",
        "original-godrank-scroll",
        "whisper-of-seal-core",
        "god-demon-blood-pact",
        "tianyun-dream-trial",
        "last-day-of-divine-rule",
        "nameless-mandate-child",
      ][index],
      volume: volumes[volumeIndex].title,
      volumeSlug: volumes[volumeIndex].slug,
      excerpt: [
        "七界王座同時發出回音，所有霸主都聽見自己的名字被神榜改寫。",
        "深淵王冠出現裂縫，玄冥尊者第一次承認魔殿也害怕真相。",
        "天界四神收到互相矛盾的神諭，焰姬選擇放走天魂。",
        "天芸在夢中看見神墓開門，門內站著本該死去的上神。",
        "凡界四大古王國重啟盟約，蒼瀾古王交出最後王印。",
        "七界霸主降臨星階，神界再也無法獨自定義秩序。",
        "無涯書聖取出原始榜卷，證明天位神榜曾被黃金神殿篡改。",
        "上古封印核心傳來低語，天魂聽見自己的第二個名字。",
        "神魔血契燃盡，天魂必須在力量與自我之間做出選擇。",
        "天芸被拉入夢中審判，陪審者竟是失蹤的天古三大上神。",
        "神權最後一日降臨，三殿九尊終於承認審判本身就是罪。",
        "無名的孩子站上神榜空白處，最後天命不再屬於任何神。",
      ][index],
      content: makeContent(title, "付費神紋"),
      isFree: false,
      isPaid: true,
      price: index < 6 ? 20 : 30,
      publishedAt: `2026-07-${String(index + 1).padStart(2, "0")}`,
      readingTime: `${16 + (index % 5)} 分鐘`,
      tags: ["付費章節", volumes[volumeIndex].title, index < 6 ? "七界王座" : "最後天命"],
      authorNote: "這是付費章節 mock，正式上線後會由會員權限與購買紀錄決定是否解鎖。",
      previewText: `${title}——當神紋封印鬆動，七界的秩序再次傾斜。精彩片段僅供試閱，完整內容需解鎖後閱讀。`,
      appearingCharacterSlugs: (() => {
        const pool = ["tianhun", "tianyun", "jinyao", "liuli", "canglan", "shenhuan", "moyuan", "wuya"];
        return [pool[index % pool.length], pool[(index + 3) % pool.length]];
      })(),
      keyLore: index < 6 ? ["七界王座", "星界七門"] : ["上古封印", "最後天命"],
    } satisfies Chapter;
  }),
];

export const novelCatalog: NovelCatalog = {
  id: "godright-collapse",
  title: "神權崩壞：誰是最後的天命之子",
  subtitle: "當神權崩壞，誰才是最後被命運選中的天命之子？",
  author: "Godright IP Studio",
  status: "連載中",
  wordCount: "約 18.6 萬字",
  categories: ["東方神權幻想", "七界宇宙", "神魔對立", "天命之子", "暗黑神殿"],
  coverAlt: "神權崩壞小說封面預留位置",
  description:
    "天位神榜墜落，三殿九尊互相審判。神魔之子天魂與夢幻之女天芸將穿越七界王座，追尋被上古封印抹去的最後天命。",
  volumes,
  chapters,
};

export const freeChapters = chapters.filter((chapter) => chapter.isFree);
export const paidChapters = chapters.filter((chapter) => chapter.isPaid);

export function getVolume(volumeSlug: string) {
  return volumes.find((volume) => volume.slug === volumeSlug);
}

export function getChaptersByVolume(volumeSlug: string) {
  return chapters.filter((chapter) => chapter.volumeSlug === volumeSlug);
}

export function getChapter(volumeSlug: string, chapterSlug: string) {
  return chapters.find(
    (chapter) => chapter.volumeSlug === volumeSlug && chapter.slug === chapterSlug,
  );
}

export function getAdjacentChapters(chapterId: string) {
  const index = chapters.findIndex((chapter) => chapter.id === chapterId);

  return {
    previous: index > 0 ? chapters[index - 1] : undefined,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}
