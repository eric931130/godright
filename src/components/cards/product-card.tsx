import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import type { Product } from "@/data/mock/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <GlassCard interactive className="h-full overflow-hidden p-0">
      <div className="image-placeholder relative aspect-[4/3]">
        <div className="absolute left-4 top-4">
          <Badge tone={product.category === "電子書" ? "gold" : "blue"}>
            {product.badge}
          </Badge>
        </div>
        <span className="sr-only">{product.imageAlt}</span>
      </div>
      <div className="p-5">
        <p className="text-xs text-dream-violet">{product.category}</p>
        <h3 className="mt-2 font-serif text-lg font-semibold text-platinum">
          {product.name}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-serif text-lg font-semibold text-divine-gold">
            {product.price}
          </span>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-platinum transition hover:text-divine-gold"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            查看
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
