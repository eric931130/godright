import { mockOrders } from "@/data/account";
import { createMockCrudService } from "@/services/mock-crud";

export type OrderRecord = {
  id: string;
  slug: string;
  customerName: string;
  customerEmail: string;
  status: "pending" | "paid" | "failed" | "refunded";
  total: number;
  currency: "TWD";
  paymentMethod: string;
  items: string[];
  createdAt: string;
};

const orderRecords: OrderRecord[] = mockOrders.map((order) => ({
  id: order.id,
  slug: order.id.toLowerCase(),
  customerName: "七界讀者",
  customerEmail: "reader@example.com",
  status: order.status === "已付款" ? "paid" : order.status === "處理中" ? "pending" : "failed",
  total: order.total,
  currency: "TWD",
  paymentMethod: "mock_checkout",
  items: order.items,
  createdAt: order.date,
}));

export const orderService = createMockCrudService<OrderRecord>(
  orderRecords,
  "order",
);
