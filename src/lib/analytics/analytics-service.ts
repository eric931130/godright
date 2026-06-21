import "server-only";

import type { Firestore, QueryDocumentSnapshot } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";
import { chapters } from "@/data/novel";
import { characters } from "@/data/characters";
import { shopProducts } from "@/data/shop";
import { orderService } from "@/services/orderService";
import type {
  AnalyticsEventType,
  AnalyticsRange,
  CharacterPopularity,
  ProductAnalyticsSummary,
} from "@/lib/analytics/types";

// Phase 1：儀表板直接即時查詢 analyticsEvents（限 EVENT_QUERY_LIMIT 筆）+ orders 統計。
// 大流量時應改讀 dailyMetrics 彙總（排程 rollup），列為後續工作。
const EVENT_QUERY_LIMIT = 5000;

type RawEvent = {
  eventType: AnalyticsEventType;
  targetId?: string;
  userId?: string;
  anonymousId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
};

export type TopItem = { id: string; label: string; count: number };

export type MetricWindow = {
  pageViews: number;
  uniqueVisitors: number;
  chapterViews: number;
  completedChapters: number;
  completionRate: number;
  productViews: number;
  addToCart: number;
  checkoutStarts: number;
  newsletterSignups: number;
};

export type DashboardData = {
  configured: boolean;
  today: MetricWindow;
  week: MetricWindow;
  signupsToday: number;
  signupsWeek: number;
  purchases: number;
  revenue: number;
  orders: number;
  conversionRate: number;
  topChapters: TopItem[];
  topCharacters: TopItem[];
  topProducts: TopItem[];
  topGlossary: TopItem[];
};

function startOfToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfWeek(): Date {
  const date = startOfToday();
  date.setDate(date.getDate() - 6); // 含今天往前共 7 天。
  return date;
}

function rangeSince(range: AnalyticsRange): Date | null {
  if (range === "all") return null;
  const date = startOfToday();
  date.setDate(date.getDate() - (range === "month" ? 29 : 6));
  return date;
}

function mapDoc(doc: QueryDocumentSnapshot): RawEvent {
  const data = doc.data();
  const createdAt =
    data.createdAt && typeof data.createdAt.toDate === "function"
      ? data.createdAt.toDate()
      : new Date(0);
  return {
    eventType: data.eventType as AnalyticsEventType,
    targetId: data.targetId as string | undefined,
    userId: data.userId as string | undefined,
    anonymousId: data.anonymousId as string | undefined,
    metadata: data.metadata as Record<string, unknown> | undefined,
    createdAt,
  };
}

/** 取得事件（since 為 null 代表全部），Firestore 失敗時回空陣列。 */
async function fetchEvents(db: Firestore, since: Date | null): Promise<RawEvent[]> {
  try {
    let query = db.collection("analyticsEvents").orderBy("createdAt", "desc");
    if (since) {
      query = db
        .collection("analyticsEvents")
        .where("createdAt", ">=", since)
        .orderBy("createdAt", "desc");
    }
    const snapshot = await query.limit(EVENT_QUERY_LIMIT).get();
    return snapshot.docs.map(mapDoc);
  } catch {
    return [];
  }
}

function countType(events: RawEvent[], type: AnalyticsEventType): number {
  return events.filter((event) => event.eventType === type).length;
}

function uniqueVisitors(events: RawEvent[]): number {
  const ids = new Set<string>();
  for (const event of events) {
    const id = event.userId ?? event.anonymousId;
    if (id) ids.add(id);
  }
  return ids.size;
}

function summarize(events: RawEvent[]): MetricWindow {
  const chapterViews = countType(events, "chapter_view");
  const completedChapters = countType(events, "chapter_complete");
  return {
    pageViews: countType(events, "page_view"),
    uniqueVisitors: uniqueVisitors(events),
    chapterViews,
    completedChapters,
    completionRate: chapterViews ? Math.round((completedChapters / chapterViews) * 100) : 0,
    productViews: countType(events, "product_view"),
    addToCart: countType(events, "add_to_cart"),
    checkoutStarts: countType(events, "checkout_start"),
    newsletterSignups: countType(events, "newsletter_signup"),
  };
}

function topN(
  events: RawEvent[],
  type: AnalyticsEventType,
  resolveLabel: (id: string) => string,
  limit = 5,
): TopItem[] {
  const counts = new Map<string, number>();
  for (const event of events) {
    if (event.eventType !== type || !event.targetId) continue;
    counts.set(event.targetId, (counts.get(event.targetId) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([id, count]) => ({ id, label: resolveLabel(id), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

const labelChapter = (id: string) => chapters.find((c) => c.id === id)?.title ?? id;
const labelCharacter = (id: string) =>
  characters.find((c) => c.id === id || c.slug === id)?.name ?? id;
const labelProduct = (id: string) =>
  shopProducts.find((p) => p.id === id || p.slug === id)?.title ?? id;

function emptyWindow(): MetricWindow {
  return {
    pageViews: 0,
    uniqueVisitors: 0,
    chapterViews: 0,
    completedChapters: 0,
    completionRate: 0,
    productViews: 0,
    addToCart: 0,
    checkoutStarts: 0,
    newsletterSignups: 0,
  };
}

async function loadOrderStats() {
  // orders 為 mock 來源，恆可用（符合 spec：無金流時以 mock order 統計）。
  try {
    const orders = await orderService.list();
    const paid = orders.filter((order) => order.status === "paid");
    return {
      orders: orders.length,
      purchases: paid.length,
      revenue: paid.reduce((sum, order) => sum + (order.total ?? 0), 0),
    };
  } catch {
    return { orders: 0, purchases: 0, revenue: 0 };
  }
}

async function loadSignups(db: Firestore, since: Date): Promise<number> {
  try {
    const snapshot = await db.collection("users").where("createdAt", ">=", since).count().get();
    return snapshot.data().count;
  } catch {
    return 0;
  }
}

/**
 * 取得後台儀表板資料。
 * Firebase Admin 環境未設定時回傳 `configured: false` + 空值，頁面照常顯示不報錯。
 */
export async function getDashboardData(): Promise<DashboardData> {
  const orderStats = await loadOrderStats();

  let db: Firestore;
  try {
    db = getAdminDb();
  } catch {
    return {
      configured: false,
      today: emptyWindow(),
      week: emptyWindow(),
      signupsToday: 0,
      signupsWeek: 0,
      ...orderStats,
      conversionRate: 0,
      topChapters: [],
      topCharacters: [],
      topProducts: [],
      topGlossary: [],
    };
  }

  const weekStart = startOfWeek();
  const todayStart = startOfToday();

  const weekEvents = await fetchEvents(db, weekStart);
  const todayEvents = weekEvents.filter((event) => event.createdAt >= todayStart);
  const week = summarize(weekEvents);
  const [signupsWeek, signupsToday] = await Promise.all([
    loadSignups(db, weekStart),
    loadSignups(db, todayStart),
  ]);

  return {
    configured: true,
    today: summarize(todayEvents),
    week,
    signupsToday,
    signupsWeek,
    ...orderStats,
    conversionRate: week.uniqueVisitors
      ? Math.round((orderStats.purchases / week.uniqueVisitors) * 1000) / 10
      : 0,
    topChapters: topN(weekEvents, "chapter_view", labelChapter),
    topCharacters: topN(weekEvents, "character_view", labelCharacter),
    topProducts: topN(weekEvents, "product_view", labelProduct),
    topGlossary: topN(weekEvents, "glossary_click", (id) => id),
  };
}

// === 角色人氣 / 商品轉換聚合（Phase 2） ===

/** 將事件 targetId（可能是 id 或 slug）正規化為角色 slug。 */
function resolveCharacterSlug(targetId?: string): string | null {
  if (!targetId) return null;
  const match = characters.find((c) => c.id === targetId || c.slug === targetId);
  return match?.slug ?? targetId;
}

function getProductIds(event: RawEvent): string[] {
  const ids = event.metadata?.productIds;
  return Array.isArray(ids) ? ids.filter((id): id is string => typeof id === "string") : [];
}

export type CharacterPopularityResult = {
  configured: boolean;
  characters: CharacterPopularity[];
};

/**
 * 角色人氣榜。view/favorite/featured/poll 為事件直接統計；
 * productClick 由商品瀏覽依 relatedCharacters 歸戶，purchase 由 purchase_success 的
 * productIds 依 relatedCharacters 歸戶（推導值）。
 */
export async function getCharacterPopularity(
  range: AnalyticsRange,
): Promise<CharacterPopularityResult> {
  let db: Firestore;
  try {
    db = getAdminDb();
  } catch {
    return { configured: false, characters: [] };
  }

  const events = await fetchEvents(db, rangeSince(range));

  const blank = () => ({
    viewCount: 0,
    favoriteCount: 0,
    featuredCount: 0,
    productClickCount: 0,
    purchaseCount: 0,
    pollVoteCount: 0,
  });
  const counts = new Map<string, ReturnType<typeof blank>>();
  const bump = (slug: string | null, key: keyof ReturnType<typeof blank>, by = 1) => {
    if (!slug) return;
    const entry = counts.get(slug) ?? blank();
    entry[key] += by;
    counts.set(slug, entry);
  };

  for (const event of events) {
    switch (event.eventType) {
      case "character_view":
        bump(resolveCharacterSlug(event.targetId), "viewCount");
        break;
      case "character_favorite":
        bump(resolveCharacterSlug(event.targetId), "favoriteCount");
        break;
      case "featured_character_selected":
        bump(resolveCharacterSlug(event.targetId), "featuredCount");
        break;
      case "poll_vote": {
        const slug = resolveCharacterSlug(
          (event.metadata?.characterSlug ?? event.metadata?.characterId) as string | undefined,
        );
        bump(slug, "pollVoteCount");
        break;
      }
      case "product_view": {
        const product = shopProducts.find(
          (p) => p.id === event.targetId || p.slug === event.targetId,
        );
        product?.relatedCharacters.forEach((slug) => bump(resolveCharacterSlug(slug), "productClickCount"));
        break;
      }
      case "purchase_success": {
        for (const productId of getProductIds(event)) {
          const product = shopProducts.find((p) => p.id === productId || p.slug === productId);
          product?.relatedCharacters.forEach((slug) => bump(resolveCharacterSlug(slug), "purchaseCount"));
        }
        break;
      }
      default:
        break;
    }
  }

  const ranked = characters
    .map((character) => {
      const c = counts.get(character.slug) ?? blank();
      const score =
        c.viewCount * 1 +
        c.favoriteCount * 5 +
        c.featuredCount * 10 +
        c.productClickCount * 3 +
        c.purchaseCount * 20 +
        c.pollVoteCount * 8;
      return {
        characterId: character.slug,
        slug: character.slug,
        name: character.name,
        title: character.title,
        ...c,
        score,
      } satisfies CharacterPopularity;
    })
    .sort((a, b) => b.score - a.score);

  return { configured: true, characters: ranked };
}

export type ProductAnalyticsResult = {
  configured: boolean;
  products: ProductAnalyticsSummary[];
  funnel: { views: number; addToCart: number; checkoutStarts: number; purchases: number };
};

/** 商品轉換漏斗。view/addToCart 由事件統計，purchase 由 purchase_success 的 productIds 統計。 */
export async function getProductAnalytics(range: AnalyticsRange): Promise<ProductAnalyticsResult> {
  let db: Firestore;
  try {
    db = getAdminDb();
  } catch {
    return { configured: false, products: [], funnel: { views: 0, addToCart: 0, checkoutStarts: 0, purchases: 0 } };
  }

  const events = await fetchEvents(db, rangeSince(range));

  const views = new Map<string, number>();
  const carts = new Map<string, number>();
  const purchases = new Map<string, number>();

  for (const event of events) {
    if (event.eventType === "product_view" && event.targetId) {
      views.set(event.targetId, (views.get(event.targetId) ?? 0) + 1);
    } else if (event.eventType === "add_to_cart" && event.targetId) {
      carts.set(event.targetId, (carts.get(event.targetId) ?? 0) + 1);
    } else if (event.eventType === "purchase_success") {
      for (const productId of getProductIds(event)) {
        purchases.set(productId, (purchases.get(productId) ?? 0) + 1);
      }
    }
  }

  const products = shopProducts
    .map((product) => {
      const viewCount = views.get(product.id) ?? views.get(product.slug) ?? 0;
      const addToCartCount = carts.get(product.id) ?? carts.get(product.slug) ?? 0;
      const purchaseCount = purchases.get(product.id) ?? purchases.get(product.slug) ?? 0;
      return {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        category: product.category,
        type: product.type,
        viewCount,
        addToCartCount,
        checkoutStartCount: 0, // 結帳為整車事件，未細分到單一商品。
        purchaseCount,
        revenue: purchaseCount * product.price,
        conversionRate: viewCount ? Math.round((purchaseCount / viewCount) * 1000) / 10 : 0,
      } satisfies ProductAnalyticsSummary;
    })
    .sort((a, b) => b.viewCount - a.viewCount || b.revenue - a.revenue);

  return {
    configured: true,
    products,
    funnel: {
      views: countType(events, "product_view"),
      addToCart: countType(events, "add_to_cart"),
      checkoutStarts: countType(events, "checkout_start"),
      purchases: countType(events, "purchase_success"),
    },
  };
}
