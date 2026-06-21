import Link from "next/link";
import { ArrowRight, CalendarDays, Gem, Newspaper } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { NewsletterForm } from "@/components/common/newsletter-form";
import { SectionTitle } from "@/components/common/section-title";
import { CharacterCard } from "@/components/cards/character-card";
import { ChapterCard } from "@/components/cards/chapter-card";
import { LoreCard } from "@/components/cards/lore-card";
import { PowerRankCard } from "@/components/cards/power-rank-card";
import { ProductCard } from "@/components/cards/product-card";
import { MotionReveal } from "@/components/site/motion-reveal";
import { characters } from "@/data/mock/characters";
import { chapters } from "@/data/mock/chapters";
import { loreEntries } from "@/data/mock/lore";
import { newsItems } from "@/data/mock/news";
import { products } from "@/data/mock/products";
import { powerRanks } from "@/data/mock/ranks";

export function LatestChaptersSection() {
  return (
    <section className="site-container py-16">
      <SectionTitle
        eyebrow="Chapters"
        title="最新章節"
        description="從神榜裂痕到七界王座，追上天命之子的最新進度。"
        action={
          <DivineButton href="/novel" variant="outline">
            查看全部章節
            <ArrowRight className="size-4" aria-hidden="true" />
          </DivineButton>
        }
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {chapters.slice(0, 4).map((chapter, index) => (
          <MotionReveal key={chapter.id} delay={index * 0.04}>
            <ChapterCard chapter={chapter} />
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

export function FeaturedCharactersSection() {
  return (
    <section className="site-container py-16">
      <SectionTitle
        eyebrow="Characters"
        title="角色精選"
        description="八位核心角色已建立初始資料，角色圖位置保留給後續立繪與卡面資產。"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {characters.map((character, index) => (
          <MotionReveal key={character.id} delay={index * 0.035}>
            <CharacterCard character={character} featured={index < 2} />
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

export function PowerRankSection() {
  return (
    <section className="border-y border-divine-gold/16 bg-abyss-purple/32">
      <div className="site-container py-16">
        <SectionTitle
          eyebrow="God Rank"
          title="天位神榜預覽"
          description="神榜不是單純戰力表，而是神權制度、界域秩序與命運偏差的公開判決。"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {powerRanks.map((rank, index) => (
            <MotionReveal key={rank.id} delay={index * 0.035}>
              <PowerRankCard rank={rank} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LoreSection() {
  return (
    <section className="site-container py-16">
      <SectionTitle
        eyebrow="Seven Realms"
        title="七界世界觀"
        description="從三殿九尊到星界七門，所有設定都會逐步整理成可搜尋的世界觀百科。"
        action={
          <DivineButton href="/codex" variant="outline">
            進入百科
            <ArrowRight className="size-4" aria-hidden="true" />
          </DivineButton>
        }
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {loreEntries.map((lore, index) => (
          <MotionReveal key={lore.id} delay={index * 0.035}>
            <LoreCard lore={lore} />
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

export function StoreSection() {
  const ebooks = products.filter((product) => product.category === "電子書");

  return (
    <section className="site-container py-16">
      <SectionTitle
        eyebrow="Ebook Store"
        title="電子書販售"
        description="電子書、套書與限定番外會在後續階段接上會員藏書架與購買權限。"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ebooks.map((product, index) => (
          <MotionReveal key={product.id} delay={index * 0.05}>
            <ProductCard product={product} />
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

export function MerchSection() {
  const merch = products.filter((product) => product.category !== "電子書");

  return (
    <section className="border-y border-divine-gold/16 bg-demon-blue/24">
      <div className="site-container py-16">
        <SectionTitle
          eyebrow="Merch & Stickers"
          title="IP 周邊與貼圖"
          description="先以 mock 商品展示貼圖、角色卡與典藏海報，保留圖片與商城串接位置。"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {merch.map((product, index) => (
            <MotionReveal key={product.id} delay={index * 0.05}>
              <ProductCard product={product} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsSection() {
  return (
    <section className="site-container py-16">
      <SectionTitle
        eyebrow="News"
        title="最新消息"
        description="章節更新、商品預購、活動票選與網站公告集中在此。"
        action={
          <DivineButton href="/news" variant="outline">
            全部消息
            <Newspaper className="size-4" aria-hidden="true" />
          </DivineButton>
        }
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {newsItems.map((item, index) => (
          <MotionReveal key={item.id} delay={index * 0.04}>
            <GlassCard interactive className="h-full p-5">
              <div className="flex items-center justify-between gap-3">
                <Badge tone={item.category === "商品" ? "purple" : "gold"}>
                  {item.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5 text-divine-gold" aria-hidden="true" />
                  {item.date}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-platinum">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.summary}
              </p>
              <Link
                href="/news"
                className="mt-5 inline-flex text-sm font-medium text-divine-gold transition hover:text-platinum"
              >
                閱讀公告
              </Link>
            </GlassCard>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section id="newsletter" className="site-container py-16">
      <MotionReveal>
        <GlassCard className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
            <div className="p-6 sm:p-10">
              <Badge tone="purple">Oracle Dispatch</Badge>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-platinum sm:text-4xl">
                訂閱消息
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                第一時間收到章節更新、電子書上架、角色人氣投票、貼圖開賣與會員限定番外通知。
              </p>
              <div className="mt-6">
                <NewsletterForm />
              </div>
            </div>
            <div className="relative min-h-64 overflow-hidden bg-[radial-gradient(circle_at_50%_40%,rgba(217,180,95,0.22),transparent_38%),linear-gradient(135deg,rgba(109,77,255,0.24),rgba(16,34,63,0.42))]">
              <div className="seal-ring animate-orbit absolute inset-10 opacity-70" />
              <div className="absolute inset-x-8 bottom-8 rounded-lg border border-divine-gold/24 bg-deep-space/55 p-4 text-sm leading-6 text-muted-foreground backdrop-blur">
                <Gem className="mb-3 size-5 text-divine-gold" aria-hidden="true" />
                會員中心將在下一階段開放 Reader、Collector、Oracle 三種訂閱層級。
              </div>
            </div>
          </div>
        </GlassCard>
      </MotionReveal>
    </section>
  );
}
