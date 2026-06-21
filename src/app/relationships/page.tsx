import Link from "next/link";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { characters, getCharacter } from "@/data/characters";

const relationTypes = ["師徒", "敵對", "血脈", "神魔對立", "勢力歸屬", "命運牽引", "上古封印"] as const;

export default function RelationshipsPage() {
  const relations = characters.flatMap((character) =>
    character.relationships.map((relation) => ({
      source: character,
      target: getCharacter(relation.targetSlug),
      ...relation,
    })),
  );

  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Relationship Map"
        title="角色關係圖"
        description="以前端卡片與神紋連線呈現師徒、敵對、血脈、神魔對立、勢力歸屬與命運牽引。"
      />
      <div className="mt-8 flex flex-wrap gap-2">
        {relationTypes.map((type) => <Badge key={type} tone="purple">{type}</Badge>)}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {relations.map((relation, index) => (
          <GlassCard key={`${relation.source.slug}-${relation.targetSlug}-${index}`} className="p-5">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <CharacterNode slug={relation.source.slug} name={relation.source.name} title={relation.source.title} />
              <div className="flex flex-col items-center gap-2">
                <Badge>{relation.type}</Badge>
                <div className="h-px w-12 bg-divine-gold/45" />
              </div>
              <CharacterNode slug={relation.target?.slug ?? relation.targetSlug} name={relation.target?.name ?? relation.targetSlug} title={relation.target?.title ?? "未知"} />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{relation.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function CharacterNode({ slug, name, title }: { slug: string; name: string; title: string }) {
  return (
    <Link href={`/characters/${slug}`} className="rounded-lg border border-divine-gold/20 bg-deep-space/45 p-3 text-center transition hover:bg-divine-gold/10">
      <div className="font-serif text-lg text-platinum">{name}</div>
      <div className="mt-1 text-xs text-muted-foreground">{title}</div>
    </Link>
  );
}
