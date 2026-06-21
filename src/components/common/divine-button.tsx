import Link from "next/link";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DivineButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "gold" | "outline" | "ghost";
  className?: string;
};

export function DivineButton({
  children,
  href,
  variant = "gold",
  className,
}: DivineButtonProps) {
  const classes = cn(
    buttonVariants({
      size: "lg",
      variant: variant === "ghost" ? "ghost" : variant === "outline" ? "outline" : "default",
      className: cn(
        "h-11 rounded-lg px-4 text-sm sm:px-5",
        variant === "gold" &&
          "border-divine-gold/70 bg-divine-gold text-deep-space shadow-[0_0_24px_rgba(217,180,95,0.2)] hover:bg-platinum",
        variant === "outline" &&
          "border-divine-gold/35 bg-deep-space/35 text-platinum hover:bg-divine-gold/10",
        variant === "ghost" && "text-muted-foreground hover:bg-divine-gold/10 hover:text-platinum",
      ),
    }),
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
