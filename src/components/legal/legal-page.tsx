import type { ReactNode } from "react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";

type LegalSection = {
  title: string;
  body: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, updatedAt, intro, sections }: LegalPageProps) {
  return (
    <main className="site-container py-10 sm:py-14">
      <GlassCard className="p-6 sm:p-8">
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-platinum sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-divine-gold">最後更新：{updatedAt}</p>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{intro}</p>
      </GlassCard>

      <article className="mx-auto max-w-4xl py-10">
        <div className="grid gap-5">
          {sections.map((section) => (
            <GlassCard key={section.title} className="p-6">
              <h2 className="font-serif text-2xl font-semibold text-platinum">{section.title}</h2>
              <div className="mt-4 text-sm leading-7 text-muted-foreground">{section.body}</div>
            </GlassCard>
          ))}
        </div>
      </article>
    </main>
  );
}
