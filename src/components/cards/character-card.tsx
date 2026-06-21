import { Sparkles } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import type { Character } from "@/data/mock/characters";

type CharacterCardProps = {
  character: Character;
  featured?: boolean;
};

export function CharacterCard({ character, featured = false }: CharacterCardProps) {
  return (
    <GlassCard
      interactive
      className="grid h-full overflow-hidden p-0 sm:grid-rows-[auto_1fr]"
    >
      <div className="image-placeholder relative aspect-[4/3] overflow-hidden">
        <div className="seal-ring animate-orbit absolute inset-6 opacity-60" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-space via-deep-space/50 to-transparent p-4">
          <Badge tone={featured ? "gold" : "purple"}>{character.rank}</Badge>
        </div>
        <span className="sr-only">{character.imageAlt}</span>
      </div>
      <div className="flex flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-semibold text-platinum">
              {character.name}
            </h3>
            <p className="mt-1 text-sm text-divine-gold">{character.title}</p>
          </div>
          <Sparkles className="size-5 shrink-0 text-dream-violet" aria-hidden="true" />
        </div>
        <p className="mt-3 text-xs text-moon-blue">{character.faction}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {character.description}
        </p>
        <blockquote className="mt-4 border-l border-divine-gold/35 pl-3 text-sm leading-6 text-platinum/86">
          {character.quote}
        </blockquote>
      </div>
    </GlassCard>
  );
}
