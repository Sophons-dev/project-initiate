import { z } from 'zod';

export const InsightSchema = z.object({
  summary: z.string(), // plain language overview of user career state
  recommendedPaths: z.array(z.string()).min(1).max(10),
  skillsGap: z.object({
    missing: z.array(z.string()),
    priority: z.enum(['high', 'medium', 'low']), // e.g., "high", "medium", "low"
  }),

  strengths: z.object({
    tech: z.array(z.string()),
    soft: z.array(z.string()),
  }),

  interests: z.object({
    industries: z.array(z.string()),
    roles: z.array(z.string()),
  }),

  experienceLevel: z.enum(['entry', 'mid', 'senior']),
  preferredRoles: z.array(z.string()),
});

export type Insight = z.infer<typeof InsightSchema>;
