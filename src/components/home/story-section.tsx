import { Crown, Flame, MoonStar } from "lucide-react";

import { SectionTitle } from "@/components/common/section-title";
import { GlassCard } from "@/components/common/glass-card";
import { MotionReveal } from "@/components/site/motion-reveal";

const storyBeats = [
  {
    title: "神權崩壞",
    icon: Crown,
    text: "天位神榜不再準確，天界四帝開始互相質疑，眾神第一次失去絕對權威。",
  },
  {
    title: "封印裂開",
    icon: MoonStar,
    text: "星界七門浮現上古封印的裂痕，凡界四大古王國被迫重新履行古老盟約。",
  },
  {
    title: "神魔之子",
    icon: Flame,
    text: "天魂與天芸的命運交會，將揭開最後天命究竟是神授，還是人心的選擇。",
  },
];

export function StorySection() {
  return (
    <section className="site-container py-16">
      <SectionTitle
        eyebrow="Story"
        title="故事大綱"
        description="《神權崩壞》從一場神榜異動開始，將神界、魔殿、星界與凡界捲入命運審判。"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {storyBeats.map((beat, index) => {
          const Icon = beat.icon;

          return (
            <MotionReveal key={beat.title} delay={index * 0.06}>
              <GlassCard interactive className="h-full p-6">
                <div className="flex size-12 items-center justify-center rounded-lg bg-divine-gold/12 text-divine-gold">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-platinum">
                  {beat.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {beat.text}
                </p>
              </GlassCard>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
}
