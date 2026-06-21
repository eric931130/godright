"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/shop/cart-storage";

const paymentMethods = ["信用卡", "LINE Pay", "ATM", "超商付款", "Apple Pay", "Google Pay"];

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const [payment, setPayment] = useState(paymentMethods[0]);
  const [agreed, setAgreed] = useState(false);

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreed) return;
    cart.clearCart();
    router.push("/orders/success");
  };

  return (
    <div className="site-container py-10 sm:py-14">
      <Badge>Mock Checkout</Badge>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-platinum">結帳頁</h1>
      <form onSubmit={submitOrder} className="mt-8 grid gap-6 lg:grid-cols-[1fr_24rem]">
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl font-semibold text-platinum">購買人資料</h2>
          <div className="mt-5 grid gap-4">
            <Input required name="name" placeholder="姓名" className="h-11" />
            <Input required name="email" type="email" placeholder="Email" className="h-11" />
            <Input name="invoice" placeholder="發票資訊預留，例如統編或載具" className="h-11" />
          </div>
          <h2 className="mt-8 font-serif text-2xl font-semibold text-platinum">付款方式</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {paymentMethods.map((method) => (
              <label key={method} className="flex items-center gap-3 rounded-lg border border-divine-gold/20 bg-deep-space/45 p-3 text-sm text-platinum">
                <input type="radio" name="payment" checked={payment === method} onChange={() => setPayment(method)} />
                {method}
              </label>
            ))}
          </div>
          <label className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
            <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} className="mt-1" />
            我同意服務條款、數位內容授權與 mock checkout 測試流程。
          </label>
          <button disabled={!agreed} className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-divine-gold px-5 text-sm font-medium text-deep-space disabled:opacity-50">
            送出 mock 訂單
          </button>
        </GlassCard>
        <GlassCard className="h-fit p-6">
          <h2 className="font-serif text-2xl font-semibold text-platinum">訂單商品</h2>
          <div className="mt-5 grid gap-3">
            {cart.detailedItems.length ? cart.detailedItems.map((item) => (
              <div key={item.productId} className="rounded-lg border border-platinum/10 bg-deep-space/45 p-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-platinum">{item.product.title}</span>
                  <span className="text-divine-gold">x{item.quantity}</span>
                </div>
              </div>
            )) : <p className="text-sm text-muted-foreground">購物車目前沒有商品，可仍測試表單流程。</p>}
          </div>
          <div className="mt-6 flex justify-between border-t border-divine-gold/20 pt-4 font-serif text-xl text-divine-gold">
            <span>總金額</span>
            <span>NT$ {cart.total.toLocaleString("zh-TW")}</span>
          </div>
          <DivineButton href="/cart" variant="outline" className="mt-5 w-full">
            返回購物車
          </DivineButton>
        </GlassCard>
      </form>
    </div>
  );
}
