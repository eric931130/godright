import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  interactive?: boolean;
};

export function GlassCard({
  className,
  interactive = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel gold-border rounded-lg",
        interactive &&
          "transition duration-300 hover:-translate-y-1 hover:border-divine-gold/45 hover:shadow-[0_24px_80px_rgba(109,77,255,0.18)]",
        className,
      )}
      {...props}
    />
  );
}
