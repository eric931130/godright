import { newsItems } from "@/data/mock/news";
import { createMockCrudService } from "@/services/mock-crud";

export type NewsPostRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  isPinned: boolean;
  status: "draft" | "published" | "archived";
  tags: string[];
};

const newsRecords: NewsPostRecord[] = newsItems.map((post, index) => ({
  id: post.id,
  slug: post.id,
  title: post.title,
  category: post.category,
  excerpt: post.summary,
  content: `${post.summary}\n\n後續正式 CMS 將支援完整長文、封面圖與置頂設定。`,
  coverImage: `/placeholder/news-${index + 1}.jpg`,
  publishedAt: post.date,
  isPinned: index === 0,
  status: "published",
  tags: [post.category, "官方消息"],
}));

export const newsService = createMockCrudService<NewsPostRecord>(
  newsRecords,
  "news",
);
