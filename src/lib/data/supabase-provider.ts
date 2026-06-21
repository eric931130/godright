import type { DataProvider, DownloadRecord } from "@/lib/data/types";

export const supabaseDataProvider: DataProvider = {
  source: "supabase",

  async listVolumes() {
    throw new Error("Supabase volume provider is reserved for the schema migration phase.");
  },

  async listChapters() {
    throw new Error("Supabase chapter provider is reserved for the schema migration phase.");
  },

  async getChapterById() {
    throw new Error("Supabase chapter provider is reserved for the schema migration phase.");
  },

  async listProducts() {
    throw new Error("Supabase product provider is reserved for the schema migration phase.");
  },

  async getProductById() {
    throw new Error("Supabase product provider is reserved for the schema migration phase.");
  },

  async listCharacters() {
    throw new Error("Supabase character provider is reserved for the schema migration phase.");
  },

  async listFactions() {
    throw new Error("Supabase faction provider is reserved for the schema migration phase.");
  },

  async listLoreEntries() {
    throw new Error("Supabase lore provider is reserved for the schema migration phase.");
  },

  async listLocations() {
    throw new Error("Supabase location provider is reserved for the schema migration phase.");
  },

  async listArtifacts() {
    throw new Error("Supabase artifact provider is reserved for the schema migration phase.");
  },

  async listPurchases() {
    throw new Error("Supabase purchase provider is reserved for the schema migration phase.");
  },

  async listChapterUnlocks() {
    throw new Error("Supabase unlock provider is reserved for the schema migration phase.");
  },

  async listDownloads() {
    throw new Error("Supabase download provider is reserved for the schema migration phase.");
  },

  async createDownloadLog(userId, productId) {
    const record: DownloadRecord = {
      id: `pending-${Date.now()}`,
      userId,
      productId,
      fileFormat: "signed-url",
      downloadCount: 1,
      purchasedAt: new Date().toISOString(),
      licenseType: "personal",
    };
    return record;
  },
};
