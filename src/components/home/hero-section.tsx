import { BookOpen, Compass, MailPlus, ShoppingBag, Sparkles } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { EditableText } from "@/components/dev/editable-text";
import { MotionReveal } from "@/components/site/motion-reveal";
import { getContentOverrides, resolveText } from "@/lib/site-content/content-overrides";

export async function HeroSection() {
  const overrides = await getContentOverrides();

  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,rgba(217,180,95,0.18),transparent_22rem),linear-gradient(120deg,rgba(8,8,20,0.88),rgba(109,77,255,0.20)_45%,rgba(26,16,46,0.76))]" />
      <div className="seal-ring animate-orbit absolute left-1/2 top-1/2 -z-10 size-[34rem] max-w-[88vw] -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div className="animate-pulse-glow absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-divine-gold/20 blur-3xl" />

      <div className="site-container flex min-h-[calc(100svh-4rem)] items-center py-16">
        <div className="mx-auto grid w-full gap-8 text-center lg:grid-cols-[1fr_22rem] lg:items-center lg:text-left">
          <MotionReveal>
            <div className="mx-auto max-w-4xl lg:mx-0">
              <Badge tone="gold" className="mx-auto lg:mx-0">
                <EditableText
                  contentKey="home.hero.eyebrow"
                  value={resolveText(overrides, "home.hero.eyebrow", "七界宇宙官方入口")}
                />
              </Badge>
              <EditableText
                as="h1"
                contentKey="home.hero.title"
                value={resolveText(overrides, "home.hero.title", "《神權崩壞：誰是最後的天命之子》")}
                className="mt-6 block text-balance font-serif text-4xl font-semibold leading-tight text-platinum sm:text-6xl lg:text-7xl"
              />
              <EditableText
                as="p"
                contentKey="home.hero.tagline"
                value={resolveText(overrides, "home.hero.tagline", "當神權崩壞，誰才是最後被命運選中的天命之子？")}
                className="mx-auto mt-6 block max-w-2xl text-balance text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0"
              />
              <EditableText
                as="p"
                multiline
                contentKey="home.hero.description"
                value={resolveText(
                  overrides,
                  "home.hero.description",
                  "天古三大上神沉默，三殿九尊互相審判，七界王座開始鬆動。凡界、星界、神界與深淵之間，一道被封印的名字正重新發光。",
                )}
                className="mx-auto mt-4 block max-w-3xl text-sm leading-7 text-platinum/78 sm:text-base lg:mx-0"
              />
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
                <DivineButton href="/novel">
                  <BookOpen className="size-5" aria-hidden="true" />
                  立即閱讀
                </DivineButton>
                <DivineButton href="/characters" variant="outline">
                  <Sparkles className="size-5" aria-hidden="true" />
                  探索角色
                </DivineButton>
                <DivineButton href="/shop" variant="outline">
                  <ShoppingBag className="size-5" aria-hidden="true" />
                  購買電子書
                </DivineButton>
                <DivineButton href="#newsletter" variant="ghost">
                  <MailPlus className="size-5" aria-hidden="true" />
                  訂閱更新
                </DivineButton>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12}>
            <GlassCard className="mx-auto w-full max-w-sm p-5 text-left">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-lg bg-divine-gold/12 text-divine-gold">
                  <Compass className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-moon-blue">目前星界定位</p>
                  <h2 className="font-serif text-xl font-semibold text-platinum">
                    神榜裂痕篇
                  </h2>
                </div>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                <div className="rounded-lg border border-platinum/10 bg-deep-space/45 p-3">
                  主線衝突：神權崩壞與最後天命
                </div>
                <div className="rounded-lg border border-platinum/10 bg-deep-space/45 p-3">
                  核心勢力：天幻神殿、黃金神殿、深淵魔殿
                </div>
                <div className="rounded-lg border border-platinum/10 bg-deep-space/45 p-3">
                  當前異象：天位神榜出現禁名
                </div>
              </div>
            </GlassCard>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
