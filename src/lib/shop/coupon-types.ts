// 優惠碼型別與「純」折扣計算（無 server-only，client 購物車與 server 驗證共用）。

export type CouponDiscountType = "percent" | "fixed";
export type CouponAppliesTo = "all" | "products" | "ebooks" | "chapters" | "bundles";

export type Coupon = {
  id: string;
  code: string;
  title: string;
  discountType: CouponDiscountType;
  discountValue: number;
  appliesTo: CouponAppliesTo;
  targetIds?: string[];
  startsAt?: string; // ISO 字串
  endsAt?: string;
  usageLimit?: number;
  usedCount: number;
  perUserLimit?: number;
  isActive: boolean;
  createdAt?: string;
};

/** 前台套用後保留的安全 meta（不含 usedCount 等內部欄位）。 */
export type AppliedCoupon = {
  code: string;
  title: string;
  discountType: CouponDiscountType;
  discountValue: number;
  appliesTo: CouponAppliesTo;
  targetIds?: string[];
};

/** 折扣計算所需的最小品項資訊。 */
export type CouponLineItem = {
  productId: string;
  productSlug: string;
  productType: string;
  price: number;
  quantity: number;
};

export type CouponValidationResult =
  | { valid: true; coupon: AppliedCoupon; discount: number }
  | { valid: false; reason: string };

function isEligible(item: CouponLineItem, coupon: Pick<AppliedCoupon, "appliesTo" | "targetIds">): boolean {
  if (coupon.targetIds?.length) {
    if (!coupon.targetIds.includes(item.productId) && !coupon.targetIds.includes(item.productSlug)) {
      return false;
    }
  }
  switch (coupon.appliesTo) {
    case "all":
      return true;
    case "ebooks":
      return item.productType === "ebook";
    case "bundles":
      return item.productType === "bundle";
    case "products":
      return item.productType !== "ebook";
    case "chapters":
      return false; // 購物車不含章節品項。
    default:
      return false;
  }
}

/** 依優惠碼與購物車品項計算折扣金額（整數，TWD）。 */
export function computeCouponDiscount(
  coupon: Pick<AppliedCoupon, "discountType" | "discountValue" | "appliesTo" | "targetIds">,
  items: CouponLineItem[],
): number {
  const eligibleSubtotal = items
    .filter((item) => isEligible(item, coupon))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (eligibleSubtotal <= 0) return 0;

  const raw =
    coupon.discountType === "percent"
      ? Math.round((eligibleSubtotal * coupon.discountValue) / 100)
      : coupon.discountValue;

  return Math.max(0, Math.min(raw, eligibleSubtotal));
}
