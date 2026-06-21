import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getLocation, locations } from "@/data/lore";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { isValidSlug } from "@/lib/validation";

type LocationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return createPageMetadata({
      title: "場地不存在｜神權崩壞",
      description: "找不到指定的場地資料。",
      path: "/locations",
    });
  }
  const location = getLocation(slug);

  if (!location) {
    return createPageMetadata({
      title: "場地不存在｜神權崩壞",
      description: "找不到指定的場地資料。",
      path: `/locations/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${location.name}｜場地資料`,
    description: location.atmosphere,
    path: `/locations/${location.slug}`,
    keywords: [location.name, location.realm, location.faction, ...location.tags],
    type: "article",
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    notFound();
  }
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  return (
    <div className="site-container py-10 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Place",
          name: location.name,
          description: location.atmosphere,
          url: absoluteUrl(`/locations/${location.slug}`),
          additionalProperty: [
            { "@type": "PropertyValue", name: "界域", value: location.realm },
            { "@type": "PropertyValue", name: "勢力", value: location.faction },
          ],
        }}
      />
      <section className="grid gap-8 lg:grid-cols-[24rem_1fr]">
        <GlassCard className="overflow-hidden p-0">
          <div className="image-placeholder aspect-[3/4]" />
        </GlassCard>
        <div>
          <Badge>{location.realm}</Badge>
          <h1 className="mt-4 font-serif text-5xl text-platinum">{location.name}</h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground">{location.atmosphere}</p>
          <div className="mt-6 flex gap-2">{location.palette.map((color) => <span key={color} className="size-8 rounded-lg border border-platinum/20" style={{ backgroundColor: color }} />)}</div>
        </div>
      </section>
      <section className="grid gap-6 py-16 lg:grid-cols-2">
        <Info title="場地功能" text={location.function} />
        <Info title="歷史背景" text={location.history} />
        <Info title="出現章節" text={location.chapters.join("、")} />
        <Info title="相關角色" text={location.relatedCharacters.join("、")} />
        <Info title="重要事件" text={location.majorEvents.join("、")} />
        <Info title="所屬勢力" text={location.faction} />
      </section>
      <DivineButton href="/locations" variant="outline">返回場地總覽</DivineButton>
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
