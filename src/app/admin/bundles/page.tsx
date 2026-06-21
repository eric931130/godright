import { AdminShell } from "@/components/admin/admin-shell";
import { BundleForm } from "@/components/admin/bundle-form";
import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { listBundles } from "@/lib/shop/bundles";
import { bundleSavings } from "@/lib/shop/bundle-types";

export const dynamic = "force-dynamic";

export default async function AdminBundlesPage() {
  const bundles = await listBundles();

  return (
    <AdminShell title="組合包管理" description="建立跨商品組合包。原價由成員商品自動加總，組合價由你設定。">
      <BundleForm />

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-divine-gold/20 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3">標題</th>
              <th className="px-4 py-3">slug</th>
              <th className="px-4 py-3 text-right">成員數</th>
              <th className="px-4 py-3 text-right">原價</th>
              <th className="px-4 py-3 text-right">組合價</th>
              <th className="px-4 py-3 text-right">省下</th>
              <th className="px-4 py-3">狀態</th>
            </tr>
          </thead>
          <tbody>
            {bundles.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">尚無組合包。</td>
              </tr>
            ) : (
              bundles.map((bundle) => (
                <tr key={bundle.id} className="border-b border-platinum/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-platinum">{bundle.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{bundle.slug}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{bundle.productIds.length}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">NT$ {bundle.originalPrice.toLocaleString("zh-TW")}</td>
                  <td className="px-4 py-3 text-right text-divine-gold">NT$ {bundle.bundlePrice.toLocaleString("zh-TW")}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">NT$ {bundleSavings(bundle).toLocaleString("zh-TW")}</td>
                  <td className="px-4 py-3">
                    <Badge tone={bundle.isActive ? "gold" : "purple"}>{bundle.isActive ? "上架中" : "未上架"}</Badge>
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
