import "server-only";

import { Timestamp, type DocumentData } from "firebase-admin/firestore";

import { getAdminDb, getAdminStorage } from "@/lib/firebase/admin";
import type { MediaAsset, MediaCategory, MediaUsage } from "@/lib/media/types";

const CATEGORIES: MediaCategory[] = [
  "homepage",
  "character",
  "product",
  "ebook",
  "lore",
  "location",
  "artifact",
  "campaign",
  "general",
];

function tsToIso(value: unknown): string | undefined {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return undefined;
}

function mapAssetDoc(id: string, data: DocumentData): MediaAsset {
  return {
    id,
    fileName: data.fileName ?? "",
    filePath: data.filePath ?? "",
    url: data.url ?? "",
    contentType: data.contentType ?? "",
    size: Number(data.size ?? 0),
    width: typeof data.width === "number" ? data.width : undefined,
    height: typeof data.height === "number" ? data.height : undefined,
    alt: data.alt ?? undefined,
    category: CATEGORIES.includes(data.category) ? data.category : "general",
    tags: Array.isArray(data.tags) ? data.tags : [],
    usedBy: Array.isArray(data.usedBy) ? (data.usedBy as MediaUsage[]) : [],
    uploadedBy: data.uploadedBy ?? "",
    createdAt: tsToIso(data.createdAt) ?? null,
  };
}

export async function listMediaAssets(): Promise<MediaAsset[]> {
  try {
    const snapshot = await getAdminDb().collection("mediaAssets").orderBy("createdAt", "desc").limit(500).get();
    return snapshot.docs.map((doc) => mapAssetDoc(doc.id, doc.data()));
  } catch {
    return [];
  }
}

export async function deleteMediaAsset(id: string): Promise<void> {
  const db = getAdminDb();
  const ref = db.collection("mediaAssets").doc(id);
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    throw new Error("找不到媒體紀錄。");
  }

  const data = snapshot.data();
  const usedBy = Array.isArray(data?.usedBy) ? data?.usedBy : [];
  if (usedBy.length > 0) {
    throw new Error("此圖片仍被內容使用中，請先解除引用再刪除。");
  }

  const filePath = data?.filePath as string | undefined;
  if (filePath) {
    try {
      await getAdminStorage().bucket().file(filePath).delete();
    } catch {
      // Storage 物件可能已不存在：仍刪除 Firestore 紀錄。
    }
  }

  await ref.delete();
}
