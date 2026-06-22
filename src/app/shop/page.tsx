import Link from "next/link";
import { BookOpen, Download, Package, ShoppingCart, Sparkles } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { ShopProductCard } from "@/components/shop/shop-product-card";
import { EditableImage } from "@/components/dev/editable-image";
import { featuredProducts, productCategories, shopProducts } from "@/data/shop";
import { getContentOverrides, resolveImage } from "@/lib/site-content/content-overrides";

// ISR：定期重讀站台內容覆蓋，讓 GM 編輯結果於 60 秒內生效。
export const revalidate = 60;

export default async function ShopPage() {
  const overrides = await getContentOverrides();

  return (
    <div className="site-container py-10 sm:py-14">
      <GlassCard className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1fr_24rem]">
          <div className="p-6 sm:p-10">
            <Badge>Digital Store</Badge>
            <h1 className="mt-4 font-serif text-4xl font-semibold text-platinum sm:text-6xl">
              電子書商城與數位商品
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              收藏《神權崩壞》的電子書、設定集、美術圖包、桌布、貼圖展示與資料集。
              第一版使用前端購物車與 mock checkout，未來可接金流與會員下載庫。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <DivineButton href="/shop/ebooks">
                <BookOpen className="size-5" aria-hidden="true" />
                電子書列表
              </DivineButton>
              <DivineButton href="/shop/digital" variant="outline">
                <Download className="size-5" aria-hidden="true" />
                數位商品
              </DivineButton>
              <DivineButton href="/shop/bundles" variant="outline">
                <Package className="size-5" aria-hidden="true" />
                組合包
              </DivineButton>
              <DivineButton href="/cart" variant="outline">
                <ShoppingCart className="size-5" aria-hidden="true" />
                購物車
              </DivineButton>
            </div>
          </div>
          <EditableImage
            contentKey="shop.hero.banner"
            value={resolveImage(overrides, "shop.hero.banner")}
            className="min-h-72"
            alt="商城主視覺"
          >
            <div className="seal-ring animate-orbit absolute inset-10 opacity-70" />
            <Sparkles className="absolute bottom-8 right-8 size-10 text-divine-gold" />
          </EditableImage>
        </div>
      </GlassCard>

      <section className="py-16">
        <SectionTitle
          eyebrow="Categories"
          title="商品分類"
          description="支援電子書、設定集、圖包、桌布、貼圖與未來實體周邊預留。"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category) => (
            <Link key={category} href="/shop/digital">
              <GlassCard interactive className="p-4 text-sm text-platinum">
                {category}
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16">
        <SectionTitle
          eyebrow="Featured"
          title="精選商品"
          action={<DivineButton href="/shop/digital" variant="outline">查看全部</DivineButton>}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.slice(0, 4).map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="py-16">
        <SectionTitle eyebrow="All Products" title="全部商品預覽" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {shopProducts.slice(0, 8).map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
