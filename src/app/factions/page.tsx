import Link from "next/link";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { factions, getFactionMembers } from "@/data/characters";

export default function FactionsPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle eyebrow="Factions" title="勢力總覽" description="整理三大神殿、星界龍族與主角未定天命勢力。" />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {factions.map((faction) => (
          <Link key={faction.id} href={`/factions/${faction.slug}`}>
            <GlassCard interactive className="h-full p-6">
              <span className="block size-10 rounded-lg border border-platinum/20" style={{ backgroundColor: faction.emblemColor }} />
              <Badge className="mt-4">{faction.type}</Badge>
              <h2 className="mt-3 font-serif text-2xl text-platinum">{faction.name}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{faction.description}</p>
              <p className="mt-4 text-sm text-divine-gold">{getFactionMembers(faction.slug).length} 位成員</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
