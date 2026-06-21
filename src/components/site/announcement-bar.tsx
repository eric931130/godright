"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { Campaign } from "@/lib/campaigns/campaign-types";

export function AnnouncementBar({ campaign }: { campaign: Campaign }) {
  const storageKey = `godright.campaign.dismissed.${campaign.id}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(window.localStorage.getItem(storageKey) !== "1");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  if (!visible) return null;

  const dismiss = () => {
    window.localStorage.setItem(storageKey, "1");
    setVisible(false);
  };

  return (
    <div className="relative z-20 border-b border-divine-gold/25 bg-gradient-to-r from-divine-gold/15 via-astral-purple/10 to-divine-gold/15">
      <div className="site-container flex items-center justify-center gap-3 py-2 text-center text-sm">
        <p className="text-platinum/90">
          {campaign.title}
          {campaign.ctaHref ? (
            <Link href={campaign.ctaHref} className="ml-2 font-medium text-divine-gold underline-offset-4 hover:underline">
              {campaign.ctaText ?? "了解更多"} →
            </Link>
          ) : null}
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 text-muted-foreground transition hover:text-platinum"
          aria-label="關閉公告"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
