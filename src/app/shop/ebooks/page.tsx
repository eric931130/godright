import { SectionTitle } from "@/components/common/section-title";
import { ShopProductCard } from "@/components/shop/shop-product-card";
import { ebookProducts } from "@/data/shop";

export default function EbooksPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Ebooks"
        title="電子書與小說合集"
        description="包含單卷電子書、篇章合集與收藏版套組，未來可同步到會員數位藏書架。"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ebookProducts.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
