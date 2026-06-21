// 組合包型別（純資料，client/server 共用）。

export type Bundle = {
  id: string;
  slug: string;
  title: string;
  description: string;
  productIds: string[]; // 成員商品的 slug 或 id
  originalPrice: number;
  bundlePrice: number;
  coverImage?: string;
  isActive: boolean;
  startsAt?: string; // ISO 字串
  endsAt?: string;
  createdAt?: string;
};

export function bundleSavings(bundle: Pick<Bundle, "originalPrice" | "bundlePrice">): number {
  return Math.max(0, bundle.originalPrice - bundle.bundlePrice);
}
