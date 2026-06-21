import Link from "next/link";

import { GlassCard } from "@/components/common/glass-card";
import { getProduct } from "@/data/shop";

type CharacterRelatedContentProps = {
  relatedChapters: string[];
  relatedProducts: string[];
};

export function CharacterRelatedContent({
  relatedChapters,
  relatedProducts,
}: CharacterRelatedContentProps) {
  return (
    <section className="grid gap-6 py-16 lg:grid-cols-2">
      <GlassCard className="p-6">
        <h2 className="font-serif text-2xl text-platinum">相關章節</h2>
        <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
          {relatedChapters.map((chapter) => (
            <span key={chapter}>{chapter}</span>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="p-6">
        <h2 className="font-serif text-2xl text-platinum">相關商品</h2>
        <div className="mt-4 grid gap-3">
          {relatedProducts.map((slug) => {
            const product = getProduct(slug);
            return product ? (
              <Link
                key={slug}
                className="text-sm text-divine-gold hover:text-platinum"
                href={`/shop/products/${slug}`}
              >
                {product.title}
              </Link>
            ) : (
              <span key={slug} className="text-sm text-muted-foreground">
                {slug}
              </span>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
}
