import Link from "next/link";
import { BookMarked } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import type { LoreEntry } from "@/data/mock/lore";

type LoreCardProps = {
  lore: LoreEntry;
};

export function LoreCard({ lore }: LoreCardProps) {
  return (
    <GlassCard interactive className="h-full p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone="blue">{lore.category}</Badge>
          <h3 className="mt-3 font-serif text-xl font-semibold text-platinum">
            {lore.title}
          </h3>
        </div>
        <BookMarked className="size-5 text-divine-gold" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm font-medium text-platinum/84">{lore.summary}</p>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">
        {lore.detail}
      </p>
      <Link
        href="/codex"
        className="mt-5 inline-flex text-sm font-medium text-divine-gold transition hover:text-platinum"
      >
        進入百科
      </Link>
    </GlassCard>
  );
}
