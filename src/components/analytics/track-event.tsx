"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics/event-tracker";
import type { AnalyticsEventType, TrackPayload } from "@/lib/analytics/types";

type TrackEventProps = {
  event: AnalyticsEventType;
} & TrackPayload;

/**
 * 宣告式事件元件：放進任何（含 server component）頁面，掛載時送出一次事件。
 * 例：<TrackEvent event="product_view" targetType="product" targetId={product.id} />
 */
export function TrackEvent({ event, targetType, targetId, metadata }: TrackEventProps) {
  useEffect(() => {
    trackEvent(event, { targetType, targetId, metadata });
    // metadata 為物件，故意不放入依賴陣列，避免每次 render 重送。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, targetType, targetId]);

  return null;
}

/** 全站路由 page_view：掛在 root layout，路徑改變時送出一次。 */
export function RouteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    trackEvent("page_view", { targetType: "page", targetId: pathname });
  }, [pathname]);

  return null;
}
