"use client";

import { useEffect, useMemo, useState } from "react";

import { shopProducts, type ShopProduct } from "@/data/shop";

export type CartItem = {
  productId: string;
  quantity: number;
};

const cartKey = "godright.cart";

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
  const [coupon, setCoupon] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(readCart());
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
  const discount = coupon.trim().toUpperCase() === "GODRIGHT" ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal - discount);

  const update = (next: CartItem[]) => {
    setItems(next);
    writeCart(next);
    window.dispatchEvent(new Event("godright-cart-updated"));
  };

  return {
    ready,
    items,
    detailedItems,
    coupon,
    subtotal,
    discount,
    total,
    setCoupon,
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
    },
  };
}
