import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackEvent } from "@/components/analytics/track-event";
import { FavoriteButton } from "@/components/account/favorite-button";
import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { CharacterGallery } from "@/components/characters/character-gallery";
import { CharacterPortraitEditable } from "@/components/characters/character-portrait-editable";
import { CharacterInfoPanel } from "@/components/characters/character-info-panel";
import { CharacterPowerPanel } from "@/components/characters/character-power-panel";
import { CharacterRelatedContent } from "@/components/characters/character-related-content";
import { EditableText } from "@/components/dev/editable-text";
import { JsonLd } from "@/components/seo/json-ld";
import { characters, getCharacter, getFaction } from "@/data/characters";
import { enhanceCharacter } from "@/lib/characters/enhanced-character";
import { getContentOverrides, resolveImage, resolveText } from "@/lib/site-content/content-overrides";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { isValidSlug } from "@/lib/validation";

export const revalidate = 60;

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

  const overrides = await getContentOverrides();
  const fieldKey = (field: string) => `character.${character.slug}.${field}`;
  const mergedCharacter = {
    ...character,
    name: resolveText(overrides, fieldKey("name"), character.name),
    title: resolveText(overrides, fieldKey("title"), character.title),
    summary: resolveText(overrides, fieldKey("summary"), character.summary),
    appearance: resolveText(overrides, fieldKey("appearance"), character.appearance),
    personality: resolveText(overrides, fieldKey("personality"), character.personality),
    storyArc: resolveText(overrides, fieldKey("storyArc"), character.storyArc),
    quote: resolveText(overrides, fieldKey("quote"), character.quote),
    image: resolveImage(overrides, fieldKey("portrait"), character.image) ?? character.image,
  };
  const enhancedCharacter = enhanceCharacter(mergedCharacter);
  const faction = getFaction(character.factionSlug);
  const portraitOverride = overrides[fieldKey("portrait")]?.imageUrl;

  return (
    <div className="site-container py-10 sm:py-14">
      <TrackEvent event="character_view" targetType="character" targetId={character.slug} />
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
          <CharacterPortraitEditable
            contentKey={fieldKey("portrait")}
            portraitUrl={enhancedCharacter.images.portraitUrl}
            overrideValue={portraitOverride}
            chibiUrl={enhancedCharacter.images.chibiUrl}
            defaultMode={enhancedCharacter.defaultImageMode}
            name={enhancedCharacter.name}
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
          <EditableText
            as="h1"
            contentKey={fieldKey("name")}
            value={enhancedCharacter.name}
            className="mt-5 block font-serif text-5xl font-semibold text-platinum"
          />
          <p className="mt-2 text-lg text-divine-gold">
            {enhancedCharacter.englishName} ·{" "}
            <EditableText as="span" contentKey={fieldKey("title")} value={enhancedCharacter.title} />
          </p>
          <EditableText
            as="blockquote"
            multiline
            contentKey={fieldKey("quote")}
            value={enhancedCharacter.quote}
            className="mt-6 block border-l border-divine-gold/40 pl-4 text-lg leading-8 text-platinum/90"
          />
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
          <EditableText
            as="p"
            multiline
            contentKey={fieldKey("appearance")}
            value={enhancedCharacter.appearance}
            className="mt-4 block text-sm leading-7 text-muted-foreground"
          />
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl text-platinum">性格描述</h2>
          <EditableText
            as="p"
            multiline
            contentKey={fieldKey("personality")}
            value={enhancedCharacter.personality}
            className="mt-4 block text-sm leading-7 text-muted-foreground"
          />
        </GlassCard>
        <GlassCard className="p-6 lg:col-span-2">
          <h2 className="font-serif text-2xl text-platinum">劇情摘要</h2>
          <EditableText
            as="p"
            multiline
            contentKey={fieldKey("summary")}
            value={enhancedCharacter.summary}
            className="mt-4 block text-sm leading-7 text-muted-foreground"
          />
          <EditableText
            as="p"
            multiline
            contentKey={fieldKey("storyArc")}
            value={enhancedCharacter.storyArc}
            className="mt-3 block text-sm leading-7 text-muted-foreground"
          />
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
