import { SectionTitle } from "@/components/common/section-title";
import { ShopProductCard } from "@/components/shop/shop-product-card";
import { getProduct, type EbookProductExtra } from "@/data/shop";

export function RelatedBundle({ ebook }: { ebook: EbookProductExtra }) {
  const products = (ebook.recommendedProductSlugs ?? [])
    .map((slug) => getProduct(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  if (!products.length) return null;

  return (
    <section className="py-16">
      <SectionTitle eyebrow="Bundle" title="推薦搭配" description="搭配設定集、桌布與貼圖，組成你的專屬收藏。" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {products.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
