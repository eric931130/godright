import { notFound } from "next/navigation";

import { CharacterProfileCard } from "@/components/characters/character-profile-card";
import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { factions, getFaction, getFactionMembers } from "@/data/characters";

type FactionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return factions.map((faction) => ({ slug: faction.slug }));
}

export default async function FactionPage({ params }: FactionPageProps) {
  const { slug } = await params;
  const faction = getFaction(slug);

  if (!faction) {
    notFound();
  }

  const members = getFactionMembers(faction.slug);

  return (
    <div className="site-container py-10 sm:py-14">
      <GlassCard className="p-6 sm:p-8">
        <span className="block size-12 rounded-lg border border-platinum/20" style={{ backgroundColor: faction.emblemColor }} />
        <Badge className="mt-5">{faction.type}</Badge>
        <h1 className="mt-4 font-serif text-4xl text-platinum sm:text-6xl">{faction.name}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{faction.description}</p>
        <p className="mt-5 border-l border-divine-gold/35 pl-4 text-sm text-platinum/90">{faction.doctrine}</p>
      </GlassCard>

      <section className="py-16">
        <SectionTitle eyebrow="Members" title="勢力成員" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {members.map((member) => <CharacterProfileCard key={member.id} character={member} />)}
        </div>
      </section>
      <DivineButton href="/factions" variant="outline">返回勢力總覽</DivineButton>
    </div>
  );
}
