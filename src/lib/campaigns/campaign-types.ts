// 活動/Banner 型別（純資料，client/server 共用）。

export type CampaignType =
  | "announcement_bar"
  | "popup"
  | "hero_banner"
  | "countdown"
  | "shop_banner";

export type Campaign = {
  id: string;
  title: string;
  description?: string;
  type: CampaignType;
  imageUrl?: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  startsAt?: string; // ISO 字串
  endsAt?: string;
  isActive: boolean;
  priority: number;
  targetPages?: string[];
  createdAt?: string;
  updatedAt?: string;
};

/** 活動是否套用於指定路徑（無 targetPages = 全站；"/" 僅首頁；其餘支援前綴）。 */
export function matchesPage(campaign: Pick<Campaign, "targetPages">, pathname: string): boolean {
  if (!campaign.targetPages || campaign.targetPages.length === 0) return true;
  return campaign.targetPages.some(
    (page) => page === pathname || (page !== "/" && pathname.startsWith(page)),
  );
}
