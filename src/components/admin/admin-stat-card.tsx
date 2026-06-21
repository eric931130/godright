import type { ReactNode } from "react";

import { GlassCard } from "@/components/common/glass-card";

type AdminStatCardProps = {
  label: string;
  value: string | number;
  detail?: string;
  icon?: ReactNode;
};

export function AdminStatCard({ label, value, detail, icon }: AdminStatCardProps) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-platinum">{value}</p>
        </div>
        {icon ? <div className="rounded-lg bg-divine-gold/10 p-2 text-divine-gold">{icon}</div> : null}
      </div>
      {detail ? <p className="mt-3 text-xs leading-5 text-muted-foreground">{detail}</p> : null}
    </GlassCard>
  );
}
