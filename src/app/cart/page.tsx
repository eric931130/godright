"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";

import { DivineButton } from "@/components/common/divine-button";
import { EmptyState } from "@/components/common/empty-state";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/data/shop";
import { useCart } from "@/lib/shop/cart-storage";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

export default function CartPage() {
  const cart = useCart();
  const { user } = useCurrentUser();
  const [code, setCode] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [applying, setApplying] = useState(false);

  const applyCouponCode = async () => {
    if (!code.trim()) return;
    setApplying(true);
    setCouponMsg("");
    try {
      const headers: Record<string, string> = { "content-type": "application/json" };
      if (user) {
        try {
          headers.authorization = `Bearer ${await user.getIdToken()}`;
        } catch {
          // 取得 token 失敗時以匿名身份驗證（perUserLimit 不套用）。
        }
      }
      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers,
        body: JSON.stringify({ code: code.trim(), items: cart.items }),
      });
      const data = await response.json();
      if (response.ok && data.valid) {
        cart.applyCoupon(data.coupon);
        setCouponMsg(`已套用：${data.coupon.title}`);
      } else {
        cart.clearCoupon();
        setCouponMsg(data.reason ?? "優惠碼無效。");
      }
    } catch {
      setCouponMsg("驗證失敗，請稍後再試。");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle eyebrow="Cart" title="購物車" description="購物車使用 localStorage 保存，重新整理後仍會保留商品。" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="grid gap-4">
          {cart.detailedItems.length ? (
            cart.detailedItems.map((item) => (
              <GlassCard key={item.productId} className="p-5">
                <div className="grid gap-4 sm:grid-cols-[7rem_1fr_auto] sm:items-center">
                  <div className="image-placeholder aspect-square rounded-lg" />
                  <div>
                    <Link href={`/shop/products/${item.product.slug}`}>
                      <h2 className="font-serif text-xl font-semibold text-platinum hover:text-divine-gold">
                        {item.product.title}
                      </h2>
                    </Link>
                    <p className="mt-2 text-sm text-muted-foreground">{item.product.subtitle}</p>
                    <p className="mt-3 text-divine-gold">{formatPrice(item.product)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-divine-gold/25 p-2" onClick={() => cart.setQuantity(item.productId, item.quantity - 1)}>
                      <Minus className="size-4" />
                    </button>
                    <span className="w-8 text-center text-platinum">{item.quantity}</span>
                    <button className="rounded-lg border border-divine-gold/25 p-2" onClick={() => cart.setQuantity(item.productId, item.quantity + 1)}>
                      <Plus className="size-4" />
                    </button>
                    <button className="rounded-lg border border-divine-gold/25 p-2 text-muted-foreground hover:text-divine-gold" onClick={() => cart.removeItem(item.productId)}>
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))
          ) : (
            <EmptyState title="購物車是空的" description="前往商城挑選電子書、設定集或桌布包。" />
          )}
        </div>
        <GlassCard className="h-fit p-5">
          <h2 className="font-serif text-2xl font-semibold text-platinum">訂單摘要</h2>
          <label className="mt-5 block text-sm text-muted-foreground">優惠碼</label>
          {cart.appliedCoupon ? (
            <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-divine-gold/40 bg-divine-gold/10 px-3 py-2.5 text-sm">
              <span className="text-divine-gold">{cart.appliedCoupon.code} · {cart.appliedCoupon.title}</span>
              <button
                type="button"
                onClick={() => {
                  cart.clearCoupon();
                  setCouponMsg("");
                  setCode("");
                }}
                className="text-muted-foreground hover:text-platinum"
                aria-label="移除優惠碼"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <div className="mt-2 flex gap-2">
              <Input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="輸入優惠碼，例如 GODRIGHT"
                className="h-11"
              />
              <button
                type="button"
                onClick={applyCouponCode}
                disabled={applying || !code.trim()}
                className="inline-flex h-11 shrink-0 items-center rounded-lg bg-divine-gold px-4 text-sm font-medium text-deep-space transition hover:bg-platinum disabled:opacity-50"
              >
                {applying ? "驗證中" : "套用"}
              </button>
            </div>
          )}
          {couponMsg ? <p className="mt-2 text-xs text-moon-blue">{couponMsg}</p> : null}
          <div className="mt-5 grid gap-3 text-sm">
            <Row label="小計" value={`NT$ ${cart.subtotal.toLocaleString("zh-TW")}`} />
            <Row label="優惠" value={`- NT$ ${cart.discount.toLocaleString("zh-TW")}`} />
            <Row label="總計" value={`NT$ ${cart.total.toLocaleString("zh-TW")}`} strong />
          </div>
          <DivineButton href="/checkout" className="mt-6 w-full">
            前往結帳
          </DivineButton>
        </GlassCard>
      </div>
    </div>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "flex justify-between text-lg text-divine-gold" : "flex justify-between text-muted-foreground"}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
