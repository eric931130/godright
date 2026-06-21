import Link from "next/link";

import { GlassCard } from "@/components/common/glass-card";
import type { Campaign } from "@/lib/campaigns/campaign-types";

export function HeroBanner({ campaign }: { campaign: Campaign }) {
  return (
    <div className="site-container pt-6">
      <GlassCard className="gold-border overflow-hidden p-0">
        <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
          <div className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-divine-gold">活動快訊</p>
            <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-platinum sm:text-3xl">{campaign.title}</h2>
            {campaign.description ? (
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{campaign.description}</p>
            ) : null}
            {campaign.ctaHref ? (
              <Link
                href={campaign.ctaHref}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-divine-gold px-5 text-sm font-medium text-deep-space transition hover:bg-platinum"
              >
                {campaign.ctaText ?? "了解更多"}
              </Link>
            ) : null}
          </div>
          <div className="image-placeholder relative min-h-40">
            <div className="seal-ring animate-orbit absolute inset-8 opacity-60" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
