import type { MetadataRoute } from "next";

import { artifacts, locations, loreEntries } from "@/data/lore";
import { characters, factions } from "@/data/characters";
import { chapters, volumes } from "@/data/novel";
import { shopProducts } from "@/data/shop";
import { newsItems } from "@/data/mock/news";
import { absoluteUrl } from "@/lib/seo";
import { listActiveBundles } from "@/lib/shop/bundles";

const staticRoutes = [
  "/",
  "/novel",
  "/novel/paid",
  "/shop",
  "/shop/ebooks",
  "/shop/digital",
  "/shop/bundles",
  "/characters",
  "/rankings",
  "/rankings/characters",
  "/relationships",
  "/factions",
  "/lore",
  "/timeline",
  "/map",
  "/locations",
  "/artifacts",
  "/hall",
  "/news",
  "/newsletter",
  "/collaboration",
  "/press-kit",
  "/terms",
  "/privacy",
  "/refund",
  "/copyright",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.75,
  }));

  for (const volume of volumes) {
    entries.push({
      url: absoluteUrl(`/novel/${volume.slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  for (const chapter of chapters) {
    entries.push({
      url: absoluteUrl(`/novel/${chapter.volumeSlug}/${chapter.slug}`),
      lastModified: chapter.publishedAt,
      changeFrequency: "monthly",
      priority: chapter.isFree ? 0.8 : 0.55,
    });
  }

  for (const product of shopProducts) {
    entries.push({
      url: absoluteUrl(`/shop/products/${product.slug}`),
      lastModified: product.updatedAt,
      changeFrequency: "weekly",
      priority: product.isFeatured ? 0.85 : 0.65,
    });
  }

  for (const character of characters) {
    entries.push({
      url: absoluteUrl(`/characters/${character.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const faction of factions) {
    entries.push({
      url: absoluteUrl(`/factions/${faction.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const entry of loreEntries) {
    entries.push({
      url: absoluteUrl(`/lore/${entry.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const location of locations) {
    entries.push({
      url: absoluteUrl(`/locations/${location.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const artifact of artifacts) {
    entries.push({
      url: absoluteUrl(`/artifacts/${artifact.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: artifact.merchReady ? 0.65 : 0.55,
    });
  }

  for (const item of newsItems) {
    entries.push({
      url: absoluteUrl(`/news#${item.id}`),
      lastModified: item.date,
      changeFrequency: "weekly",
      priority: 0.55,
    });
  }

  const bundles = await listActiveBundles();
  for (const bundle of bundles) {
    entries.push({
      url: absoluteUrl(`/shop/bundles/${bundle.slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return entries;
}
