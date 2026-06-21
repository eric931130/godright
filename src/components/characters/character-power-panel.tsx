import { GlassCard } from "@/components/common/glass-card";
import type { EnhancedCharacter } from "@/lib/characters/enhanced-character";

type CharacterPowerPanelProps = {
  character: EnhancedCharacter;
};

export function CharacterPowerPanel({ character }: CharacterPowerPanelProps) {
  const entries = [
    { title: "戰力位階", value: character.powerRank, body: "天位神榜記錄的公開位階，部分禁忌力量可能未列入。" },
    { title: "神器", value: character.artifact.name, body: character.artifact.description },
    { title: "武器", value: character.weapon.name, body: character.weapon.description },
    { title: character.divineBeast.type, value: character.divineBeast.name, body: character.divineBeast.description },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {entries.map((entry) => (
        <GlassCard key={entry.title} className="p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-divine-gold/80">{entry.title}</p>
          <h3 className="mt-2 font-serif text-xl text-platinum">{entry.value}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{entry.body}</p>
        </GlassCard>
      ))}
    </div>
  );
}
