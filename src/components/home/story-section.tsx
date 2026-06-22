import { Crown, Flame, MoonStar } from "lucide-react";

import { SectionTitle } from "@/components/common/section-title";
import { GlassCard } from "@/components/common/glass-card";
import { EditableText } from "@/components/dev/editable-text";
import { MotionReveal } from "@/components/site/motion-reveal";
import { getContentOverrides, resolveText } from "@/lib/site-content/content-overrides";

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

export async function StorySection() {
  const overrides = await getContentOverrides();

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
                <EditableText
                  as="h3"
                  contentKey={`home.story.beat${index}.title`}
                  value={resolveText(overrides, `home.story.beat${index}.title`, beat.title)}
                  className="mt-5 block font-serif text-xl font-semibold text-platinum"
                />
                <EditableText
                  as="p"
                  multiline
                  contentKey={`home.story.beat${index}.text`}
                  value={resolveText(overrides, `home.story.beat${index}.text`, beat.text)}
                  className="mt-3 block text-sm leading-7 text-muted-foreground"
                />
              </GlassCard>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
}
