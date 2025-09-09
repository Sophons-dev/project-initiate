import { z } from 'zod';

export const InsightSchema = z.object({
  summary: z.string(), // plain language overview of user career state
  recommendedPaths: z.array(z.string()).min(1).max(10).optional(),
  skillsGap: z
    .object({
      missing: z.array(z.string()).optional(),
      priority: z.string().optional(), // e.g., "high", "medium", "low"
    })
    .optional(),

  strengths: z
    .object({
      tech: z.array(z.string()).optional(),
      soft: z.array(z.string()).optional(),
    })
    .optional(),

  interests: z
    .object({
      industries: z.array(z.string()).optional(),
      roles: z.array(z.string()).optional(),
    })
    .optional(),

  experienceLevel: z.enum(['entry', 'mid', 'senior']).optional(),
  preferredRoles: z.array(z.string()).optional(),
});

export type Insight = z.infer<typeof InsightSchema>;
