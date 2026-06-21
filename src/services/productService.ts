import { shopProducts, type ShopProduct } from "@/data/shop";
import { createMockCrudService } from "@/services/mock-crud";

export type ProductServiceRecord = ShopProduct & {
  status?: "draft" | "published" | "archived";
};

const productRecords: ProductServiceRecord[] = shopProducts.map((product) => ({
  ...product,
  status: "published",
}));

export const productService = createMockCrudService<ProductServiceRecord>(
  productRecords,
  "product",
);
