import { z } from "zod";

const questionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1).max(300),
  type: z.enum(["single", "multiple", "text"]),
  options: z.array(z.string().max(120)).optional(),
});

export const surveyCreateSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  questions: z.array(questionSchema).min(1, "至少一題").max(30),
  isActive: z.boolean().default(true),
});

export const surveyRespondSchema = z.object({
  surveyId: z.string().min(1),
  answers: z.record(z.string(), z.union([z.string().max(2000), z.array(z.string().max(200))])),
});

export type SurveyCreateInput = z.infer<typeof surveyCreateSchema>;
