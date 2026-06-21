import { chapters, type Chapter } from "@/data/novel";
import { createMockCrudService } from "@/services/mock-crud";

export type ChapterServiceRecord = Chapter & {
  status?: "draft" | "published" | "scheduled";
};

const chapterRecords: ChapterServiceRecord[] = chapters.map((chapter) => ({
  ...chapter,
  status: "published",
}));

export const chapterService = createMockCrudService<ChapterServiceRecord>(
  chapterRecords,
  "chapter",
);
