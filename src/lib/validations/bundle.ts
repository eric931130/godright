import { z } from "zod";

export const bundleCreateSchema = z.object({
  title: z.string().min(1).max(80),
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/, "slug 僅能使用小寫英數字與連字號。"),
  description: z.string().min(1).max(400),
  productIds: z.array(z.string()).min(1, "至少需要一項成員商品。"),
  bundlePrice: z.number().positive(),
  coverImage: z.string().optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type BundleCreateInput = z.infer<typeof bundleCreateSchema>;
