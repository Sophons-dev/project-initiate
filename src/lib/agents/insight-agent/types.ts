import { z } from 'zod';

export const InsightSchema = z.object({
  summary: z.string(), // plain language overview of user career state
  recommendedPaths: z.array(z.string()).min(1).max(10).nullable().default(null),
  skillsGap: z
    .object({
      missing: z.array(z.string()).nullable().default(null),
      priority: z.string().nullable().default(null), // e.g., "high", "medium", "low"
    })
    .nullable()
    .default(null),

  strengths: z
    .object({
      tech: z.array(z.string()).nullable().default(null),
      soft: z.array(z.string()).nullable().default(null),
    })
    .nullable()
    .default(null),

  interests: z
    .object({
      industries: z.array(z.string()).nullable().default(null),
      roles: z.array(z.string()).nullable().default(null),
    })
    .nullable()
    .default(null),

  experienceLevel: z.enum(['entry', 'mid', 'senior']).nullable().default(null),
  preferredRoles: z.array(z.string()).nullable().default(null),
});

export type Insight = z.infer<typeof InsightSchema>;
