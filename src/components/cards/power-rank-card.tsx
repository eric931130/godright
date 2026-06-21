import { Shield } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import type { PowerRank } from "@/data/mock/ranks";
import { cn } from "@/lib/utils";

type PowerRankCardProps = {
  rank: PowerRank;
};

export function PowerRankCard({ rank }: PowerRankCardProps) {
  return (
    <GlassCard interactive className="relative h-full overflow-hidden p-5">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
          rank.color,
        )}
      />
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-divine-gold/30 bg-divine-gold/10 font-serif text-lg font-semibold text-divine-gold">
          {rank.tier}
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs text-moon-blue">
            <Shield className="size-3.5" aria-hidden="true" />
            {rank.scope}
          </div>
          <h3 className="mt-2 font-serif text-lg font-semibold text-platinum">
            {rank.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {rank.description}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
