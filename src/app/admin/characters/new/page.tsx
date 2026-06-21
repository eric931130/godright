import { AdminShell } from "@/components/admin/admin-shell";
import { CharacterForm } from "@/components/admin/character-form";

export default function NewCharacterPage() {
  return (
    <AdminShell
      title="新增角色"
      description="建立角色圖鑑資料，保留圖片、關係、章節與商品關聯欄位。"
    >
      <CharacterForm />
    </AdminShell>
  );
}
