import { CheckCircle2, Download } from "lucide-react";

import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";

export default function OrderSuccessPage() {
  return (
    <div className="site-container flex min-h-[calc(100svh-4rem)] items-center py-16">
      <GlassCard className="mx-auto max-w-2xl p-8 text-center">
        <CheckCircle2 className="mx-auto size-14 text-divine-gold" />
        <h1 className="mt-5 font-serif text-4xl font-semibold text-platinum">
          購買成功
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          這是 mock checkout 成功頁。正式串接金流後，會由付款 callback 建立訂單、
          購買紀錄與下載權限。
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <DivineButton href="/account/downloads">
            <Download className="size-4" />
            查看我的下載
          </DivineButton>
          <DivineButton href="/shop" variant="outline">
            返回商城
          </DivineButton>
        </div>
      </GlassCard>
    </div>
  );
}
