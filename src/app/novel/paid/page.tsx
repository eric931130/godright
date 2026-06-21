import { CreditCard, Database, LockKeyhole, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { paidChapters } from "@/data/novel";

const steps = [
  {
    title: "目前 mock",
    icon: LockKeyhole,
    text: "點擊閱讀頁的解鎖章節會把章節 id 存入 localStorage，模擬已解鎖。",
  },
  {
    title: "會員權限",
    icon: ShieldCheck,
    text: "未來由 Supabase Auth 與 user_unlocks table 判斷單章、整卷或訂閱解鎖。",
  },
  {
    title: "金流付款",
    icon: CreditCard,
    text: "付款成功後建立 purchases 紀錄，再建立對應 unlocks，前端重新驗證權限。",
  },
  {
    title: "資料同步",
    icon: Database,
    text: "閱讀進度、書籤與書架會從 localStorage 升級為 profiles 關聯資料表。",
  },
];

export default function PaidNovelPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <GlassCard className="p-6 sm:p-8">
        <Badge tone="purple">Premium Chapters</Badge>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-platinum sm:text-5xl">
          付費章節說明
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          付費章節目前以前端 mock 呈現鎖定狀態。未解鎖時只顯示神紋封印、章節簡介、
          價格與解鎖 CTA，不會顯示完整正文。
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <DivineButton href="/novel">返回小說總覽</DivineButton>
          <DivineButton href="/bookshelf" variant="outline">
            查看我的書架
          </DivineButton>
        </div>
      </GlassCard>

      <section className="py-16">
        <SectionTitle
          eyebrow="Unlock Flow"
          title="解鎖流程預留"
          description="現在先用 localStorage 模擬，未來可以直接替換為 Supabase 權限查詢與金流 callback。"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <GlassCard key={step.title} className="h-full p-5">
                <Icon className="size-6 text-divine-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-xl font-semibold text-platinum">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.text}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="py-16">
        <SectionTitle eyebrow="Premium List" title="目前付費章節" />
        <div className="mt-8 grid gap-3">
          {paidChapters.map((chapter) => (
            <GlassCard key={chapter.id} className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-moon-blue">{chapter.volume}</p>
                  <h2 className="mt-1 font-serif text-lg font-semibold text-platinum">
                    {chapter.title}
                  </h2>
                </div>
                <span className="font-serif text-lg font-semibold text-divine-gold">
                  NT$ {chapter.price}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
