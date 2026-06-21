import { z } from "zod";

export const inquiryCreateSchema = z.object({
  name: z.string().min(1, "請輸入姓名").max(80),
  email: z.email("請輸入有效的電子郵件"),
  organization: z.string().max(120).optional(),
  inquiryType: z.enum(["illustration", "sticker", "video", "ebook", "merch", "lecture", "license", "other"]),
  message: z.string().min(5, "請描述合作內容").max(2000),
});

export type InquiryCreateInput = z.infer<typeof inquiryCreateSchema>;
