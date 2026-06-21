import { notFound } from "next/navigation";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { NovelChapterCard } from "@/components/novel/novel-chapter-card";
import { getChaptersByVolume, getVolume, volumes } from "@/data/novel";

type VolumePageProps = {
  params: Promise<{ volumeSlug: string }>;
};

export function generateStaticParams() {
  return volumes.map((volume) => ({
    volumeSlug: volume.slug,
  }));
}

export default async function VolumePage({ params }: VolumePageProps) {
  const { volumeSlug } = await params;
  const volume = getVolume(volumeSlug);

  if (!volume) {
    notFound();
  }

  const chapters = getChaptersByVolume(volume.slug);
  const freeCount = chapters.filter((chapter) => chapter.isFree).length;
  const paidCount = chapters.filter((chapter) => chapter.isPaid).length;
  const firstChapter = chapters[0];

  return (
    <div className="site-container py-10 sm:py-14">
      <GlassCard className="p-6 sm:p-8">
        <Badge>第 {volume.order} 卷</Badge>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-platinum sm:text-5xl">
          {volume.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          {volume.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="rounded-lg border border-platinum/10 bg-deep-space/45 px-3 py-2">
            共 {chapters.length} 章
          </span>
          <span className="rounded-lg border border-platinum/10 bg-deep-space/45 px-3 py-2">
            免費 {freeCount} 章
          </span>
          <span className="rounded-lg border border-platinum/10 bg-deep-space/45 px-3 py-2">
            付費 {paidCount} 章
          </span>
        </div>
        {firstChapter ? (
          <div className="mt-7">
            <DivineButton href={`/novel/${firstChapter.volumeSlug}/${firstChapter.slug}`}>
              開始本卷
            </DivineButton>
          </div>
        ) : null}
      </GlassCard>

      <section className="py-16">
        <SectionTitle
          eyebrow="Chapter List"
          title="章節列表"
          description="每章都會顯示閱讀時間、發布日期、免費或付費狀態，並支援 localStorage 書架操作。"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {chapters.map((chapter) => (
            <NovelChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </section>
    </div>
  );
}
