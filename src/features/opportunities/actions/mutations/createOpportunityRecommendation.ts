'use server';

import { db } from '@/lib/db';

type CreateOpportunityRecommendationInput = {
  userId: string;
  opportunityId: string;
  score?: number | null;
  rank?: number | null;
  reasoning?: string | null;
  tagsMatched: string[];
  modelVersion?: string | null;
};

/**
 * Persists a new opportunity recommendation for a user in the database.
 *
 * Creates an OpportunityRecommendation record using values from `input`. Optional numeric fields default to 0, optional string fields default to `null`, and `tagsMatched` defaults to an empty array. A `createdAt` timestamp is set to the current time. Any database errors propagate to the caller.
 *
 * @param input - Recommendation data: must include `userId`, `opportunityId`, and `tagsMatched`; may include `score`, `rank`, `reasoning`, and `modelVersion`.
 */
export async function createOpportunityRecommendation(input: CreateOpportunityRecommendationInput): Promise<void> {
  await db.opportunityRecommendation.create({
    data: {
      userId: input.userId,
      opportunityId: input.opportunityId,
      score: input.score ?? 0,
      rank: input.rank ?? 0,
      reasoning: input.reasoning ?? null,
      tagsMatched: input.tagsMatched ?? [],
      modelVersion: input.modelVersion ?? null,
      createdAt: new Date(),
    },
  });
}
