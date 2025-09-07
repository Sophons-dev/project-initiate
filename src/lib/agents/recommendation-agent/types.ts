import { z } from 'zod';

export const RecommendationSchema = z.object({
  type: z.enum(['JOB', 'COURSE', 'SCHOLARSHIP', 'EVENT']),

  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  matchReason: z.string(),

  organization: z.object({
    name: z.string(),
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

  metadata: z.object({
    stipend: z
      .object({
        currency: z.string(),
        amount: z.number(),
      })
      .optional()
      .nullable(),
    duration: z.string().optional().nullable(),
    commitment: z.string().optional().nullable(),
  }),
});

export const RecommendationsSchema = z.object({
  recommendations: z.array(RecommendationSchema),
});

export type Recommendation = z.infer<typeof RecommendationSchema>;
