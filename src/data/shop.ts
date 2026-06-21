export type ProductCategory =
  | "電子書"
  | "小說合集"
  | "角色設定集"
  | "世界觀設定集"
  | "角色美術圖包"
  | "LINE 貼圖展示"
  | "手機桌布"
  | "電腦桌布"
  | "海報圖"
  | "明信片圖"
  | "未來實體周邊預留";

export type ProductType = "ebook" | "bundle" | "artbook" | "setting" | "wallpaper" | "sticker" | "poster" | "postcard" | "physical_reserved";

/** 電子書銷售頁的進階內容（全選填，僅電子書類商品需要）。 */
export type EbookProductExtra = {
  tagline?: string;
  authorPreface?: string;
  introduction?: string;
  includedChapters?: string[];
  previewChapterIds?: string[];
  bonusItems?: string[];
  fileFormats: ("PDF" | "EPUB" | "MOBI")[];
  pageCount?: number;
  wordCount?: number;
  previewImages?: string[];
  licenseDescription: string;
  faq?: { question: string; answer: string }[];
  recommendedProductSlugs?: string[];
};

export type ShopProduct = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: "TWD";
  category: ProductCategory;
  type: ProductType;
  coverImage: string;
  gallery: string[];
  fileFormat: string[];
  pageCount?: number;
  wordCount?: string;
  downloadType: "single_file" | "zip_bundle" | "cloud_library" | "future_shipping";
  licenseType: "personal" | "collector" | "commercial_preview";
  isDigital: boolean;
  isFeatured: boolean;
  tags: string[];
  relatedCharacters: string[];
  relatedChapters: string[];
  ebook?: EbookProductExtra;
  createdAt: string;
  updatedAt: string;
};

export const productCategories: ProductCategory[] = [
  "電子書",
  "小說合集",
  "角色設定集",
  "世界觀設定集",
  "角色美術圖包",
  "LINE 貼圖展示",
  "手機桌布",
  "電腦桌布",
  "海報圖",
  "明信片圖",
  "未來實體周邊預留",
];

export const shopProducts: ShopProduct[] = [
  {
    id: "prod-ebook-01",
    slug: "volume-one-godrank-fracture",
    title: "第一卷電子書：神榜裂痕",
    subtitle: "天位神榜墜落，神權崩壞的第一道裂縫。",
    description: "收錄第一卷完整章節、作者備註、神榜裂痕篇設定導讀與封印陣草圖。",
    price: 180,
    originalPrice: 220,
    currency: "TWD",
    category: "電子書",
    type: "ebook",
    coverImage: "/placeholder/ebook-1.jpg",
    gallery: ["/placeholder/ebook-1-a.jpg", "/placeholder/ebook-1-b.jpg"],
    fileFormat: ["EPUB", "PDF"],
    pageCount: 268,
    wordCount: "約 8.2 萬字",
    downloadType: "cloud_library",
    licenseType: "personal",
    isDigital: true,
    isFeatured: true,
    tags: ["第一卷", "神榜", "免費篇延伸"],
    relatedCharacters: ["tianhun", "tianyun", "jinyao"],
    relatedChapters: ["ch-001", "ch-008"],
    ebook: {
      tagline: "天位神榜墜落的那一夜，七界命運重新洗牌。",
      authorPreface:
        "《神榜裂痕》是整個七界宇宙的起點。我想寫的不是一個被神選中的英雄，而是當神權本身開始崩壞時，凡人與神魔如何各自選擇站立的位置。這一卷收錄了免費連載的開篇，並補上大量設定與作者導讀，獻給願意走進這個世界的你。",
      introduction:
        "黃金神殿鐘聲碎裂，天位神榜第一次寫下不可讀的名字。天魂胸口的黑金魔印甦醒，天芸在天幻神殿聽見上古三大上神的最後警告。第一卷完整收錄神榜裂痕篇，附封印陣草圖與神榜位階導讀。",
      includedChapters: [
        "天位神榜墜落之夜",
        "深淵魔印甦醒",
        "夢幻之女入殿",
        "九尊會審",
        "蒼瀾古王的密詔",
        "星界第七門",
        "黃金裁決令",
        "最後天命的影子",
      ],
      previewChapterIds: ["ch-001", "ch-003"],
      bonusItems: [
        "封印陣高解析草圖（PNG）",
        "神榜裂痕篇設定導讀 PDF",
        "天位神榜位階對照表",
        "作者手寫世界觀筆記掃描",
      ],
      fileFormats: ["EPUB", "PDF"],
      pageCount: 268,
      wordCount: 82000,
      previewImages: ["/placeholder/ebook-1-preview-a.jpg", "/placeholder/ebook-1-preview-b.jpg", "/placeholder/ebook-1-preview-c.jpg"],
      licenseDescription:
        "本電子書授權限個人閱讀與收藏，不得轉售、公開散布、上傳至任何平台、用於 AI 模型訓練或商業印製。",
      faq: [
        { question: "購買後如何下載？", answer: "付款完成後可於『會員中心 → 我的下載』取得受控下載連結，支援多次下載。" },
        { question: "支援哪些裝置？", answer: "EPUB 適用主流電子書閱讀器與手機 App，PDF 適合電腦與平板閱讀。" },
        { question: "免費章節已經看過，還值得買嗎？", answer: "電子書補上設定導讀、封印陣草圖與作者筆記，並提供離線收藏與更舒適的排版。" },
      ],
      recommendedProductSlugs: ["tianhun-character-setting", "character-mobile-wallpaper-pack"],
    },
    createdAt: "2026-06-01",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-ebook-02",
    slug: "volume-two-seven-realms-throne",
    title: "第二卷電子書：七界王座",
    subtitle: "七界霸主降臨，星界七門全面開啟。",
    description: "收錄第二卷章節、七界王座彩頁設定與角色關係補充筆記。",
    price: 220,
    originalPrice: 260,
    currency: "TWD",
    category: "電子書",
    type: "ebook",
    coverImage: "/placeholder/ebook-2.jpg",
    gallery: ["/placeholder/ebook-2-a.jpg", "/placeholder/ebook-2-b.jpg"],
    fileFormat: ["EPUB", "PDF"],
    pageCount: 312,
    wordCount: "約 10.4 萬字",
    downloadType: "cloud_library",
    licenseType: "personal",
    isDigital: true,
    isFeatured: true,
    tags: ["第二卷", "七界", "預購"],
    relatedCharacters: ["tianhun", "liuli", "canglan"],
    relatedChapters: ["ch-009", "ch-014"],
    ebook: {
      tagline: "七界霸主降臨，星界七門全面開啟。",
      authorPreface:
        "第二卷把舞台從神殿拉向整個七界。當霸主們被迫表態，凡界古王國重新立誓，故事的格局正式展開。這一卷是我寫得最暢快的篇章，也埋下了通往最後天命的關鍵伏筆。",
      introduction:
        "七界王座同時發出回音，深淵王冠出現裂縫，天界四神收到互相矛盾的神諭。第二卷收錄七界王座篇章節，附七界王座彩頁設定與角色關係補充筆記。",
      includedChapters: ["七界王座初鳴", "深淵王冠的裂縫", "天界四神的背誓", "夢印照見神墓", "凡界古盟重啟", "七界霸主降臨"],
      previewChapterIds: ["ch-006"],
      bonusItems: ["七界王座彩頁設定（PNG）", "星界七門規則設定 PDF", "角色關係補充筆記"],
      fileFormats: ["EPUB", "PDF"],
      pageCount: 312,
      wordCount: 104000,
      previewImages: ["/placeholder/ebook-2-preview-a.jpg", "/placeholder/ebook-2-preview-b.jpg"],
      licenseDescription:
        "本電子書授權限個人閱讀與收藏，不得轉售、公開散布、上傳至任何平台、用於 AI 模型訓練或商業印製。",
      faq: [
        { question: "第二卷可以單獨閱讀嗎？", answer: "建議先閱讀第一卷免費章節掌握世界觀，第二卷會延續神榜裂痕的伏筆。" },
        { question: "是否包含彩頁？", answer: "電子書內含七界王座彩頁設定與角色關係筆記。" },
      ],
      recommendedProductSlugs: ["seven-realms-worldbook", "character-desktop-wallpaper-pack"],
    },
    createdAt: "2026-06-12",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-bundle-ancient-mystery",
    slug: "ancient-mystery-bundle",
    title: "上古之謎篇合集",
    subtitle: "封印、神墓與原始榜卷的合集版。",
    description: "精選上古封印相關章節與設定頁，附時間線與事件索引。",
    price: 360,
    originalPrice: 460,
    currency: "TWD",
    category: "小說合集",
    type: "bundle",
    coverImage: "/placeholder/bundle-ancient.jpg",
    gallery: ["/placeholder/bundle-a.jpg"],
    fileFormat: ["PDF", "EPUB", "ZIP"],
    pageCount: 420,
    wordCount: "約 13.8 萬字",
    downloadType: "zip_bundle",
    licenseType: "collector",
    isDigital: true,
    isFeatured: true,
    tags: ["合集", "上古封印", "收藏版"],
    relatedCharacters: ["wuya", "tianyun"],
    relatedChapters: ["ch-015", "ch-020"],
    createdAt: "2026-06-18",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-setting-tianhun",
    slug: "tianhun-character-setting",
    title: "天魂角色設定集",
    subtitle: "白髮、異色瞳、神魔雙刃與紫黑魔翼。",
    description: "核心男主天魂的造型設定、武器拆解、色票與劇情演變筆記。",
    price: 160,
    currency: "TWD",
    category: "角色設定集",
    type: "setting",
    coverImage: "/placeholder/tianhun-setting.jpg",
    gallery: ["/placeholder/tianhun-a.jpg", "/placeholder/tianhun-b.jpg"],
    fileFormat: ["PDF", "PNG"],
    pageCount: 48,
    downloadType: "zip_bundle",
    licenseType: "personal",
    isDigital: true,
    isFeatured: true,
    tags: ["天魂", "角色設定", "神魔雙屬性"],
    relatedCharacters: ["tianhun"],
    relatedChapters: ["ch-002", "ch-018"],
    createdAt: "2026-06-20",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-setting-tianyun",
    slug: "tianyun-character-setting",
    title: "天芸角色設定集",
    subtitle: "粉紫淡藍夢幻系、月夢法杖與夢幻靈獸。",
    description: "核心女主天芸的服裝、法杖、夢印、鳳鳥與月光系能力設定。",
    price: 160,
    currency: "TWD",
    category: "角色設定集",
    type: "setting",
    coverImage: "/placeholder/tianyun-setting.jpg",
    gallery: ["/placeholder/tianyun-a.jpg", "/placeholder/tianyun-b.jpg"],
    fileFormat: ["PDF", "PNG"],
    pageCount: 46,
    downloadType: "zip_bundle",
    licenseType: "personal",
    isDigital: true,
    isFeatured: true,
    tags: ["天芸", "夢幻", "月光"],
    relatedCharacters: ["tianyun"],
    relatedChapters: ["ch-003", "ch-019"],
    createdAt: "2026-06-20",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-setting-nine-venerables",
    slug: "three-temples-nine-venerables",
    title: "三殿九尊設定集",
    subtitle: "天幻、黃金、深淵三殿的上尊譜系。",
    description: "收錄三殿九尊服裝、徽記、神紋與殿堂階級資料。",
    price: 240,
    currency: "TWD",
    category: "角色設定集",
    type: "setting",
    coverImage: "/placeholder/nine-venerables.jpg",
    gallery: ["/placeholder/nine-a.jpg"],
    fileFormat: ["PDF"],
    pageCount: 72,
    downloadType: "single_file",
    licenseType: "collector",
    isDigital: true,
    isFeatured: false,
    tags: ["三殿九尊", "勢力", "設定集"],
    relatedCharacters: ["shenhuan", "shengyuan", "moyuan"],
    relatedChapters: ["ch-004"],
    createdAt: "2026-06-20",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-world-seven-realms",
    slug: "seven-realms-worldbook",
    title: "七界世界觀設定集",
    subtitle: "神界、星界、魔界與凡界的地圖設定。",
    description: "七界地圖、星門規則、古王國地理、神殿座標與界域年表。",
    price: 260,
    currency: "TWD",
    category: "世界觀設定集",
    type: "artbook",
    coverImage: "/placeholder/worldbook.jpg",
    gallery: ["/placeholder/world-a.jpg", "/placeholder/world-b.jpg"],
    fileFormat: ["PDF", "PNG"],
    pageCount: 88,
    downloadType: "zip_bundle",
    licenseType: "collector",
    isDigital: true,
    isFeatured: true,
    tags: ["七界", "世界觀", "地圖"],
    relatedCharacters: ["liuli", "canglan"],
    relatedChapters: ["ch-006", "ch-014"],
    createdAt: "2026-06-20",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-godrank-dataset",
    slug: "godrank-dataset",
    title: "天位神榜資料集",
    subtitle: "位階、神紋、代表角色與榜單異動。",
    description: "整理天古上神、天界四神、四皇、四帝、七界霸主與凡界古王國位階。",
    price: 190,
    currency: "TWD",
    category: "世界觀設定集",
    type: "setting",
    coverImage: "/placeholder/godrank.jpg",
    gallery: ["/placeholder/godrank-a.jpg"],
    fileFormat: ["PDF", "CSV"],
    pageCount: 54,
    downloadType: "zip_bundle",
    licenseType: "personal",
    isDigital: true,
    isFeatured: false,
    tags: ["天位神榜", "資料集", "位階"],
    relatedCharacters: ["tianhun", "jinyao", "shenhuan"],
    relatedChapters: ["ch-001", "ch-007"],
    createdAt: "2026-06-20",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-mobile-wallpapers",
    slug: "character-mobile-wallpaper-pack",
    title: "角色手機桌布包",
    subtitle: "天魂、天芸與三殿上尊手機比例桌布。",
    description: "包含 18 張手機桌布，支援深色鎖屏與主畫面配置。",
    price: 90,
    currency: "TWD",
    category: "手機桌布",
    type: "wallpaper",
    coverImage: "/placeholder/mobile-wallpaper.jpg",
    gallery: ["/placeholder/mobile-a.jpg"],
    fileFormat: ["PNG", "JPG"],
    downloadType: "zip_bundle",
    licenseType: "personal",
    isDigital: true,
    isFeatured: false,
    tags: ["桌布", "手機", "角色"],
    relatedCharacters: ["tianhun", "tianyun"],
    relatedChapters: [],
    createdAt: "2026-06-20",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-desktop-wallpapers",
    slug: "character-desktop-wallpaper-pack",
    title: "角色電腦桌布包",
    subtitle: "七界神殿與角色寬螢幕桌布。",
    description: "包含 12 張 4K 電腦桌布，主題涵蓋天幻、黃金、深淵三殿。",
    price: 120,
    currency: "TWD",
    category: "電腦桌布",
    type: "wallpaper",
    coverImage: "/placeholder/desktop-wallpaper.jpg",
    gallery: ["/placeholder/desktop-a.jpg"],
    fileFormat: ["PNG", "JPG"],
    downloadType: "zip_bundle",
    licenseType: "personal",
    isDigital: true,
    isFeatured: false,
    tags: ["桌布", "4K", "神殿"],
    relatedCharacters: ["shenhuan", "moyuan"],
    relatedChapters: [],
    createdAt: "2026-06-20",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-sticker-pack",
    slug: "god-demon-sticker-pack",
    title: "神魔貼圖包",
    subtitle: "天魂冷面吐槽與天芸夢幻神諭。",
    description: "LINE 貼圖展示版，包含 40 個神魔對立與日常互動表情。",
    price: 60,
    currency: "TWD",
    category: "LINE 貼圖展示",
    type: "sticker",
    coverImage: "/placeholder/sticker-pack.jpg",
    gallery: ["/placeholder/sticker-a.jpg", "/placeholder/sticker-b.jpg"],
    fileFormat: ["PNG"],
    downloadType: "single_file",
    licenseType: "personal",
    isDigital: true,
    isFeatured: false,
    tags: ["LINE 貼圖", "天魂", "天芸"],
    relatedCharacters: ["tianhun", "tianyun"],
    relatedChapters: [],
    createdAt: "2026-06-20",
    updatedAt: "2026-06-20",
  },
  {
    id: "prod-complete-collector",
    slug: "complete-collector-set",
    title: "收藏版全套組",
    subtitle: "電子書、設定集、桌布、貼圖與資料集一次收藏。",
    description: "收錄目前所有數位商品與收藏版授權聲明，未來可升級實體周邊預購權益。",
    price: 1280,
    originalPrice: 1810,
    currency: "TWD",
    category: "小說合集",
    type: "bundle",
    coverImage: "/placeholder/collector-set.jpg",
    gallery: ["/placeholder/collector-a.jpg", "/placeholder/collector-b.jpg"],
    fileFormat: ["PDF", "EPUB", "PNG", "JPG", "ZIP"],
    downloadType: "zip_bundle",
    licenseType: "collector",
    isDigital: true,
    isFeatured: true,
    tags: ["全套組", "收藏版", "限時優惠"],
    relatedCharacters: ["tianhun", "tianyun", "shenhuan", "moyuan"],
    relatedChapters: ["ch-001", "ch-020"],
    createdAt: "2026-06-20",
    updatedAt: "2026-06-20",
  },
];

export const featuredProducts = shopProducts.filter((product) => product.isFeatured);
export const ebookProducts = shopProducts.filter((product) => product.type === "ebook" || product.category === "小說合集");
export const digitalProducts = shopProducts.filter((product) => product.isDigital && product.type !== "ebook");

export function getProduct(slug: string) {
  return shopProducts.find((product) => product.slug === slug);
}

export function formatPrice(product: Pick<ShopProduct, "price" | "currency">) {
  return `${product.currency === "TWD" ? "NT$" : product.currency} ${product.price.toLocaleString("zh-TW")}`;
}
