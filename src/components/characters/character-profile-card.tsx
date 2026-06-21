import Link from "next/link";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import type { CharacterProfile } from "@/data/characters";

export function CharacterProfileCard({ character }: { character: CharacterProfile }) {
  return (
    <Link href={`/characters/${character.slug}`}>
      <GlassCard interactive className="h-full overflow-hidden p-0">
        <div className="image-placeholder relative aspect-[4/3]">
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <Badge>{character.powerRank}</Badge>
            <Badge tone="purple">{character.role}</Badge>
          </div>
        </div>
        <div className="p-5">
          <h2 className="font-serif text-xl font-semibold text-platinum">
            {character.name}
          </h2>
          <p className="mt-1 text-sm text-divine-gold">{character.title}</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground line-clamp-3">
            {character.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {character.element.slice(0, 2).map((item) => (
              <span key={item} className="rounded-md bg-platinum/10 px-2 py-1 text-xs text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
