import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import type { EnhancedCharacter } from "@/lib/characters/enhanced-character";

type CharacterInfoPanelProps = {
  character: EnhancedCharacter;
};

export function CharacterInfoPanel({ character }: CharacterInfoPanelProps) {
  return (
    <GlassCard className="p-6">
      <h2 className="font-serif text-2xl text-platinum">角色資訊</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Info label="角色身分" value={character.identity} />
        <Info label="界域" value={character.realm} />
        <Info label="勢力" value={character.faction} />
        <Info label="角色定位" value={character.role} />
        <Info label="武器" value={character.weapon.name} />
        <Info label={`${character.divineBeast.type}`} value={character.divineBeast.name} />
        <Info label="種族" value={character.race} />
        <Info label="初登場" value={character.firstAppearance} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {character.abilities.map((ability) => (
          <Badge key={ability}>{ability}</Badge>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {character.colorPalette.map((color) => (
          <span
            key={color}
            aria-label={color}
            className="size-8 rounded-lg border border-platinum/20"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </GlassCard>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-platinum/10 bg-deep-space/45 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-platinum">{value}</p>
    </div>
  );
}
