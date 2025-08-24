import { string, z } from 'zod';

export const InsightSchema = z.object({
  insights: string().min(1).max(1000),
  potential_field_matches: string().array().min(1).max(10),
  strengths: string().array().min(1).max(10),
  weaknesses: string().array().min(1).max(10),
});

export type Insight = z.infer<typeof InsightSchema>;
