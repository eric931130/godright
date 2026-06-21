import Link from "next/link";
import { Eye } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { formatPrice, type ShopProduct } from "@/data/shop";

type ShopProductCardProps = {
  product: ShopProduct;
};

export function ShopProductCard({ product }: ShopProductCardProps) {
  return (
    <GlassCard interactive className="h-full overflow-hidden p-0">
      <Link href={`/shop/products/${product.slug}`} className="block">
        <div className="image-placeholder relative aspect-[4/3]">
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Badge tone={product.isFeatured ? "gold" : "blue"}>{product.category}</Badge>
            {product.originalPrice ? <Badge tone="purple">優惠</Badge> : null}
          </div>
          <span className="sr-only">{product.title} 主視覺預留位置</span>
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs text-moon-blue">{product.type}</p>
        <Link href={`/shop/products/${product.slug}`}>
          <h3 className="mt-2 font-serif text-xl font-semibold text-platinum transition hover:text-divine-gold">
            {product.title}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {product.subtitle}
        </p>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="font-serif text-xl font-semibold text-divine-gold">
              {formatPrice(product)}
            </p>
            {product.originalPrice ? (
              <p className="text-xs text-muted-foreground line-through">
                NT$ {product.originalPrice.toLocaleString("zh-TW")}
              </p>
            ) : null}
          </div>
          <Link
            href={`/shop/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-platinum"
          >
            <Eye className="size-4" aria-hidden="true" />
            詳情
          </Link>
        </div>
        <AddToCartButton productId={product.id} className="mt-5 w-full" />
      </div>
    </GlassCard>
  );
}
