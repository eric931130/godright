import { mockDataProvider } from "@/lib/data/mock-provider";
import { supabaseDataProvider } from "@/lib/data/supabase-provider";
import type { DataProvider, DataSource } from "@/lib/data/types";

export function getDataSource(): DataSource {
  return process.env.NEXT_PUBLIC_DATA_SOURCE === "supabase" ? "supabase" : "mock";
}

export function getDataProvider(): DataProvider {
  return getDataSource() === "supabase" ? supabaseDataProvider : mockDataProvider;
}
