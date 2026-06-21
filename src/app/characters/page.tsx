import { CharacterBrowser } from "@/components/characters/character-browser";
import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { characters } from "@/data/characters";

export default function CharactersPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <GlassCard className="p-6 sm:p-8">
        <Badge>Character Codex</Badge>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-platinum sm:text-6xl">
          角色圖鑑
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
          查詢主角群、三殿九尊、神龍、勢力、位階與相關商品。第一版使用前端 mock data，
          後續可接 Supabase 搜尋與篩選。
        </p>
        <div className="mt-6 text-sm text-divine-gold">目前收錄 {characters.length} 位角色</div>
      </GlassCard>
      <section className="py-16">
        <SectionTitle eyebrow="Search & Filter" title="角色搜尋與篩選" />
        <CharacterBrowser />
      </section>
    </div>
  );
}
