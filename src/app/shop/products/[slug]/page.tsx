import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, Heart, ShieldCheck, Zap } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { FavoriteButton } from "@/components/account/favorite-button";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { ShopProductCard } from "@/components/shop/shop-product-card";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPrice, getProduct, shopProducts } from "@/data/shop";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { isValidSlug } from "@/lib/validation";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return shopProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return createPageMetadata({
      title: "商品不存在｜神權崩壞商城",
      description: "找不到指定的神權崩壞商品。",
      path: "/shop",
    });
  }
  const product = getProduct(slug);

  if (!product) {
    return createPageMetadata({
      title: "商品不存在｜神權崩壞商城",
      description: "找不到指定的神權崩壞商品。",
      path: `/shop/products/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${product.title}｜電子書商城`,
    description: product.description,
    path: `/shop/products/${product.slug}`,
    keywords: [product.category, product.type, ...product.tags],
    type: "website",
    modifiedTime: product.updatedAt,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    notFound();
  }
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const recommendations = shopProducts
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 3);

  return (
    <div className="site-container py-10 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description,
          category: product.category,
          image: absoluteUrl("/opengraph-image"),
          url: absoluteUrl(`/shop/products/${product.slug}`),
          brand: {
            "@type": "Brand",
            name: "神權崩壞",
          },
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: product.currency,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(`/shop/products/${product.slug}`),
          },
        }}
      />
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="overflow-hidden p-0">
          <div className="image-placeholder relative aspect-[4/3] lg:aspect-[3/4]">
            <div className="seal-ring animate-orbit absolute inset-10 opacity-70" />
            <span className="sr-only">{product.title} 商品主視覺</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            {product.gallery.map((image) => (
              <div key={image} className="image-placeholder aspect-square rounded-lg">
                <span className="sr-only">{image}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{product.category}</Badge>
            {product.isDigital ? <Badge tone="blue">數位下載</Badge> : null}
            {product.isFeatured ? <Badge tone="purple">精選</Badge> : null}
          </div>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-platinum sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {product.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-end gap-3">
            <span className="font-serif text-3xl font-semibold text-divine-gold">
              {formatPrice(product)}
            </span>
            {product.originalPrice ? (
              <span className="text-sm text-muted-foreground line-through">
                NT$ {product.originalPrice.toLocaleString("zh-TW")}
              </span>
            ) : null}
          </div>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <AddToCartButton productId={product.id} className="h-11" />
            <DivineButton href="/checkout" variant="outline">
              <Zap className="size-4" aria-hidden="true" />
              立即購買
            </DivineButton>
            <FavoriteButton
              id={product.id}
              type="product"
              title={product.title}
              href={`/shop/products/${product.slug}`}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 py-16 lg:grid-cols-[1fr_0.8fr]">
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl font-semibold text-platinum">商品規格</h2>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <Spec label="檔案格式" value={product.fileFormat.join(" / ")} />
            <Spec label="下載形式" value={product.downloadType} />
            <Spec label="授權類型" value={product.licenseType} />
            <Spec label="頁數" value={product.pageCount ? `${product.pageCount} 頁` : "非頁面型商品"} />
            <Spec label="字數" value={product.wordCount ?? "不適用"} />
            <Spec label="更新日期" value={product.updatedAt} />
          </dl>
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl font-semibold text-platinum">試讀 / 預覽</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            目前提供前端 mock 預覽區，正式版可接 PDF 試讀、圖片瀏覽器或 DRM 試閱權限。
          </p>
          <div className="mt-5 rounded-lg border border-divine-gold/20 bg-deep-space/45 p-4 text-sm text-platinum/86">
            「當天位神榜裂開，所有角色的命運也開始重新排序。」
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-6 py-16 lg:grid-cols-3">
        <GlassCard className="p-6">
          <BookOpen className="size-5 text-divine-gold" />
          <h2 className="mt-3 font-serif text-xl font-semibold text-platinum">相關章節</h2>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {product.relatedChapters.length ? product.relatedChapters.map((chapter) => <span key={chapter}>{chapter}</span>) : <span>暫無章節關聯</span>}
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <Heart className="size-5 text-divine-gold" />
          <h2 className="mt-3 font-serif text-xl font-semibold text-platinum">相關角色</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.relatedCharacters.map((character) => (
              <Badge key={character} tone="purple">{character}</Badge>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <ShieldCheck className="size-5 text-divine-gold" />
          <h2 className="mt-3 font-serif text-xl font-semibold text-platinum">授權說明</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            本商品授權限個人收藏與閱讀展示，不得轉售、公開散布、訓練模型或商業印製。
          </p>
        </GlassCard>
      </section>

      <section className="py-16">
        <SectionTitle eyebrow="Recommended" title="推薦商品" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {(recommendations.length ? recommendations : shopProducts.slice(0, 3)).map((item) => (
            <ShopProductCard key={item.id} product={item} />
          ))}
        </div>
        <Link className="mt-8 inline-flex text-sm text-divine-gold hover:text-platinum" href="/shop">
          返回商城
        </Link>
      </section>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-platinum/10 bg-deep-space/45 p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-platinum">{value}</dd>
    </div>
  );
}
