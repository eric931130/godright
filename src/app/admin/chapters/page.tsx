import { Plus } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { DivineButton } from "@/components/common/divine-button";
import { chapterService } from "@/services/chapterService";

export default async function AdminChaptersPage() {
  const chapters = await chapterService.list();

  return (
    <AdminShell
      title="章節管理"
      description="管理小說章節、免費與付費狀態、價格、發布日期與作者備註。"
      actions={
        <DivineButton href="/admin/chapters/new">
          <Plus className="size-4" />
          新增章節
        </DivineButton>
      }
    >
      <AdminTable
        emptyLabel="尚無章節"
        items={chapters}
        columns={[
          { header: "標題", render: (item) => item.title },
          { header: "所屬卷", render: (item) => item.volume },
          { header: "類型", render: (item) => (item.isFree ? "免費" : "付費") },
          { header: "價格", render: (item) => (item.price ? `NT$ ${item.price}` : "0") },
          { header: "狀態", render: (item) => item.status ?? "published" },
          { header: "發布日期", render: (item) => item.publishedAt },
        ]}
        editHref={(item) => `/admin/chapters/${item.id}`}
      />
    </AdminShell>
  );
}
