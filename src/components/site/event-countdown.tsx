"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

import type { Campaign } from "@/lib/campaigns/campaign-types";

function diffParts(target: number) {
  const total = Math.max(0, target - Date.now());
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  return { total, days, hours, minutes, seconds };
}

export function EventCountdown({ campaign }: { campaign: Campaign }) {
  const target = campaign.endsAt ? new Date(campaign.endsAt).getTime() : 0;
  const [parts, setParts] = useState(() => diffParts(target));

  useEffect(() => {
    if (!target) return;
    const id = window.setInterval(() => setParts(diffParts(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!target || parts.total <= 0) return null;

  const cell = (value: number, label: string) => (
    <div className="flex flex-col items-center rounded-lg border border-divine-gold/25 bg-deep-space/50 px-3 py-1.5">
      <span className="font-serif text-xl font-semibold text-divine-gold">{String(value).padStart(2, "0")}</span>
      <span className="text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <div className="site-container py-3">
      <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3">
        <p className="flex items-center gap-2 text-sm text-platinum">
          <Timer className="size-4 text-divine-gold" aria-hidden="true" />
          {campaign.title}
        </p>
        <div className="flex items-center gap-2">
          {cell(parts.days, "天")}
          {cell(parts.hours, "時")}
          {cell(parts.minutes, "分")}
          {cell(parts.seconds, "秒")}
          {campaign.ctaHref ? (
            <Link href={campaign.ctaHref} className="ml-1 text-sm font-medium text-divine-gold hover:text-platinum">
              {campaign.ctaText ?? "前往"} →
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
