"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { AnnouncementBar } from "@/components/site/announcement-bar";
import { CampaignPopup } from "@/components/site/campaign-popup";
import { EventCountdown } from "@/components/site/event-countdown";
import { HeroBanner } from "@/components/site/hero-banner";
import { matchesPage, type Campaign } from "@/lib/campaigns/campaign-types";

export function SiteCampaigns() {
  const pathname = usePathname() ?? "/";
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/campaigns")
      .then((response) => (response.ok ? response.json() : { campaigns: [] }))
      .then((data: { campaigns?: Campaign[] }) => {
        if (active) setCampaigns(data.campaigns ?? []);
      })
      .catch(() => {
        if (active) setCampaigns([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const pageCampaigns = useMemo(
    () => campaigns.filter((campaign) => matchesPage(campaign, pathname)),
    [campaigns, pathname],
  );

  // 後台後端已依 priority 由高到低排序，這裡各類型取第一筆。
  const announcement = pageCampaigns.find((c) => c.type === "announcement_bar");
  const heroBanner = pageCampaigns.find((c) => c.type === "hero_banner" || c.type === "shop_banner");
  const countdown = pageCampaigns.find((c) => c.type === "countdown");
  const popup = pageCampaigns.find((c) => c.type === "popup");

  return (
    <>
      {announcement ? <AnnouncementBar campaign={announcement} /> : null}
      {heroBanner ? <HeroBanner campaign={heroBanner} /> : null}
      {countdown ? <EventCountdown campaign={countdown} /> : null}
      {popup ? <CampaignPopup campaign={popup} /> : null}
    </>
  );
}
