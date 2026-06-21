import { z } from "zod";

export const membershipInterestSchema = z.object({
  email: z.email("請輸入有效的電子郵件"),
  displayName: z
    .string()
    .trim()
    .min(2, "名稱至少需要 2 個字")
    .max(40, "名稱不可超過 40 個字"),
  tier: z.enum(["reader", "collector", "oracle"]),
});

export type MembershipInterestInput = z.infer<
  typeof membershipInterestSchema
>;
