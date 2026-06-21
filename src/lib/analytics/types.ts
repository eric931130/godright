// Analytics 型別定義。
// createdAt / updatedAt 在 Firestore 內為 Timestamp；此處沿用本專案既有慣例
// （見 src/lib/media/types.ts）以 `unknown` 表示，避免 client/admin SDK 型別耦合。

export type AnalyticsEventType =
  | "page_view"
  | "chapter_view"
  | "chapter_complete"
  | "product_view"
  | "add_to_cart"
  | "checkout_start"
  | "purchase_success"
  | "character_view"
  | "character_favorite"
  | "featured_character_selected"
  | "glossary_click"
  | "hall_post_created"
  | "poll_vote"
  | "newsletter_signup";

export type AnalyticsTargetType =
  | "chapter"
  | "product"
  | "character"
  | "lore"
  | "poll"
  | "page";

/** trackEvent / <TrackEvent> 對外的 payload。 */
export type TrackPayload = {
  targetType?: AnalyticsTargetType;
  targetId?: string;
  metadata?: Record<string, unknown>;
};

/** 分析時間範圍。 */
export type AnalyticsRange = "week" | "month" | "all";

/** 角色人氣聚合（以 slug 為主鍵）。 */
export type CharacterPopularity = {
  characterId: string;
  slug: string;
  name: string;
  title: string;
  viewCount: number;
  favoriteCount: number;
  featuredCount: number;
  productClickCount: number;
  purchaseCount: number;
  pollVoteCount: number;
  score: number;
};

/** 商品轉換聚合（以 product id 為主鍵）。 */
export type ProductAnalyticsSummary = {
  productId: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  viewCount: number;
  addToCartCount: number;
  checkoutStartCount: number;
  purchaseCount: number;
  revenue: number;
  conversionRate: number;
};

/** 寫入 Firestore `analyticsEvents` 的單筆事件。 */
export type AnalyticsEvent = {
  id: string;
  userId?: string;
  anonymousId?: string;
  eventType: AnalyticsEventType;
  targetType?: AnalyticsTargetType;
  targetId?: string;
  path?: string;
  metadata?: Record<string, unknown>;
  createdAt: unknown;
};

/** `dailyMetrics` 每日彙總（Phase 1 先定義型別與 collection，排程 rollup 留待後續）。 */
export type DailyMetrics = {
  id: string;
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  signups: number;
  chapterViews: number;
  completedChapters: number;
  productViews: number;
  addToCart: number;
  checkoutStarts: number;
  purchases: number;
  revenue: number;
  newsletterSignups: number;
  createdAt: unknown;
  updatedAt: unknown;
};
