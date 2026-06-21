import { AdminShell } from "@/components/admin/admin-shell";
import { ChapterForm } from "@/components/admin/chapter-form";

export default function NewChapterPage() {
  return (
    <AdminShell
      title="新增章節"
      description="使用 React Hook Form 與 Zod 驗證章節欄位；提交目前為 mock，未來可接 Supabase create mutation。"
    >
      <ChapterForm />
    </AdminShell>
  );
}
