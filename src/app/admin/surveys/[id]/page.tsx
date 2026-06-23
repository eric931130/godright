import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { GlassCard } from "@/components/common/glass-card";
import { getSurveyResults } from "@/lib/surveys/surveys";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function SurveyResultsPage({ params }: Props) {
  const { id } = await params;
  const { survey, total, breakdown } = await getSurveyResults(id);
  if (!survey) notFound();

  return (
    <AdminShell title={`問卷結果：${survey.title}`} description={`共 ${total} 份回應。`}>
      <div className="grid gap-5">
        {breakdown.map(({ question, optionCounts, textAnswers }) => (
          <GlassCard key={question.id} className="p-5">
            <h2 className="font-serif text-lg font-semibold text-platinum">{question.text}</h2>
            {optionCounts ? (
              <div className="mt-4 grid gap-2">
                {optionCounts.map(({ option, count }) => {
                  const pct = total ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={option}>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{option}</span>
                        <span className="text-platinum">{count}（{pct}%）</span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-deep-space/60">
                        <div className="h-full bg-divine-gold" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 grid gap-2">
                {textAnswers && textAnswers.length > 0 ? (
                  textAnswers.slice(0, 200).map((answer, index) => (
                    <p key={index} className="rounded-lg border border-platinum/10 bg-deep-space/45 px-4 py-2.5 text-sm text-muted-foreground">{answer}</p>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">尚無文字回答。</p>
                )}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </AdminShell>
  );
}
