import { string, z } from 'zod';

export const RecommendationSchema = z.object({
  type: z.enum(['job', 'course', 'scholarship', 'event']),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),

  organization: z.object({
    name: z.string(),
    url: z.url(),
  }),

  location: z.object({
    type: z.enum(['remote', 'onsite', 'hybrid']),
    city: z.string().nullable(),
    country: z.string().nullable(),
  }),

  delivery_mode: z.enum(['online', 'in-person', 'hybrid']),

  url: z.url(),

  start_date: z.date(),
  end_date: z.date(),
  deadline: z.date(),

  metadata: z.object({
    stipend: z
      .object({
        currency: z.string(),
        amount: z.number(),
      })
      .optional(),
    duration: z.string().optional(),
    commitment: z.string().optional(),
  }),
});
export const RecommendationsSchema = z.array(RecommendationSchema);

export type Recommendation = z.infer<typeof RecommendationSchema>;
