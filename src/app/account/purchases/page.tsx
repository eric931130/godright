import type { Metadata } from "next";

import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { mockOrders } from "@/data/account";
import { shopProducts } from "@/data/shop";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "購買紀錄｜會員中心",
  description: "查看神權崩壞付費章節、電子書、商品與下載權限紀錄。",
  path: "/account/purchases",
  keywords: ["購買紀錄", "電子書", "付費章節", "下載權限"],
});

export default function AccountPurchasesPage() {
  return (
    <main className="site-container py-10 sm:py-14">
      <SectionTitle eyebrow="Purchases" title="購買紀錄" description="正式版會讀取 orders、productPurchases、chapterUnlocks 與 downloads。" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Stat label="已付費章節" value="8 章" />
        <Stat label="已購電子書" value="2 本" />
        <Stat label="總消費" value="NT$ 1,620" />
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {mockOrders.map((order) => (
          <GlassCard key={order.id} className="p-5">
            <p className="text-sm text-divine-gold">{order.id}</p>
            <h2 className="mt-2 text-xl font-semibold text-platinum">NT$ {order.total}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{order.items.join("、")} · {order.status}</p>
          </GlassCard>
        ))}
        {shopProducts.slice(0, 2).map((product) => (
          <GlassCard key={product.id} className="p-5">
            <p className="text-sm text-divine-gold">可下載商品</p>
            <h2 className="mt-2 text-xl font-semibold text-platinum">{product.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{product.fileFormat.join(" / ")} · {product.licenseType}</p>
          </GlassCard>
        ))}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-platinum">{value}</p>
    </GlassCard>
  );
}
