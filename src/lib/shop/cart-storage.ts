"use client";

import { useEffect, useMemo, useState } from "react";

import { shopProducts, type ShopProduct } from "@/data/shop";
import { computeCouponDiscount, type AppliedCoupon } from "@/lib/shop/coupon-types";

export type CartItem = {
  productId: string;
  quantity: number;
};

const cartKey = "godright.cart";
const couponKey = "godright.coupon";

function readCoupon(): AppliedCoupon | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(couponKey);
    return raw ? (JSON.parse(raw) as AppliedCoupon) : null;
  } catch {
    return null;
  }
}

function writeCoupon(coupon: AppliedCoupon | null) {
  if (coupon) {
    window.localStorage.setItem(couponKey, JSON.stringify(coupon));
  } else {
    window.localStorage.removeItem(couponKey);
  }
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(cartKey);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  window.localStorage.setItem(cartKey, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(readCart());
      setAppliedCoupon(readCoupon());
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => ({
          ...item,
          product: shopProducts.find((product) => product.id === item.productId),
        }))
        .filter((item): item is CartItem & { product: ShopProduct } => Boolean(item.product)),
    [items],
  );

  const subtotal = detailedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const discount = appliedCoupon
    ? computeCouponDiscount(
        appliedCoupon,
        detailedItems.map((item) => ({
          productId: item.product.id,
          productSlug: item.product.slug,
          productType: item.product.type,
          price: item.product.price,
          quantity: item.quantity,
        })),
      )
    : 0;
  const total = Math.max(0, subtotal - discount);

  const update = (next: CartItem[]) => {
    setItems(next);
    writeCart(next);
    window.dispatchEvent(new Event("godright-cart-updated"));
  };

  const setCoupon = (coupon: AppliedCoupon | null) => {
    setAppliedCoupon(coupon);
    writeCoupon(coupon);
  };

  return {
    ready,
    items,
    detailedItems,
    appliedCoupon,
    subtotal,
    discount,
    total,
    applyCoupon: (coupon: AppliedCoupon) => setCoupon(coupon),
    clearCoupon: () => setCoupon(null),
    addItem: (productId: string, quantity = 1) => {
      update(
        items.some((item) => item.productId === productId)
          ? items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          : [...items, { productId, quantity }],
      );
    },
    removeItem: (productId: string) => {
      update(items.filter((item) => item.productId !== productId));
    },
    setQuantity: (productId: string, quantity: number) => {
      update(
        items
          .map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    clearCart: () => {
      update([]);
      setCoupon(null);
    },
  };
}
