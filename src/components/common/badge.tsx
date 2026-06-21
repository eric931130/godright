import type { ReactNode } from "react";

import { Badge as UiBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "purple" | "blue";
};

export function Badge({ children, className, tone = "gold" }: BadgeProps) {
  const toneClass = {
    gold: "border-divine-gold/35 bg-divine-gold/10 text-divine-gold",
    purple: "border-dream-violet/35 bg-dream-violet/10 text-dream-violet",
    blue: "border-moon-blue/35 bg-moon-blue/10 text-moon-blue",
  }[tone];

  return (
    <UiBadge variant="outline" className={cn("rounded-md", toneClass, className)}>
      {children}
    </UiBadge>
  );
}
