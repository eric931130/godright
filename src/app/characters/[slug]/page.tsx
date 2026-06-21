import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FavoriteButton } from "@/components/account/favorite-button";
import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { CharacterGallery } from "@/components/characters/character-gallery";
import { CharacterImageSwitcher } from "@/components/characters/character-image-switcher";
import { CharacterInfoPanel } from "@/components/characters/character-info-panel";
import { CharacterPowerPanel } from "@/components/characters/character-power-panel";
import { CharacterRelatedContent } from "@/components/characters/character-related-content";
import { JsonLd } from "@/components/seo/json-ld";
import { characters, getCharacter, getFaction } from "@/data/characters";
import { enhanceCharacter } from "@/lib/characters/enhanced-character";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { isValidSlug } from "@/lib/validation";

type CharacterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return characters.map((character) => ({ slug: character.slug }));
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return createPageMetadata({
      title: "角色不存在｜神權崩壞角色圖鑑",
      description: "找不到指定的神權崩壞角色資料。",
      path: "/characters",
    });
  }
  const character = getCharacter(slug);

  if (!character) {
    return createPageMetadata({
      title: "角色不存在｜神權崩壞角色圖鑑",
      description: "找不到指定的神權崩壞角色資料。",
      path: `/characters/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${character.name}｜${character.title}`,
    description: character.summary,
    path: `/characters/${character.slug}`,
    keywords: [character.name, character.englishName, character.title, character.faction, character.powerRank, ...character.tags],
    type: "profile",
  });
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    notFound();
  }
  const character = getCharacter(slug);

  if (!character) {
    notFound();
  }

  const enhancedCharacter = enhanceCharacter(character);
  const faction = getFaction(character.factionSlug);

  return (
    <div className="site-container py-10 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          additionalType: "https://schema.org/FictionalCharacter",
          name: character.name,
          alternateName: character.englishName,
          description: character.summary,
          url: absoluteUrl(`/characters/${character.slug}`),
          affiliation: character.faction,
        }}
      />
      <section className="grid gap-8 lg:grid-cols-[24rem_1fr]">
        <GlassCard className="overflow-hidden p-0">
          <CharacterImageSwitcher
            chibiUrl={enhancedCharacter.images.chibiUrl}
            defaultMode={enhancedCharacter.defaultImageMode}
            name={enhancedCharacter.name}
            portraitUrl={enhancedCharacter.images.portraitUrl}
          />
          <CharacterGallery
            galleryUrls={enhancedCharacter.images.galleryUrls}
            name={enhancedCharacter.name}
          />
        </GlassCard>
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{enhancedCharacter.role}</Badge>
            <Badge tone="purple">{enhancedCharacter.powerRank}</Badge>
            {faction ? <Badge tone="blue">{faction.name}</Badge> : null}
          </div>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-platinum">
            {enhancedCharacter.name}
          </h1>
          <p className="mt-2 text-lg text-divine-gold">
            {enhancedCharacter.englishName} · {enhancedCharacter.title}
          </p>
          <blockquote className="mt-6 border-l border-divine-gold/40 pl-4 text-lg leading-8 text-platinum/90">
            {enhancedCharacter.quote}
          </blockquote>
          <FavoriteButton
            id={enhancedCharacter.id}
            type="character"
            title={enhancedCharacter.name}
            href={`/characters/${enhancedCharacter.slug}`}
            className="mt-7"
          />
          <div className="mt-7">
            <CharacterInfoPanel character={enhancedCharacter} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 py-16 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl text-platinum">外貌描述</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{enhancedCharacter.appearance}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl text-platinum">性格描述</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{enhancedCharacter.personality}</p>
        </GlassCard>
        <GlassCard className="p-6 lg:col-span-2">
          <h2 className="font-serif text-2xl text-platinum">劇情摘要</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{enhancedCharacter.summary}</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{enhancedCharacter.storyArc}</p>
        </GlassCard>
      </section>

      <section className="py-16">
        <SectionTitle eyebrow="Power" title="能力、神器與守護獸" />
        <div className="mt-8">
          <CharacterPowerPanel character={enhancedCharacter} />
        </div>
      </section>

      <section className="py-16">
        <SectionTitle eyebrow="Relationships" title="角色關係" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {enhancedCharacter.relationships.map((relation) => {
            const target = getCharacter(relation.targetSlug);
            return (
              <GlassCard key={`${relation.type}-${relation.targetSlug}`} className="p-5">
                <Badge tone="purple">{relation.type}</Badge>
                <h3 className="mt-3 font-serif text-xl text-platinum">{target?.name ?? relation.targetSlug}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{relation.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <CharacterRelatedContent
        relatedChapters={enhancedCharacter.relatedChapters}
        relatedProducts={enhancedCharacter.relatedProducts}
      />

      <DivineButton href="/characters" variant="outline">返回角色總覽</DivineButton>
    </div>
  );
}
