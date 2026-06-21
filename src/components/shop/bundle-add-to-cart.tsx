"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

import { trackEvent } from "@/lib/analytics/event-tracker";
import { useCart } from "@/lib/shop/cart-storage";
import { cn } from "@/lib/utils";

type BundleAddToCartProps = {
  productIds: string[];
  className?: string;
};

/**
 * 「加入整組」：把組合包的成員商品逐一加入購物車。
 * 註：目前金額為成員小計；bundlePrice 的優惠實扣需金流/訂單層套用。
 */
export function BundleAddToCart({ productIds, className }: BundleAddToCartProps) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  const addAll = () => {
    productIds.forEach((productId) => {
      cart.addItem(productId);
      trackEvent("add_to_cart", { targetType: "product", targetId: productId, metadata: { source: "bundle" } });
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={addAll}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-divine-gold px-5 text-sm font-medium text-deep-space transition hover:bg-platinum",
        className,
      )}
    >
      <ShoppingCart className="size-4" aria-hidden="true" />
      {added ? "已加入購物車" : "整組加入購物車"}
    </button>
  );
}
