import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { JsonLd } from "@/components/seo/json-ld";
import { artifacts, getArtifact } from "@/data/lore";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { isValidSlug } from "@/lib/validation";

type ArtifactPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return artifacts.map((artifact) => ({ slug: artifact.slug }));
}

export async function generateMetadata({ params }: ArtifactPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return createPageMetadata({
      title: "物件不存在｜神權崩壞",
      description: "找不到指定的神器或物件資料。",
      path: "/artifacts",
    });
  }
  const artifact = getArtifact(slug);

  if (!artifact) {
    return createPageMetadata({
      title: "物件不存在｜神權崩壞",
      description: "找不到指定的神器或物件資料。",
      path: `/artifacts/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${artifact.name}｜物件資料`,
    description: artifact.meaning,
    path: `/artifacts/${artifact.slug}`,
    keywords: [artifact.name, artifact.type, artifact.element, artifact.holder, ...artifact.tags],
    type: "article",
  });
}

export default async function ArtifactPage({ params }: ArtifactPageProps) {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    notFound();
  }
  const artifact = getArtifact(slug);

  if (!artifact) {
    notFound();
  }

  return (
    <div className="site-container py-10 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: artifact.name,
          description: artifact.meaning,
          url: absoluteUrl(`/artifacts/${artifact.slug}`),
          keywords: artifact.tags.join(", "),
          additionalProperty: [
            { "@type": "PropertyValue", name: "持有者", value: artifact.holder },
            { "@type": "PropertyValue", name: "屬性", value: artifact.element },
          ],
        }}
      />
      <GlassCard className="overflow-hidden p-0">
        <div className="grid lg:grid-cols-[24rem_1fr]">
          <div className="image-placeholder relative aspect-[4/3] lg:aspect-square">
            <div className="seal-ring animate-orbit absolute inset-10 opacity-70" />
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge>{artifact.type}</Badge>
              <Badge tone={artifact.merchReady ? "gold" : "purple"}>
                {artifact.merchReady ? "可做成周邊" : "劇情核心"}
              </Badge>
            </div>
            <h1 className="mt-4 font-serif text-5xl text-platinum">{artifact.name}</h1>
            <p className="mt-5 text-base leading-8 text-muted-foreground">{artifact.meaning}</p>
            <div className="mt-6 flex gap-2">{artifact.palette.map((color) => <span key={color} className="size-8 rounded-lg border border-platinum/20" style={{ backgroundColor: color }} />)}</div>
          </div>
        </div>
      </GlassCard>
      <section className="grid gap-6 py-16 md:grid-cols-2">
        <Info title="持有者" text={artifact.holder} />
        <Info title="屬性" text={artifact.element} />
        <Info title="能力" text={artifact.ability} />
        <Info title="造型描述" text={artifact.appearance} />
        <Info title="相關章節" text={artifact.chapters.join("、")} />
        <Info title="標籤" text={artifact.tags.join("、")} />
      </section>
      <DivineButton href="/artifacts" variant="outline">返回物件總覽</DivineButton>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <GlassCard className="p-6">
      <h2 className="font-serif text-2xl text-platinum">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
    </GlassCard>
  );
}
