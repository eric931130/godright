import { characters, factions } from "@/data/characters";
import { artifacts, locations, loreEntries } from "@/data/lore";
import { chapters, volumes, type Purchase, type UserUnlock } from "@/data/novel";
import { shopProducts } from "@/data/shop";
import type { DataProvider, DownloadRecord } from "@/lib/data/types";

const mockPurchases: Purchase[] = [
  {
    id: "purchase-mock-volume-1",
    userId: "mock-paid",
    targetType: "volume",
    targetId: "seven-realms-throne",
    amount: 220,
    currency: "TWD",
    status: "paid",
    purchasedAt: "2026-06-20",
  },
  {
    id: "purchase-mock-product-1",
    userId: "mock-paid",
    targetType: "ebook",
    targetId: "prod-ebook-01",
    amount: 180,
    currency: "TWD",
    status: "paid",
    purchasedAt: "2026-06-18",
  },
];

const mockUnlocks: UserUnlock[] = [
  {
    id: "unlock-mock-chapter-9",
    userId: "mock-paid",
    chapterId: "ch-009",
    unlockedAt: "2026-06-20",
    source: "single_chapter",
  },
];

const mockDownloads: DownloadRecord[] = [
  {
    id: "download-mock-1",
    userId: "mock-paid",
    productId: "prod-ebook-01",
    fileFormat: "EPUB / PDF",
    downloadCount: 2,
    purchasedAt: "2026-06-18",
    licenseType: "personal",
  },
];

export const mockDataProvider: DataProvider = {
  source: "mock",

  async listVolumes() {
    return volumes;
  },

  async listChapters() {
    return chapters;
  },

  async getChapterById(chapterId) {
    return chapters.find((chapter) => chapter.id === chapterId) ?? null;
  },

  async listProducts() {
    return shopProducts;
  },

  async getProductById(productId) {
    return shopProducts.find((product) => product.id === productId) ?? null;
  },

  async listCharacters() {
    return characters;
  },

  async listFactions() {
    return factions;
  },

  async listLoreEntries() {
    return loreEntries;
  },

  async listLocations() {
    return locations;
  },

  async listArtifacts() {
    return artifacts;
  },

  async listPurchases(userId) {
    return mockPurchases.filter((purchase) => purchase.userId === userId);
  },

  async listChapterUnlocks(userId) {
    return mockUnlocks.filter((unlock) => unlock.userId === userId);
  },

  async listDownloads(userId) {
    return mockDownloads.filter((download) => download.userId === userId);
  },

  async createDownloadLog(userId, productId) {
    const product = shopProducts.find((item) => item.id === productId);
    const existing = mockDownloads.find(
      (download) => download.userId === userId && download.productId === productId,
    );

    if (existing) {
      existing.downloadCount += 1;
      return existing;
    }

    const record: DownloadRecord = {
      id: `download-${Date.now()}`,
      userId,
      productId,
      fileFormat: product?.fileFormat.join(" / ") ?? "數位檔案",
      downloadCount: 1,
      purchasedAt: new Date().toISOString(),
      licenseType: product?.licenseType ?? "personal",
    };

    mockDownloads.push(record);
    return record;
  },
};
