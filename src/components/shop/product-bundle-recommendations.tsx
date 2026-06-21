"use client";

import { useEffect, useState } from "react";

import { SectionTitle } from "@/components/common/section-title";
import { BundleCard } from "@/components/shop/bundle-card";
import type { Bundle } from "@/lib/shop/bundle-types";

type Props = {
  productId: string;
  productSlug: string;
};

/** 商品頁推薦：顯示包含此商品的啟用組合包（client fetch，不影響頁面 SSG）。 */
export function ProductBundleRecommendations({ productId, productSlug }: Props) {
  const [bundles, setBundles] = useState<Bundle[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/shop/bundles")
      .then((response) => (response.ok ? response.json() : { bundles: [] }))
      .then((data: { bundles?: Bundle[] }) => {
        if (!active) return;
        const matched = (data.bundles ?? []).filter((bundle) =>
          bundle.productIds.includes(productId) || bundle.productIds.includes(productSlug),
        );
        setBundles(matched);
      })
      .catch(() => {
        if (active) setBundles([]);
      });
    return () => {
      active = false;
    };
  }, [productId, productSlug]);

  if (bundles.length === 0) return null;

  return (
    <section className="py-16">
      <SectionTitle eyebrow="Bundles" title="此商品也在這些組合包中" description="搭配購買更划算。" />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bundles.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </section>
  );
}
