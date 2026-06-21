"use client";

// 前端事件追蹤。設計原則：
// - SSR 安全：任何進入點先檢查 `typeof window`。
// - 節流：事件先進 queue，達批次量或定時（FLUSH_MS）才以 writeBatch 一次寫入，
//   並在 pagehide / visibilitychange(hidden) 時 flush，避免灌爆 Firestore。
// - 韌性：Firebase 未設定 / 寫入失敗時靜默停用，絕不丟例外影響頁面。
// - page_view 於同一 session、同一路徑只記一次。

import { collection, doc, getFirestore, serverTimestamp, writeBatch } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { getFirebaseApp } from "@/lib/firebase/client";
import type { AnalyticsEventType, TrackPayload } from "@/lib/analytics/types";

const ANON_KEY = "godright.analytics.anonymousId";
const FLUSH_MS = 4000;
const MAX_BATCH = 25;
const HARD_BATCH_LIMIT = 450; // Firestore writeBatch 上限 500，留安全邊界。

type QueuedEvent = {
  eventType: AnalyticsEventType;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  path: string;
  userId: string | null;
  anonymousId: string;
};

const queue: QueuedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let trackingDisabled = false;
let lifecycleBound = false;
const seenPageViews = new Set<string>();

function isBrowser() {
  return typeof window !== "undefined";
}

function getAnonymousId(): string {
  let id = window.localStorage.getItem(ANON_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `anon_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    window.localStorage.setItem(ANON_KEY, id);
  }
  return id;
}

function getCurrentUserId(): string | null {
  try {
    return getAuth(getFirebaseApp()).currentUser?.uid ?? null;
  } catch {
    return null;
  }
}

function clean(record: Record<string, unknown>): Record<string, unknown> {
  // 同時去除 undefined 與 null：匿名事件的 userId 為 null，若保留會被
  // Firestore 規則（userId 存在時須等於 auth.uid）拒絕。
  return Object.fromEntries(
    Object.entries(record).filter(([, value]) => value !== undefined && value !== null),
  );
}

async function flush() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (!queue.length || trackingDisabled) return;

  const pending = queue.splice(0, queue.length);

  try {
    const db = getFirestore(getFirebaseApp());
    const col = collection(db, "analyticsEvents");

    for (let i = 0; i < pending.length; i += HARD_BATCH_LIMIT) {
      const batch = writeBatch(db);
      for (const event of pending.slice(i, i + HARD_BATCH_LIMIT)) {
        batch.set(doc(col), { ...clean(event), createdAt: serverTimestamp() });
      }
      await batch.commit();
    }
  } catch {
    // Firebase 未設定 / 離線 / 權限問題：停用追蹤，丟棄事件，不影響頁面。
    trackingDisabled = true;
  }
}

function bindLifecycle() {
  if (lifecycleBound || !isBrowser()) return;
  lifecycleBound = true;
  window.addEventListener("pagehide", () => void flush());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") void flush();
  });
}

function scheduleFlush() {
  if (queue.length >= MAX_BATCH) {
    void flush();
    return;
  }
  if (!timer) {
    timer = setTimeout(() => void flush(), FLUSH_MS);
  }
}

/** 記錄一筆事件（前端呼叫）。SSR / 未設定環境下為安全的 no-op。 */
export function trackEvent(eventType: AnalyticsEventType, payload: TrackPayload = {}): void {
  if (!isBrowser() || trackingDisabled) return;

  if (eventType === "page_view") {
    const key = payload.targetId ?? window.location.pathname;
    if (seenPageViews.has(key)) return;
    seenPageViews.add(key);
  }

  try {
    bindLifecycle();
    queue.push({
      eventType,
      targetType: payload.targetType,
      targetId: payload.targetId,
      metadata: payload.metadata,
      path: window.location.pathname,
      userId: getCurrentUserId(),
      anonymousId: getAnonymousId(),
    });
    scheduleFlush();
  } catch {
    // localStorage 被封鎖等情況：忽略。
  }
}
