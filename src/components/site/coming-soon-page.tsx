import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { buttonVariants } from "@/components/ui/button";

type ComingSoonPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly string[];
};

export function ComingSoonPage({
  eyebrow,
  title,
  description,
  items,
}: ComingSoonPageProps) {
  return (
    <section className="site-container flex min-h-[calc(100svh-4rem)] items-center py-16">
      <GlassCard className="w-full p-6 sm:p-10">
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-5 font-serif text-3xl font-semibold text-platinum sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          {description}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-lg border border-platinum/10 bg-deep-space/45 p-4 text-sm leading-6 text-muted-foreground"
            >
              <Sparkles
                className="mt-1 size-4 shrink-0 text-divine-gold"
                aria-hidden="true"
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
            className:
              "mt-8 border-divine-gold/35 bg-deep-space/40 text-platinum hover:bg-divine-gold/10",
          })}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          回到首頁
        </Link>
      </GlassCard>
    </section>
  );
}
