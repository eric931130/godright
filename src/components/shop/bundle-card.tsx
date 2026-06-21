import Link from "next/link";
import { Package } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { bundleSavings, type Bundle } from "@/lib/shop/bundle-types";

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const savings = bundleSavings(bundle);

  return (
    <GlassCard interactive className="flex h-full flex-col overflow-hidden p-0">
      <Link href={`/shop/bundles/${bundle.slug}`} className="block">
        <div className="image-placeholder relative aspect-[16/9]">
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-deep-space/80 px-3 py-1 text-xs text-divine-gold ring-1 ring-divine-gold/40">
            <Package className="size-3.5" aria-hidden="true" /> 組合包
          </div>
          {savings > 0 ? (
            <div className="absolute right-4 top-4">
              <Badge tone="gold">省 NT$ {savings.toLocaleString("zh-TW")}</Badge>
            </div>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/shop/bundles/${bundle.slug}`}>
          <h3 className="font-serif text-xl font-semibold text-platinum transition hover:text-divine-gold">{bundle.title}</h3>
        </Link>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{bundle.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="font-serif text-xl font-semibold text-divine-gold">NT$ {bundle.bundlePrice.toLocaleString("zh-TW")}</p>
            {bundle.originalPrice > bundle.bundlePrice ? (
              <p className="text-xs text-muted-foreground line-through">NT$ {bundle.originalPrice.toLocaleString("zh-TW")}</p>
            ) : null}
          </div>
          <span className="text-sm text-muted-foreground">{bundle.productIds.length} 件商品</span>
        </div>
      </div>
    </GlassCard>
  );
}
