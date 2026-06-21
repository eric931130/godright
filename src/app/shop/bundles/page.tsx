import type { Metadata } from "next";

import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { BundleCard } from "@/components/shop/bundle-card";
import { listActiveBundles } from "@/lib/shop/bundles";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "組合包｜神權崩壞電子書商城",
  description: "精選《神權崩壞》電子書、設定集、桌布與貼圖組合包，搭配購買享優惠價。",
  path: "/shop/bundles",
  keywords: ["組合包", "優惠組合", "電子書", "設定集", "神權崩壞"],
});

export default async function BundlesPage() {
  const bundles = await listActiveBundles();

  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Bundles"
        title="組合包"
        description="把電子書、設定集、桌布與貼圖組成超值收藏，一次帶走更划算。"
      />
      {bundles.length === 0 ? (
        <GlassCard className="mt-8 p-6">
          <p className="text-sm leading-7 text-muted-foreground">目前沒有上架中的組合包，敬請期待。</p>
        </GlassCard>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      )}
    </div>
  );
}
