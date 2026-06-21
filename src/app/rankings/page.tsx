import Link from "next/link";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { getCharacter, rankingTiers } from "@/data/characters";
import { cn } from "@/lib/utils";

export default function RankingsPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="God Rank"
        title="天位神榜"
        description="以神紋卡片階層呈現七界宇宙戰力與權能位階，可點進代表角色詳情。"
      />
      <Link
        href="/rankings/characters"
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-divine-gold/30 bg-deep-space/45 px-4 py-2.5 text-sm text-platinum transition hover:bg-divine-gold/10"
      >
        查看讀者票選的角色人氣榜 →
      </Link>
      <div className="mt-8 grid gap-5">
        {rankingTiers.map((tier) => (
          <GlassCard key={tier.id} className="overflow-hidden p-0">
            <div className={cn("h-1 bg-gradient-to-r", tier.color)} />
            <div className="p-6">
              <Badge>{tier.name}</Badge>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{tier.description}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {tier.representativeSlugs.map((slug) => {
                  const character = getCharacter(slug);
                  return character ? (
                    <Link key={slug} href={`/characters/${slug}`} className="rounded-lg border border-divine-gold/25 bg-deep-space/45 px-4 py-3 text-sm text-platinum hover:bg-divine-gold/10">
                      {character.name} · {character.title}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
