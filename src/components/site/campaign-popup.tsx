"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import type { Campaign } from "@/lib/campaigns/campaign-types";

export function CampaignPopup({ campaign }: { campaign: Campaign }) {
  const storageKey = `godright.campaign.seen.${campaign.id}`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 已看過則不再跳出（避免每次重新整理都顯示）。
    if (window.localStorage.getItem(storageKey) === "1") return;
    const timer = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  if (!open) return null;

  const close = () => {
    window.localStorage.setItem(storageKey, "1");
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep-space/70 p-4 backdrop-blur-sm">
      <GlassCard className="relative w-full max-w-md overflow-hidden p-0">
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 z-10 rounded-lg bg-deep-space/60 p-1.5 text-muted-foreground transition hover:text-platinum"
          aria-label="關閉"
        >
          <X className="size-4" />
        </button>
        <div className="image-placeholder relative aspect-[16/9]">
          <div className="seal-ring animate-orbit absolute inset-10 opacity-50" />
        </div>
        <div className="p-6 text-center">
          <h2 className="font-serif text-2xl font-semibold text-platinum">{campaign.title}</h2>
          {campaign.description ? (
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{campaign.description}</p>
          ) : null}
          {campaign.ctaHref ? (
            <Link
              href={campaign.ctaHref}
              onClick={close}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-divine-gold px-5 text-sm font-medium text-deep-space transition hover:bg-platinum"
            >
              {campaign.ctaText ?? "前往查看"}
            </Link>
          ) : (
            <button type="button" onClick={close} className="mt-5 text-sm text-divine-gold">
              我知道了
            </button>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
