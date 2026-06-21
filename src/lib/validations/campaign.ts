import { z } from "zod";

export const campaignCreateSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(400).optional(),
  type: z.enum(["announcement_bar", "popup", "hero_banner", "countdown", "shop_banner"]),
  imageUrl: z.string().optional(),
  mobileImageUrl: z.string().optional(),
  ctaText: z.string().max(40).optional(),
  ctaHref: z.string().optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  isActive: z.boolean().default(true),
  priority: z.number().int().default(0),
  targetPages: z.array(z.string()).optional(),
});

export type CampaignCreateInput = z.infer<typeof campaignCreateSchema>;
