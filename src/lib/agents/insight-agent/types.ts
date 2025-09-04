import { z } from 'zod';

export const InsightSchema = z.object({
  insights: z.string(),
  potential_field_matches: z.array(z.string()).min(1).max(10),
  location: z.string(),
  strengths: z.array(z.string()).min(1).max(10),
  weaknesses: z.array(z.string()).min(1).max(10),
});

export type Insight = z.infer<typeof InsightSchema>;
