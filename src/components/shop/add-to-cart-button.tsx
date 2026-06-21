"use client";

import { ShoppingCart } from "lucide-react";

import { useCart } from "@/lib/shop/cart-storage";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
  label?: string;
};

export function AddToCartButton({
  productId,
  className,
  label = "加入購物車",
}: AddToCartButtonProps) {
  const cart = useCart();

  return (
    <button
      type="button"
      onClick={() => cart.addItem(productId)}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-divine-gold px-4 text-sm font-medium text-deep-space transition hover:bg-platinum",
        className,
      )}
    >
      <ShoppingCart className="size-4" aria-hidden="true" />
      {label}
    </button>
  );
}
