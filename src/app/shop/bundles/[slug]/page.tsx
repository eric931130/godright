import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { ShopProductCard } from "@/components/shop/shop-product-card";
import { BundleAddToCart } from "@/components/shop/bundle-add-to-cart";
import { getProduct } from "@/data/shop";
import { getBundleBySlug } from "@/lib/shop/bundles";
import { bundleSavings } from "@/lib/shop/bundle-types";
import { createPageMetadata } from "@/lib/seo";
import { isValidSlug } from "@/lib/validation";

export const dynamic = "force-dynamic";

type BundlePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BundlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const bundle = isValidSlug(slug) ? await getBundleBySlug(slug) : null;
  if (!bundle) {
    return createPageMetadata({
      title: "組合包不存在｜神權崩壞商城",
      description: "找不到指定的組合包。",
      path: "/shop/bundles",
    });
  }
  return createPageMetadata({
    title: `${bundle.title}｜組合包`,
    description: bundle.description,
    path: `/shop/bundles/${bundle.slug}`,
    keywords: ["組合包", bundle.title],
  });
}

export default async function BundleDetailPage({ params }: BundlePageProps) {
  const { slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const bundle = await getBundleBySlug(slug);
  if (!bundle) notFound();

  const members = bundle.productIds
    .map((idOrSlug) => getProduct(idOrSlug) ?? null)
    .filter((product): product is NonNullable<typeof product> => Boolean(product));
  const memberProductIds = members.map((product) => product.id);
  const savings = bundleSavings(bundle);

  return (
    <div className="site-container py-10 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="overflow-hidden p-0">
          <div className="image-placeholder relative aspect-[16/10]">
            <div className="seal-ring animate-orbit absolute inset-12 opacity-60" />
            <span className="sr-only">{bundle.title} 組合包主視覺</span>
          </div>
        </GlassCard>
        <div className="flex flex-col">
          <Badge tone="gold">組合包</Badge>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-platinum sm:text-5xl">{bundle.title}</h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">{bundle.description}</p>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <span className="font-serif text-3xl font-semibold text-divine-gold">NT$ {bundle.bundlePrice.toLocaleString("zh-TW")}</span>
            {bundle.originalPrice > bundle.bundlePrice ? (
              <span className="text-sm text-muted-foreground line-through">NT$ {bundle.originalPrice.toLocaleString("zh-TW")}</span>
            ) : null}
            {savings > 0 ? <Badge tone="purple">省 NT$ {savings.toLocaleString("zh-TW")}</Badge> : null}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <BundleAddToCart productIds={memberProductIds} />
            <DivineButton href="/cart" variant="outline">前往購物車</DivineButton>
          </div>

          <p className="mt-5 text-xs leading-6 text-muted-foreground">
            註：「整組加入購物車」會將下列成員商品加入購物車（金額為成員小計）；組合優惠價的實際折抵將於正式金流結帳時套用。
          </p>
        </div>
      </section>

      <section className="py-16">
        <SectionTitle eyebrow="Includes" title="組合內容" description={`本組合包含 ${members.length} 件商品。`} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {members.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
