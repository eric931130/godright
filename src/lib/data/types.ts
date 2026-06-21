import type { CharacterProfile, Faction } from "@/data/characters";
import type { ArtifactEntry, LocationEntry, LoreEntry } from "@/data/lore";
import type { Chapter, Purchase, UserUnlock, Volume } from "@/data/novel";
import type { ShopProduct } from "@/data/shop";

export type DataSource = "mock" | "supabase";

export type DownloadRecord = {
  id: string;
  userId: string;
  productId: string;
  fileFormat: string;
  downloadCount: number;
  purchasedAt: string;
  licenseType: string;
};

export type DataProvider = {
  source: DataSource;
  listVolumes(): Promise<Volume[]>;
  listChapters(): Promise<Chapter[]>;
  getChapterById(chapterId: string): Promise<Chapter | null>;
  listProducts(): Promise<ShopProduct[]>;
  getProductById(productId: string): Promise<ShopProduct | null>;
  listCharacters(): Promise<CharacterProfile[]>;
  listFactions(): Promise<Faction[]>;
  listLoreEntries(): Promise<LoreEntry[]>;
  listLocations(): Promise<LocationEntry[]>;
  listArtifacts(): Promise<ArtifactEntry[]>;
  listPurchases(userId: string): Promise<Purchase[]>;
  listChapterUnlocks(userId: string): Promise<UserUnlock[]>;
  listDownloads(userId: string): Promise<DownloadRecord[]>;
  createDownloadLog(userId: string, productId: string): Promise<DownloadRecord>;
};
