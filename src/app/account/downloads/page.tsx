import { Download, FileArchive, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { shopProducts } from "@/data/shop";

const downloads = shopProducts.slice(0, 5).map((product, index) => ({
  product,
  purchasedAt: `2026-06-${String(12 + index).padStart(2, "0")}`,
  downloadCount: index + 1,
}));

export default function DownloadsPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Downloads"
        title="我的下載"
        description="目前為 mock 已購買清單，正式版會由會員訂單與下載權限資料表產生。"
      />
      <div className="mt-8 grid gap-4">
        {downloads.map(({ product, purchasedAt, downloadCount }) => (
          <GlassCard key={product.id} className="p-5">
            <div className="grid gap-4 md:grid-cols-[6rem_1fr_auto] md:items-center">
              <div className="image-placeholder aspect-square rounded-lg" />
              <div>
                <Badge>{product.category}</Badge>
                <h2 className="mt-3 font-serif text-xl font-semibold text-platinum">
                  {product.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileArchive className="size-4 text-divine-gold" />
                    {product.fileFormat.join(" / ")}
                  </span>
                  <span>購買日期：{purchasedAt}</span>
                  <span>下載次數：{downloadCount}</span>
                </div>
                <p className="mt-3 flex items-start gap-2 text-xs leading-6 text-muted-foreground">
                  <ShieldCheck className="mt-1 size-4 shrink-0 text-divine-gold" />
                  授權聲明：限個人收藏、閱讀與裝置使用，不得轉售、公開散布或商業印製。
                </p>
              </div>
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-divine-gold px-5 text-sm font-medium text-deep-space hover:bg-platinum">
                <Download className="size-4" />
                下載
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
