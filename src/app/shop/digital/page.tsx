import { Badge } from "@/components/common/badge";
import { SectionTitle } from "@/components/common/section-title";
import { ShopProductCard } from "@/components/shop/shop-product-card";
import { digitalProducts, productCategories } from "@/data/shop";

export default function DigitalProductsPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Digital Goods"
        title="數位商品列表"
        description="角色設定集、世界觀資料集、美術圖包、桌布、貼圖展示與未來實體周邊入口。"
      />
      <div className="mt-6 flex flex-wrap gap-2">
        {productCategories.map((category) => (
          <Badge key={category} tone="blue">
            {category}
          </Badge>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {digitalProducts.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
