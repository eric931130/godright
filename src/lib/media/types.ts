export type MediaCategory =
  | "homepage"
  | "character"
  | "product"
  | "lore"
  | "location"
  | "artifact"
  | "general";

export type SiteContent = {
  id: string;
  key: string;
  title: string;
  description?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  isActive: boolean;
  updatedAt: unknown;
  updatedBy: string;
};

export type MediaAsset = {
  id: string;
  fileName: string;
  filePath: string;
  url: string;
  contentType: string;
  size: number;
  width?: number;
  height?: number;
  alt?: string;
  category: MediaCategory;
  uploadedBy: string;
  createdAt: unknown;
};
