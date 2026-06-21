import { Gift } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import type { EbookProductExtra } from "@/data/shop";

export function EbookBonusList({ ebook }: { ebook: EbookProductExtra }) {
  if (!ebook.bonusItems?.length) return null;

  return (
    <GlassCard className="gold-border p-6">
      <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-platinum">
        <Gift className="size-5 text-divine-gold" aria-hidden="true" />
        收藏版特典
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {ebook.bonusItems.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg border border-divine-gold/20 bg-divine-gold/5 px-4 py-3 text-sm text-platinum"
          >
            <span className="size-1.5 rounded-full bg-divine-gold" aria-hidden="true" />
            {item}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
