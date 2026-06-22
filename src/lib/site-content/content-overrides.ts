import "server-only";

import { cache } from "react";
import type { DocumentData } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";

export type ContentOverride = { text?: string; imageUrl?: string };
export type ContentOverrides = Record<string, ContentOverride>;

/**
 * 讀取站台內容覆蓋（Firestore `siteContent`，doc id = 內容 key）。
 * Firebase 未設定時回 {}，前台即沿用各自寫死的預設值。
 * 以 React cache 包裝：同一次請求只查一次。
 */
export const getContentOverrides = cache(async (): Promise<ContentOverrides> => {
  try {
    const snapshot = await getAdminDb().collection("siteContent").limit(1000).get();
    const overrides: ContentOverrides = {};
    for (const doc of snapshot.docs) {
      const data = doc.data() as DocumentData;
      overrides[doc.id] = {
        text: typeof data.text === "string" ? data.text : undefined,
        imageUrl: typeof data.imageUrl === "string" ? data.imageUrl : undefined,
      };
    }
    return overrides;
  } catch {
    return {};
  }
});

export function resolveText(overrides: ContentOverrides, key: string, fallback: string): string {
  return overrides[key]?.text ?? fallback;
}

export function resolveImage(
  overrides: ContentOverrides,
  key: string,
  fallback?: string,
): string | undefined {
  return overrides[key]?.imageUrl ?? fallback;
}
