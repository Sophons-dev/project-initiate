import { z } from 'zod';

export const RecommendationSchema = z.object({
  type: z.enum(['JOB', 'COURSE', 'SCHOLARSHIP', 'EVENT']),

  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  matchReason: z.string(),

  organization: z.object({
    name: z.string(),
    type: z.enum(['company', 'university', 'bootcamp', 'online_platform', 'government', 'ngo', 'other']),
    url: z.string(),
  }),

  location: z.object({
    type: z.enum(['remote', 'onsite', 'hybrid']),
    city: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
  }),

  delivery_mode: z.enum(['online', 'in-person', 'hybrid']),

  url: z.string(),

  start_date: z.string(),
  end_date: z.string(),
  deadline: z.string(),

  metadata: z
    .object({
      salary: z.object({
        min: z.number(),
        max: z.number(),
        currency: z.string(),
      }),
      experienceLevel: z.string(),
      requiredSkills: z.array(z.string()),
      benefits: z.array(z.string()),
    })
    .optional()
    .nullable(),
});

export const RecommendationsSchema = z.object({
  recommendations: z.array(RecommendationSchema),
});

export type Recommendation = z.infer<typeof RecommendationSchema>;
