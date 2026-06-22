import type { Metadata } from "next";
import {
  BookOpen,
  GraduationCap,
  ImageIcon,
  PenTool,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Video,
} from "lucide-react";

import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { CollaborationForm } from "@/components/collaboration/collaboration-form";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "IP 合作邀約｜神權崩壞",
  description: "《神權崩壞：誰是最後的天命之子》原創 IP 開放插畫、貼圖、短影音、電子書、文創商品、講座與授權合作。",
  path: "/collaboration",
  keywords: ["IP 合作", "授權", "插畫合作", "貼圖", "文創", "神權崩壞"],
});

const collaborationItems = [
  { icon: ImageIcon, title: "插畫合作", description: "角色立繪、場景與封面插畫共創。" },
  { icon: Smile, title: "貼圖合作", description: "LINE / 通訊貼圖企劃與上架。" },
  { icon: Video, title: "短影音合作", description: "角色短劇、世界觀導讀與聯名影音。" },
  { icon: BookOpen, title: "電子書合作", description: "外傳、設定集與跨平台電子書發行。" },
  { icon: ShoppingBag, title: "文創商品合作", description: "周邊、聯名商品與限量收藏品。" },
  { icon: GraduationCap, title: "校園講座 / AI 創作課程", description: "原創 IP 養成、世界觀建構與 AI 共創教學。" },
  { icon: PenTool, title: "同人 / 創作授權", description: "二創規範與授權合作洽談。" },
  { icon: ShieldCheck, title: "商業授權", description: "品牌聯名、改編與商業使用授權。" },
];

export default function CollaborationPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Collaboration"
        title="IP 合作邀約"
        description="《神權崩壞》是一個持續擴張的東方神權幻想宇宙，歡迎品牌、創作者與教育單位一起把七界帶向更多舞台。"
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl font-semibold text-platinum">關於作者與作品</h2>
          <p className="mt-4 text-sm leading-8 text-muted-foreground">
            《神權崩壞：誰是最後的天命之子》由 {siteConfig.studioName} 創作，融合東方神話、暗黑神殿與星界命運，
            構築神界、星界、魔界與凡界交錯的七界宇宙。故事以神權崩壞為起點，探討天命、信仰與自我的衝突。
          </p>
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl font-semibold text-platinum">IP 世界觀特色</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-7 text-muted-foreground">
            <li>· 完整的七界設定、勢力譜系與天位神榜位階。</li>
            <li>· 神魔雙屬性主角與夢幻系女主的強烈視覺反差。</li>
            <li>· 可延展的角色群像，適合貼圖、外傳與周邊開發。</li>
            <li>· 高質感視覺基調：毛玻璃、金紋、星雲與神殿光暈。</li>
          </ul>
        </GlassCard>
      </section>

      <section className="py-16">
        <SectionTitle eyebrow="What We Offer" title="可合作項目" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collaborationItems.map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.title} className="p-5">
                <Icon className="size-6 text-divine-gold" aria-hidden="true" />
                <h3 className="mt-3 font-serif text-lg font-semibold text-platinum">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 py-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTitle eyebrow="Contact" title="聯絡我們" description="填寫下方表單，或下載媒體資料包了解更多。" />
          <GlassCard className="mt-6 p-6">
            <h3 className="font-serif text-xl font-semibold text-platinum">合作案例</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">合作案例將陸續更新，敬請期待。</p>
            <DivineButton href="/press-kit" variant="outline" className="mt-5">
              查看 Press Kit
            </DivineButton>
          </GlassCard>
        </div>
        <CollaborationForm />
      </section>
    </div>
  );
}
