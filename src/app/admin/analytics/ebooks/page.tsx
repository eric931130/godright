import Link from "next/link";
import { Eye, ShoppingCart, DollarSign, BookOpen } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { GlassCard } from "@/components/common/glass-card";
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

type PageProps = { searchParams: Promise<{ range?: string }> };

export default async function AdminEbookAnalyticsPage({ searchParams }: PageProps) {
  const range = parseRange((await searchParams).range);
  const { configured, products } = await getProductAnalytics(range);

  // 電子書與小說合集（對應 src/data/shop.ts 的 ebookProducts 規則）。
  const ebooks = products.filter((p) => p.type === "ebook" || p.category === "小說合集");
  const totals = ebooks.reduce(
    (acc, p) => ({
      views: acc.views + p.viewCount,
      addToCart: acc.addToCart + p.addToCartCount,
      purchases: acc.purchases + p.purchaseCount,
      revenue: acc.revenue + p.revenue,
    }),
    { views: 0, addToCart: 0, purchases: 0, revenue: 0 },
  );

  return (
    <AdminShell
      title="電子書轉換分析"
      description="電子書與小說合集的瀏覽、加購、購買與營收表現。試讀點擊與付費章節解鎖率欄位待相關事件上線後填入。"
      actions={
        <div className="inline-flex gap-1 rounded-lg border border-divine-gold/25 bg-deep-space/45 p-1">
          {ranges.map((item) => (
            <Link
              key={item.value}
              href={`/admin/analytics/ebooks?range=${item.value}`}
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
            尚未連接事件資料庫。設定 Firebase Admin 環境變數並部署 Firestore 規則後，電子書轉換資料才會累積。
          </p>
        </GlassCard>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard icon={<Eye className="size-5" />} label="電子書瀏覽" value={totals.views} detail="product_view" />
        <AdminStatCard icon={<ShoppingCart className="size-5" />} label="加入購物車" value={totals.addToCart} detail="add_to_cart" />
        <AdminStatCard icon={<BookOpen className="size-5" />} label="購買成功" value={totals.purchases} detail="purchase_success" />
        <AdminStatCard icon={<DollarSign className="size-5" />} label="電子書營收" value={`NT$ ${totals.revenue.toLocaleString("zh-TW")}`} detail="單價 × 購買次數" />
      </div>

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-divine-gold/20 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3">電子書</th>
              <th className="px-4 py-3 text-right">瀏覽</th>
              <th className="px-4 py-3 text-right">加購</th>
              <th className="px-4 py-3 text-right">購買</th>
              <th className="px-4 py-3 text-right">轉換率</th>
              <th className="px-4 py-3 text-right">營收</th>
            </tr>
          </thead>
          <tbody>
            {ebooks.map((product) => (
              <tr key={product.productId} className="border-b border-platinum/5 last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/shop/products/${product.slug}`} className="font-medium text-platinum hover:text-divine-gold">
                    {product.title}
                  </Link>
                </td>
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
        註：試讀點擊數、付費章節解鎖率將於 Phase 3 電子書商品頁與付費章節頁的互動事件上線後填入。
      </p>
    </AdminShell>
  );
}
