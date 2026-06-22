import { BookOpen, FileText, Sparkles } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { FavoriteButton } from "@/components/account/favorite-button";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { EditableText } from "@/components/dev/editable-text";
import { formatPrice, type ShopProduct } from "@/data/shop";

export function EbookHero({ product }: { product: ShopProduct }) {
  const ebook = product.ebook;
  if (!ebook) return null;

  return (
    <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <GlassCard className="overflow-hidden p-0">
        <div className="image-placeholder relative aspect-[3/4]">
          <div className="seal-ring animate-orbit absolute inset-12 opacity-70" />
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-deep-space/80 px-3 py-1 text-xs text-divine-gold ring-1 ring-divine-gold/40">
            <Sparkles className="size-3.5" aria-hidden="true" />
            電子書
          </div>
          <span className="sr-only">{product.title} 書封</span>
        </div>
      </GlassCard>

      <div className="flex flex-col">
        {ebook.tagline ? (
          <EditableText
            as="p"
            contentKey={`product.${product.slug}.ebook.tagline`}
            value={ebook.tagline}
            className="block text-sm uppercase tracking-[0.22em] text-divine-gold"
          />
        ) : null}
        <EditableText
          as="h1"
          contentKey={`product.${product.slug}.title`}
          value={product.title}
          className="mt-3 block font-serif text-4xl font-semibold leading-tight text-platinum sm:text-5xl"
        />
        <EditableText
          as="p"
          multiline
          contentKey={`product.${product.slug}.subtitle`}
          value={product.subtitle}
          className="mt-4 block text-lg leading-8 text-muted-foreground"
        />

        <div className="mt-5 flex flex-wrap gap-2">
          {ebook.fileFormats.map((format) => (
            <Badge key={format} tone="blue">{format}</Badge>
          ))}
          {ebook.pageCount ? (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-platinum/15 px-2.5 py-1 text-xs text-muted-foreground">
              <FileText className="size-3.5" aria-hidden="true" />
              {ebook.pageCount} 頁
            </span>
          ) : null}
          {ebook.wordCount ? (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-platinum/15 px-2.5 py-1 text-xs text-muted-foreground">
              <BookOpen className="size-3.5" aria-hidden="true" />
              約 {Math.round(ebook.wordCount / 10000)} 萬字
            </span>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap items-end gap-3">
          <span className="font-serif text-3xl font-semibold text-divine-gold">{formatPrice(product)}</span>
          {product.originalPrice ? (
            <span className="text-sm text-muted-foreground line-through">
              NT$ {product.originalPrice.toLocaleString("zh-TW")}
            </span>
          ) : null}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <AddToCartButton productId={product.id} className="h-11" />
          <DivineButton href="/checkout" variant="outline">立即購買</DivineButton>
          <FavoriteButton
            id={product.id}
            type="product"
            title={product.title}
            href={`/shop/products/${product.slug}`}
          />
        </div>
      </div>
    </section>
  );
}
