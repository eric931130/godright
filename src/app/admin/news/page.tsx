import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { NewsForm } from "@/components/admin/news-form";
import { newsService } from "@/services/newsService";

export default async function AdminNewsPage() {
  const posts = await newsService.list();

  return (
    <AdminShell
      title="最新消息管理"
      description="管理公告、章節更新、商品消息與活動消息，支援置頂與發布狀態欄位。"
    >
      <AdminTable
        emptyLabel="尚無消息"
        items={posts}
        columns={[
          { header: "標題", render: (item) => item.title },
          { header: "分類", render: (item) => item.category },
          { header: "發布日期", render: (item) => item.publishedAt },
          { header: "置頂", render: (item) => (item.isPinned ? "是" : "否") },
          { header: "狀態", render: (item) => item.status },
        ]}
      />
      <NewsForm />
    </AdminShell>
  );
}
