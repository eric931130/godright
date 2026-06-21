import Link from "next/link";
import { Eye, ShoppingCart, CreditCard, DollarSign } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { GlassCard } from "@/components/common/glass-card";
import { productCategories } from "@/data/shop";
import { getProductAnalytics } from "@/lib/analytics/analytics-service";
import type { AnalyticsRange } from "@/lib/analytics/types";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const ranges: { value: AnalyticsRange; label: string }[] = [
  { value: "week", label: "週" },
  { value: "month", label: "月" },
  { value: "all", label: "總" },
];

function parseRange(value?: string): AnalyticsRange {
  return value === "month" || value === "all" ? value : "week";
}

function hrefWith(range: AnalyticsRange, category?: string) {
  const params = new URLSearchParams({ range });
  if (category) params.set("category", category);
  return `/admin/analytics/products?${params.toString()}`;
}

type PageProps = { searchParams: Promise<{ range?: string; category?: string }> };

export default async function AdminProductAnalyticsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const range = parseRange(sp.range);
  const activeCategory = sp.category;
  const { configured, products, funnel } = await getProductAnalytics(range);

  const rows = activeCategory ? products.filter((p) => p.category === activeCategory) : products;

  return (
    <AdminShell
      title="商品轉換分析"
      description="追蹤商品瀏覽、加入購物車、結帳與購買的轉換漏斗，並依分類檢視個別商品表現。"
      actions={
        <div className="inline-flex gap-1 rounded-lg border border-divine-gold/25 bg-deep-space/45 p-1">
          {ranges.map((item) => (
            <Link
              key={item.value}
              href={hrefWith(item.value, activeCategory)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition",
                range === item.value ? "bg-divine-gold text-deep-space" : "text-muted-foreground hover:text-platinum",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      }
    >
      {!configured ? (
        <GlassCard className="border-divine-gold/30 p-5">
          <p className="text-sm leading-7 text-muted-foreground">
            尚未連接事件資料庫。設定 Firebase Admin 環境變數並部署 Firestore 規則後，商品轉換資料才會累積。
          </p>
        </GlassCard>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard icon={<Eye className="size-5" />} label="商品瀏覽" value={funnel.views} detail="product_view" />
        <AdminStatCard icon={<ShoppingCart className="size-5" />} label="加入購物車" value={funnel.addToCart} detail="add_to_cart" />
        <AdminStatCard icon={<CreditCard className="size-5" />} label="結帳開始" value={funnel.checkoutStarts} detail="checkout_start" />
        <AdminStatCard icon={<DollarSign className="size-5" />} label="購買成功" value={funnel.purchases} detail="purchase_success" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Link
          href={hrefWith(range)}
          className={cn(
            "rounded-md border px-3 py-1.5 text-xs transition",
            !activeCategory ? "border-divine-gold/50 bg-divine-gold/10 text-divine-gold" : "border-platinum/15 text-muted-foreground hover:text-platinum",
          )}
        >
          全部分類
        </Link>
        {productCategories.map((category) => (
          <Link
            key={category}
            href={hrefWith(range, category)}
            className={cn(
              "rounded-md border px-3 py-1.5 text-xs transition",
              activeCategory === category ? "border-divine-gold/50 bg-divine-gold/10 text-divine-gold" : "border-platinum/15 text-muted-foreground hover:text-platinum",
            )}
          >
            {category}
          </Link>
        ))}
      </div>

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-divine-gold/20 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3">商品</th>
              <th className="px-4 py-3">分類</th>
              <th className="px-4 py-3 text-right">瀏覽</th>
              <th className="px-4 py-3 text-right">加購</th>
              <th className="px-4 py-3 text-right">購買</th>
              <th className="px-4 py-3 text-right">轉換率</th>
              <th className="px-4 py-3 text-right">營收</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((product) => (
              <tr key={product.productId} className="border-b border-platinum/5 last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/shop/products/${product.slug}`} className="font-medium text-platinum hover:text-divine-gold">
                    {product.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{product.viewCount}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{product.addToCartCount}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{product.purchaseCount}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{product.conversionRate}%</td>
                <td className="px-4 py-3 text-right font-semibold text-divine-gold">
                  NT$ {product.revenue.toLocaleString("zh-TW")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      <p className="text-xs leading-6 text-muted-foreground">
        註：營收 = 商品單價 × 購買次數；購買次數由 purchase_success 事件之 productIds 統計。結帳為整車事件，未細分到單一商品。
      </p>
    </AdminShell>
  );
}
