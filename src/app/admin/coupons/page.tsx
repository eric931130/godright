import { AdminShell } from "@/components/admin/admin-shell";
import { CouponForm } from "@/components/admin/coupon-form";
import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { listCoupons } from "@/lib/shop/coupons";

export const dynamic = "force-dynamic";

const appliesToLabels: Record<string, string> = {
  all: "全站",
  products: "一般商品",
  ebooks: "電子書",
  chapters: "付費章節",
  bundles: "組合包",
};

export default async function AdminCouponsPage() {
  const coupons = await listCoupons();

  return (
    <AdminShell title="優惠碼管理" description="建立與檢視優惠碼。折扣驗證一律於 server 端進行，前台無法取得完整優惠碼清單。">
      <CouponForm />

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-divine-gold/20 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3">代碼</th>
              <th className="px-4 py-3">標題</th>
              <th className="px-4 py-3">折扣</th>
              <th className="px-4 py-3">適用</th>
              <th className="px-4 py-3 text-right">已使用 / 上限</th>
              <th className="px-4 py-3">狀態</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">尚無優惠碼。</td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-platinum/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-platinum">{coupon.code}</td>
                  <td className="px-4 py-3 text-muted-foreground">{coupon.title}</td>
                  <td className="px-4 py-3 text-divine-gold">
                    {coupon.discountType === "percent" ? `${coupon.discountValue}%` : `NT$ ${coupon.discountValue}`}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{appliesToLabels[coupon.appliesTo] ?? coupon.appliesTo}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {coupon.usedCount} / {coupon.usageLimit ?? "∞"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={coupon.isActive ? "gold" : "purple"}>{coupon.isActive ? "啟用中" : "停用"}</Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </GlassCard>
    </AdminShell>
  );
}
