import type { Metadata } from "next";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { DevModePanel } from "@/components/dev/dev-mode-panel";
import { characters } from "@/data/characters";
import { userBadges } from "@/data/account";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "個人資料｜會員中心",
  description: "查看神權崩壞會員 Public UID、主推角色、徽章牆與帳號資訊。",
  path: "/account/profile",
  keywords: ["會員中心", "Public UID", "主推角色", "徽章"],
});

export default function AccountProfilePage() {
  const featuredCharacter = characters[0];

  return (
    <main className="site-container py-10 sm:py-14">
      <SectionTitle eyebrow="Profile" title="個人資訊中心" description="正式版會由 Firebase Auth 與 Firestore users profile 回填。" />
      <div className="mt-8">
        <DevModePanel />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <GlassCard className="p-6">
          <div className="image-placeholder mx-auto aspect-square max-w-40 rounded-lg" />
          <h1 className="mt-5 text-center text-2xl font-semibold text-platinum">星命觀測者</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">reader@example.com</p>
          <div className="mt-5 grid gap-3 text-sm">
            <Info label="Public UID" value="1000000001" />
            <Info label="Firebase UID" value="預設隱藏，點擊設定頁可展開" />
            <Info label="會員等級" value="付費讀者" />
            <Info label="註冊日期" value="2026-06-21" />
          </div>
        </GlassCard>

        <div className="grid gap-6">
          <GlassCard className="p-6">
            <Badge tone="purple">主推角色</Badge>
            <div className="mt-5 grid gap-5 md:grid-cols-[12rem_1fr]">
              <div className="image-placeholder aspect-[3/4] rounded-lg" />
              <div>
                <h2 className="font-serif text-3xl font-semibold text-platinum">{featuredCharacter.name}</h2>
                <p className="mt-2 text-divine-gold">{featuredCharacter.title}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{featuredCharacter.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>{featuredCharacter.faction}</Badge>
                  <Badge tone="blue">{featuredCharacter.powerRank}</Badge>
                </div>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold text-platinum">徽章牆</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {userBadges.map((badge) => (
                <Badge key={badge.id} tone="gold">{badge.name}</Badge>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-divine-gold/15 bg-platinum/5 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 break-all text-platinum">{value}</p>
    </div>
  );
}
