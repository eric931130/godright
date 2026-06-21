import { LoaderCircle } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "星界資料載入中" }: LoadingStateProps) {
  return (
    <GlassCard className="flex items-center gap-3 p-5 text-sm text-muted-foreground">
      <LoaderCircle className="size-5 animate-spin text-divine-gold" aria-hidden="true" />
      <span>{label}</span>
    </GlassCard>
  );
}
