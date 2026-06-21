import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { orderService } from "@/services/orderService";

export default async function AdminOrdersPage() {
  const orders = await orderService.list();

  return (
    <AdminShell
      title="訂單管理"
      description="查看 mock checkout 產生的訂單資料。未來金流 webhook 會更新付款狀態與購買權限。"
    >
      <AdminTable
        emptyLabel="尚無訂單"
        items={orders}
        columns={[
          { header: "訂單編號", render: (item) => item.id },
          { header: "顧客", render: (item) => item.customerEmail },
          { header: "狀態", render: (item) => item.status },
          { header: "金額", render: (item) => `NT$ ${item.total}` },
          { header: "付款", render: (item) => item.paymentMethod },
          { header: "建立日期", render: (item) => item.createdAt },
        ]}
      />
    </AdminShell>
  );
}
