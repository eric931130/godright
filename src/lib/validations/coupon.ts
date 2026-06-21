import { z } from "zod";

export const couponCreateSchema = z.object({
  code: z
    .string()
    .min(2)
    .max(40)
    .regex(/^[A-Za-z0-9_-]+$/, "代碼僅能使用英數字、底線與連字號。"),
  title: z.string().min(1).max(80),
  discountType: z.enum(["percent", "fixed"]),
  discountValue: z.number().positive(),
  appliesTo: z.enum(["all", "products", "ebooks", "chapters", "bundles"]),
  targetIds: z.array(z.string()).optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  usageLimit: z.number().int().positive().optional(),
  perUserLimit: z.number().int().positive().optional(),
  isActive: z.boolean().default(true),
});

export type CouponCreateInput = z.infer<typeof couponCreateSchema>;
