import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { CharacterForm } from "@/components/admin/character-form";
import { characterService } from "@/services/characterService";

type EditCharacterPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCharacterPage({ params }: EditCharacterPageProps) {
  const { id } = await params;
  const character = await characterService.getById(id);

  if (!character) {
    notFound();
  }

  return (
    <AdminShell
      title={`編輯角色：${character.name}`}
      description="目前共用角色表單與 mock submit；未來會將此頁接到 service.update 與 Supabase update mutation。"
    >
      <CharacterForm />
    </AdminShell>
  );
}
