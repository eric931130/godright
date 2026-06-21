import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { ChapterForm } from "@/components/admin/chapter-form";
import { chapterService } from "@/services/chapterService";

type EditChapterPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditChapterPage({ params }: EditChapterPageProps) {
  const { id } = await params;
  const chapter = await chapterService.getById(id);

  if (!chapter) {
    notFound();
  }

  return (
    <AdminShell
      title={`編輯章節：${chapter.title}`}
      description="目前共用章節表單與 mock submit；未來會將此頁接到 service.update 與 Supabase update mutation。"
    >
      <ChapterForm />
    </AdminShell>
  );
}
