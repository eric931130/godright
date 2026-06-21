export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type TableRow = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: TableRow & {
          user_id: string;
          email: string;
          display_name: string | null;
          role: "guest" | "user" | "paid_user" | "vip" | "admin";
          membership_tier: string | null;
        };
        Insert: Partial<TableRow> & {
          user_id: string;
          email: string;
          role?: "guest" | "user" | "paid_user" | "vip" | "admin";
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      volumes: {
        Row: TableRow & {
          slug: string;
          title: string;
          description: string | null;
          sort_order: number | null;
          status: "draft" | "published" | "archived";
        };
        Insert: Partial<TableRow> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["volumes"]["Row"]>;
      };
      chapters: {
        Row: TableRow & {
          volume_id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          is_free: boolean;
          price: number;
          status: "draft" | "published" | "scheduled" | "archived";
          published_at: string | null;
          reading_time: string | null;
          tags: string[];
          author_note: string | null;
        };
        Insert: Partial<TableRow> & {
          volume_id: string;
          slug: string;
          title: string;
          content: string;
        };
        Update: Partial<Database["public"]["Tables"]["chapters"]["Row"]>;
      };
      products: {
        Row: TableRow & {
          slug: string;
          title: string;
          subtitle: string | null;
          description: string;
          price: number;
          original_price: number | null;
          currency: string;
          category: string;
          type: string;
          cover_image: string | null;
          gallery: string[];
          file_format: string[];
          download_type: string;
          license_type: string;
          is_digital: boolean;
          is_featured: boolean;
          status: "draft" | "published" | "archived";
          metadata: Json;
        };
        Insert: Partial<TableRow> & {
          slug: string;
          title: string;
          description: string;
          price: number;
          category: string;
          type: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
      };
      characters: {
        Row: TableRow & {
          slug: string;
          name: string;
          english_name: string | null;
          title: string | null;
          faction_id: string | null;
          role: string;
          race: string | null;
          element: string[];
          color_palette: string[];
          profile: Json;
          status: "draft" | "published" | "archived";
        };
        Insert: Partial<TableRow> & {
          slug: string;
          name: string;
          role: string;
        };
        Update: Partial<Database["public"]["Tables"]["characters"]["Row"]>;
      };
      factions: {
        Row: TableRow & {
          slug: string;
          name: string;
          type: string;
          description: string | null;
          emblem_color: string | null;
          doctrine: string | null;
        };
        Insert: Partial<TableRow> & {
          slug: string;
          name: string;
          type: string;
        };
        Update: Partial<Database["public"]["Tables"]["factions"]["Row"]>;
      };
      lore_entries: {
        Row: TableRow & {
          slug: string;
          title: string;
          category: string;
          faction: string | null;
          element: string | null;
          summary: string | null;
          content: string;
          tags: string[];
          status: "draft" | "published" | "archived";
        };
        Insert: Partial<TableRow> & {
          slug: string;
          title: string;
          category: string;
          content: string;
        };
        Update: Partial<Database["public"]["Tables"]["lore_entries"]["Row"]>;
      };
      orders: {
        Row: TableRow & {
          user_id: string;
          order_number: string;
          status: "pending" | "paid" | "failed" | "refunded";
          total_amount: number;
          currency: string;
          payment_provider: string | null;
          provider_reference: string | null;
        };
        Insert: Partial<TableRow> & {
          user_id: string;
          order_number: string;
          total_amount: number;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Row"]>;
      };
      order_items: {
        Row: TableRow & {
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          subtotal: number;
        };
        Insert: Partial<TableRow> & {
          order_id: string;
          product_id: string;
          unit_price: number;
          subtotal: number;
        };
        Update: Partial<Database["public"]["Tables"]["order_items"]["Row"]>;
      };
      purchases: {
        Row: TableRow & {
          user_id: string;
          product_id: string | null;
          volume_id: string | null;
          chapter_id: string | null;
          order_id: string | null;
          status: "active" | "refunded" | "revoked";
        };
        Insert: Partial<TableRow> & {
          user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["purchases"]["Row"]>;
      };
      chapter_unlocks: {
        Row: TableRow & {
          user_id: string;
          chapter_id: string;
          source: "single_chapter" | "volume_purchase" | "membership" | "admin_grant";
        };
        Insert: Partial<TableRow> & {
          user_id: string;
          chapter_id: string;
          source: "single_chapter" | "volume_purchase" | "membership" | "admin_grant";
        };
        Update: Partial<Database["public"]["Tables"]["chapter_unlocks"]["Row"]>;
      };
      downloads: {
        Row: TableRow & {
          user_id: string;
          product_id: string;
          download_count: number;
          last_downloaded_at: string | null;
          signed_url_expires_at: string | null;
        };
        Insert: Partial<TableRow> & {
          user_id: string;
          product_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["downloads"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
