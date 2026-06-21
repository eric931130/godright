import "server-only";

import { FieldValue, Timestamp, type DocumentData, type Firestore } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";
import type { Campaign, CampaignType } from "@/lib/campaigns/campaign-types";

const CAMPAIGN_TYPES: CampaignType[] = ["announcement_bar", "popup", "hero_banner", "countdown", "shop_banner"];

// Firebase Admin 未設定時的 fallback 活動。
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "mock-launch-anno",
    title: "七界開站慶 · 全站電子書輸入 GODRIGHT 享 9 折",
    type: "announcement_bar",
    ctaText: "前往商城",
    ctaHref: "/shop",
    isActive: true,
    priority: 10,
  },
  {
    id: "mock-home-hero",
    title: "《神權崩壞》第二卷七界王座 預購開跑",
    description: "收錄七界王座彩頁設定與角色關係筆記，預購限定特典。",
    type: "hero_banner",
    ctaText: "查看電子書",
    ctaHref: "/shop/ebooks",
    targetPages: ["/"],
    isActive: true,
    priority: 5,
  },
];

function tsToIso(value: unknown): string | undefined {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return undefined;
}

function mapCampaignDoc(id: string, data: DocumentData): Campaign {
  return {
    id,
    title: data.title ?? "",
    description: data.description ?? undefined,
    type: CAMPAIGN_TYPES.includes(data.type) ? data.type : "announcement_bar",
    imageUrl: data.imageUrl ?? undefined,
    mobileImageUrl: data.mobileImageUrl ?? undefined,
    ctaText: data.ctaText ?? undefined,
    ctaHref: data.ctaHref ?? undefined,
    startsAt: tsToIso(data.startsAt),
    endsAt: tsToIso(data.endsAt),
    isActive: data.isActive !== false,
    priority: Number(data.priority ?? 0),
    targetPages: Array.isArray(data.targetPages) ? data.targetPages : undefined,
    createdAt: tsToIso(data.createdAt),
    updatedAt: tsToIso(data.updatedAt),
  };
}

function isWithinWindow(campaign: Campaign): boolean {
  const now = Date.now();
  if (campaign.startsAt && now < new Date(campaign.startsAt).getTime()) return false;
  if (campaign.endsAt && now > new Date(campaign.endsAt).getTime()) return false;
  return true;
}

export async function listCampaigns(): Promise<Campaign[]> {
  try {
    const snapshot = await getAdminDb().collection("campaigns").orderBy("priority", "desc").limit(200).get();
    return snapshot.docs.map((doc) => mapCampaignDoc(doc.id, doc.data()));
  } catch {
    return MOCK_CAMPAIGNS;
  }
}

export async function listActiveCampaigns(): Promise<Campaign[]> {
  const campaigns = await listCampaigns();
  return campaigns
    .filter((campaign) => campaign.isActive && isWithinWindow(campaign))
    .sort((a, b) => b.priority - a.priority);
}

export type CreateCampaignInput = {
  title: string;
  description?: string;
  type: CampaignType;
  imageUrl?: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  startsAt?: string;
  endsAt?: string;
  isActive: boolean;
  priority: number;
  targetPages?: string[];
};

export async function createCampaign(input: CreateCampaignInput, adminUid: string): Promise<{ id: string }> {
  let db: Firestore;
  try {
    db = getAdminDb();
  } catch {
    throw new Error("需要設定 Firebase Admin 環境變數才能建立活動。");
  }

  const ref = await db.collection("campaigns").add({
    title: input.title,
    description: input.description ?? null,
    type: input.type,
    imageUrl: input.imageUrl ?? null,
    mobileImageUrl: input.mobileImageUrl ?? null,
    ctaText: input.ctaText ?? null,
    ctaHref: input.ctaHref ?? null,
    startsAt: input.startsAt ? Timestamp.fromDate(new Date(input.startsAt)) : null,
    endsAt: input.endsAt ? Timestamp.fromDate(new Date(input.endsAt)) : null,
    isActive: input.isActive,
    priority: input.priority,
    targetPages: input.targetPages ?? [],
    createdBy: adminUid,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return { id: ref.id };
}
