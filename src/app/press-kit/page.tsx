import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { characters } from "@/data/characters";
import { novelCatalog } from "@/data/novel";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Press Kit｜神權崩壞媒體資料",
  description: "《神權崩壞：誰是最後的天命之子》官方媒體資料包：作品簡介、作者簡介、代表角色與授權聲明。",
  path: "/press-kit",
  keywords: ["Press Kit", "媒體資料", "授權", "神權崩壞"],
});

const downloads = [
  "小說簡介一頁式 PDF（預留）",
  "角色介紹 PDF（預留）",
  "Logo 與識別素材包（預留）",
  "代表角色高解析立繪（預留）",
];

export default function PressKitPage() {
  const featured = characters.slice(0, 4);

  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Press Kit"
        title="媒體資料"
        description="提供媒體、合作夥伴與通路所需的官方資訊與素材。素材檔案將陸續補上，目前可透過聯絡信箱索取。"
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <Badge>作品簡介</Badge>
          <h2 className="mt-4 font-serif text-2xl font-semibold text-platinum">{novelCatalog.title}</h2>
          <p className="mt-3 text-sm leading-8 text-muted-foreground">{novelCatalog.description}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-muted-foreground">作者</dt><dd className="text-platinum">{novelCatalog.author}</dd></div>
            <div><dt className="text-muted-foreground">狀態</dt><dd className="text-platinum">{novelCatalog.status}</dd></div>
            <div><dt className="text-muted-foreground">字數</dt><dd className="text-platinum">{novelCatalog.wordCount}</dd></div>
            <div><dt className="text-muted-foreground">類型</dt><dd className="text-platinum">{novelCatalog.categories.slice(0, 2).join("、")}</dd></div>
          </dl>
        </GlassCard>
        <GlassCard className="p-6">
          <Badge tone="purple">作者簡介</Badge>
          <h2 className="mt-4 font-serif text-2xl font-semibold text-platinum">Godright IP Studio</h2>
          <p className="mt-3 text-sm leading-8 text-muted-foreground">
            專注於東方神權幻想 IP 的原創工作室，致力於以小說、設定集、視覺與周邊建構可長期經營的七界宇宙，
            並透過數位平台與讀者共同擴張故事邊界。
          </p>
        </GlassCard>
      </section>

      <section className="py-12">
        <SectionTitle eyebrow="Characters" title="代表角色" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((character) => (
            <Link key={character.id} href={`/characters/${character.slug}`}>
              <GlassCard interactive className="overflow-hidden p-0">
                <div className="image-placeholder relative aspect-[3/4]">
                  <div className="seal-ring animate-orbit absolute inset-8 opacity-50" />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-platinum">{character.name}</h3>
                  <p className="mt-1 text-sm text-divine-gold">{character.title}</p>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 py-4 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl font-semibold text-platinum">下載素材</h2>
          <div className="mt-4 grid gap-2">
            {downloads.map((item) => (
              <div key={item} className="flex items-center justify-between gap-3 rounded-lg border border-platinum/10 bg-deep-space/45 px-4 py-3 text-sm text-muted-foreground">
                <span>{item}</span>
                <Download className="size-4 text-divine-gold/60" aria-hidden="true" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">素材檔案準備中，正式版將提供直接下載連結。</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl font-semibold text-platinum">授權聲明與聯絡</h2>
          <p className="mt-4 text-sm leading-8 text-muted-foreground">
            本網站所有文字、角色、世界觀與視覺素材之著作權均屬 Godright IP Studio 所有。
            未經授權不得轉載、改作、商業使用或用於模型訓練。媒體採訪與授權合作請來信洽詢。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <DivineButton href={`mailto:${siteConfig.contactEmail}`}>
              <Mail className="size-4" aria-hidden="true" />
              聯絡我們
            </DivineButton>
            <DivineButton href="/collaboration" variant="outline">合作邀約</DivineButton>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
