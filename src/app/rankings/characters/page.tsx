import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { CharacterImageSwitcher } from "@/components/characters/character-image-switcher";
import { getCharacter } from "@/data/characters";
import { enhanceCharacter } from "@/lib/characters/enhanced-character";
import { getCharacterPopularity } from "@/lib/analytics/analytics-service";
import { createPageMetadata } from "@/lib/seo";
import type { AnalyticsRange } from "@/lib/analytics/types";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "角色人氣榜｜神權崩壞",
  description: "依站內互動統計的角色人氣排行，可切換週、月與總排行，反映讀者最關注的七界角色。",
  path: "/rankings/characters",
  keywords: ["角色人氣", "人氣排行", "主推角色", "神權崩壞"],
});

const ranges: { value: AnalyticsRange; label: string }[] = [
  { value: "week", label: "週排行" },
  { value: "month", label: "月排行" },
  { value: "all", label: "總排行" },
];

function parseRange(value?: string): AnalyticsRange {
  return value === "month" || value === "all" ? value : "week";
}

type PageProps = { searchParams: Promise<{ range?: string }> };

export default async function CharacterRankingsPage({ searchParams }: PageProps) {
  const range = parseRange((await searchParams).range);
  const { configured, characters } = await getCharacterPopularity(range);
  const board = characters.filter((entry) => entry.score > 0);

  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Popularity"
        title="角色人氣榜"
        description="依站內瀏覽、收藏、商品與投票互動加權統計，反映讀者最關注的角色。"
      />

      <div className="mt-6 inline-flex gap-1 rounded-xl border border-divine-gold/25 bg-deep-space/45 p-1">
        {ranges.map((item) => (
          <Link
            key={item.value}
            href={`/rankings/characters?range=${item.value}`}
            className={cn(
              "rounded-lg px-4 py-2 text-sm transition",
              range === item.value
                ? "bg-divine-gold text-deep-space"
                : "text-muted-foreground hover:text-platinum",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {!configured ? (
        <GlassCard className="mt-8 border-divine-gold/30 p-5">
          <p className="text-sm leading-7 text-muted-foreground">
            人氣統計需連接事件資料庫後才會顯示。設定 Firebase Admin 環境變數並部署 Firestore 規則後，
            讀者互動將即時反映於此榜。
          </p>
        </GlassCard>
      ) : board.length === 0 ? (
        <GlassCard className="mt-8 p-5">
          <p className="text-sm leading-7 text-muted-foreground">此時間範圍內尚無足夠互動資料，先去逛逛角色圖鑑吧。</p>
        </GlassCard>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {board.map((entry, index) => {
            const character = getCharacter(entry.slug);
            const enhanced = character ? enhanceCharacter(character) : null;
            return (
              <GlassCard key={entry.slug} interactive className="overflow-hidden p-0">
                <div className="relative">
                  {enhanced ? (
                    <CharacterImageSwitcher
                      chibiUrl={enhanced.images.chibiUrl}
                      defaultMode={enhanced.defaultImageMode}
                      name={enhanced.name}
                      portraitUrl={enhanced.images.portraitUrl}
                    />
                  ) : (
                    <div className="image-placeholder aspect-[4/3]" />
                  )}
                  <div className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-full bg-deep-space/80 font-serif text-lg font-semibold text-divine-gold ring-1 ring-divine-gold/40">
                    {index + 1}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/characters/${entry.slug}`}
                        className="font-serif text-xl font-semibold text-platinum hover:text-divine-gold"
                      >
                        {entry.name}
                      </Link>
                      <p className="mt-1 truncate text-sm text-divine-gold">{entry.title}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-serif text-2xl font-semibold text-divine-gold">{entry.score}</p>
                      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">人氣分數</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <Badge tone="purple">瀏覽 {entry.viewCount}</Badge>
                    <Badge tone="gold">收藏 {entry.favoriteCount}</Badge>
                    <Badge tone="blue">商品點擊 {entry.productClickCount}</Badge>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
