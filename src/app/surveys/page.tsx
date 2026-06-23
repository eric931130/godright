import type { Metadata } from "next";

import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { SurveyFill } from "@/components/surveys/survey-fill";
import { listActiveSurveys } from "@/lib/surveys/surveys";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "問卷調查｜神權崩壞",
  description: "參與《神權崩壞》問卷調查，分享你對劇情、角色、商品與體驗的回饋。",
  path: "/surveys",
  keywords: ["問卷", "使用者回饋", "市場調查", "神權崩壞"],
});

export default async function SurveysPage() {
  const surveys = await listActiveSurveys();

  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle eyebrow="Survey" title="問卷調查" description="你的回饋將協助我們持續打磨七界宇宙的內容與體驗。" />
      {surveys.length === 0 ? (
        <GlassCard className="mt-8 p-6">
          <p className="text-sm leading-7 text-muted-foreground">目前沒有進行中的問卷，敬請期待。</p>
        </GlassCard>
      ) : (
        <div className="mt-8 grid gap-6">
          {surveys.map((survey) => (
            <SurveyFill key={survey.id} survey={survey} />
          ))}
        </div>
      )}
    </div>
  );
}
