import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { getCharacterPopularity } from "@/lib/analytics/analytics-service";
import type { AnalyticsRange, CharacterPopularity } from "@/lib/analytics/types";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const ranges: { value: AnalyticsRange; label: string }[] = [
  { value: "week", label: "週" },
  { value: "month", label: "月" },
  { value: "all", label: "總" },
];

function parseRange(value?: string): AnalyticsRange {
  return value === "month" || value === "all" ? value : "week";
}

/** 取某指標前三名（且值 > 0）的 slug 集合，用於商業建議標籤。 */
function topSlugs(entries: CharacterPopularity[], pick: (e: CharacterPopularity) => number): Set<string> {
  return new Set(
    [...entries]
      .filter((entry) => pick(entry) > 0)
      .sort((a, b) => pick(b) - pick(a))
      .slice(0, 3)
      .map((entry) => entry.slug),
  );
}

type PageProps = { searchParams: Promise<{ range?: string }> };

export default async function AdminCharacterAnalyticsPage({ searchParams }: PageProps) {
  const range = parseRange((await searchParams).range);
  const { configured, characters } = await getCharacterPopularity(range);

  const stickerPicks = topSlugs(characters, (e) => e.favoriteCount);
  const spinoffPicks = topSlugs(characters, (e) => e.viewCount);
  const merchPicks = topSlugs(characters, (e) => e.productClickCount + e.purchaseCount);

  return (
    <AdminShell
      title="角色商業價值"
      description="依站內互動加權計算角色人氣，作為主推角色、貼圖、外傳與周邊的決策參考。"
      actions={
        <div className="inline-flex gap-1 rounded-lg border border-divine-gold/25 bg-deep-space/45 p-1">
          {ranges.map((item) => (
            <Link
              key={item.value}
              href={`/admin/analytics/characters?range=${item.value}`}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition",
                range === item.value ? "bg-divine-gold text-deep-space" : "text-muted-foreground hover:text-platinum",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      }
    >
      {!configured ? (
        <GlassCard className="border-divine-gold/30 p-5">
          <p className="text-sm leading-7 text-muted-foreground">
            尚未連接事件資料庫，無法計算角色人氣。請設定 Firebase Admin 環境變數並部署 Firestore 規則。
          </p>
        </GlassCard>
      ) : (
        <GlassCard className="overflow-x-auto p-0">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-divine-gold/20 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">角色</th>
                <th className="px-4 py-3 text-right">人氣分數</th>
                <th className="px-4 py-3 text-right">瀏覽</th>
                <th className="px-4 py-3 text-right">收藏</th>
                <th className="px-4 py-3 text-right">商品點擊</th>
                <th className="px-4 py-3 text-right">購買</th>
                <th className="px-4 py-3">商業建議</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((entry, index) => (
                <tr key={entry.slug} className="border-b border-platinum/5 last:border-0">
                  <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                  <td className="px-4 py-3">
                    <Link href={`/characters/${entry.slug}`} className="font-medium text-platinum hover:text-divine-gold">
                      {entry.name}
                    </Link>
                    <span className="ml-2 text-xs text-muted-foreground">{entry.title}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-divine-gold">{entry.score}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{entry.viewCount}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{entry.favoriteCount}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{entry.productClickCount}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{entry.purchaseCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {merchPicks.has(entry.slug) ? <Badge tone="gold">適合周邊</Badge> : null}
                      {stickerPicks.has(entry.slug) ? <Badge tone="purple">適合貼圖</Badge> : null}
                      {spinoffPicks.has(entry.slug) ? <Badge tone="blue">適合外傳</Badge> : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}

      <p className="text-xs leading-6 text-muted-foreground">
        註：商品點擊、購買為「商品瀏覽 / 購買成功」依商品關聯角色推導之參考值；featured 與投票事件待主推角色選擇與投票功能上線後才會累積。
      </p>
    </AdminShell>
  );
}
