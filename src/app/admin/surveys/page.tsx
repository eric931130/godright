import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { SurveyForm } from "@/components/admin/survey-form";
import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { listSurveys } from "@/lib/surveys/surveys";

export const dynamic = "force-dynamic";

export default async function AdminSurveysPage() {
  const surveys = await listSurveys();

  return (
    <AdminShell title="問卷系統" description="建立並發放市場 / 使用者回饋問卷，前台填寫後可在此查看結果。">
      <SurveyForm />

      <GlassCard className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-divine-gold/20 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3">標題</th>
              <th className="px-4 py-3 text-right">題數</th>
              <th className="px-4 py-3">狀態</th>
              <th className="px-4 py-3 text-right">結果</th>
            </tr>
          </thead>
          <tbody>
            {surveys.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">尚無問卷（或 Firebase 環境未設定）。</td></tr>
            ) : (
              surveys.map((survey) => (
                <tr key={survey.id} className="border-b border-platinum/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-platinum">{survey.title}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{survey.questions.length}</td>
                  <td className="px-4 py-3"><Badge tone={survey.isActive ? "gold" : "purple"}>{survey.isActive ? "發放中" : "已關閉"}</Badge></td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/surveys/${survey.id}`} className="text-sm text-divine-gold hover:text-platinum">查看結果 →</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </GlassCard>
    </AdminShell>
  );
}
