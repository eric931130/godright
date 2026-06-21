import { SearchX } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "暫無資料",
  description = "內容正在由神諭書庫整理中，請稍後再回來查看。",
}: EmptyStateProps) {
  return (
    <GlassCard className="flex flex-col items-center justify-center p-8 text-center">
      <SearchX className="size-9 text-divine-gold" aria-hidden="true" />
      <h3 className="mt-4 font-serif text-xl font-semibold text-platinum">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </GlassCard>
  );
}
