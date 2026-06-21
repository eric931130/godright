import type { Metadata } from "next";

import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { chapters } from "@/data/novel";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "閱讀紀錄｜會員中心",
  description: "查看神權崩壞閱讀進度、最近閱讀章節與累積閱讀時間。",
  path: "/account/reading",
  keywords: ["閱讀進度", "閱讀紀錄", "最近閱讀"],
});

export default function AccountReadingPage() {
  return (
    <main className="site-container py-10 sm:py-14">
      <SectionTitle eyebrow="Reading" title="閱讀紀錄" description="閱讀頁正式版會記錄開始時間、離開時間、閱讀分鐘數與章節進度百分比。" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Stat label="累積閱讀時間" value="286 分鐘" />
        <Stat label="已讀章節" value="12 章" />
        <Stat label="最近閱讀" value={chapters[7]?.title ?? "尚無"} />
      </div>
      <div className="mt-8 grid gap-4">
        {chapters.slice(0, 6).map((chapter, index) => (
          <GlassCard key={chapter.id} className="p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-divine-gold">{chapter.volume}</p>
                <h2 className="mt-1 text-xl font-semibold text-platinum">{chapter.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground">進度 {Math.min(100, 35 + index * 11)}%</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-platinum">{value}</p>
    </GlassCard>
  );
}
