import Link from "next/link";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { realms } from "@/data/lore";

export default function MapPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Seven Realms Map"
        title="七界地圖"
        description="概念式互動地圖，以界域卡片呈現主要勢力、代表角色、重要場地與神權影響度。"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {realms.map((realm) => (
          <Link key={realm.id} href="/locations">
            <GlassCard interactive className="relative min-h-72 overflow-hidden p-6">
              <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 30%, ${realm.color}, transparent 60%)` }} />
              <div className="relative">
                <Badge>{realm.dangerLevel} 危險</Badge>
                <h2 className="mt-4 font-serif text-3xl text-platinum">{realm.name}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{realm.description}</p>
                <div className="mt-5 grid gap-2 text-sm text-muted-foreground">
                  <span>主要勢力：{realm.dominantFaction}</span>
                  <span>代表角色：{realm.representativeCharacters.join("、")}</span>
                  <span>重要場地：{realm.importantLocations.join("、")}</span>
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                    <span>神權影響度</span>
                    <span>{realm.divineInfluence}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-platinum/10">
                    <div className="h-full rounded-full bg-divine-gold" style={{ width: `${realm.divineInfluence}%` }} />
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
