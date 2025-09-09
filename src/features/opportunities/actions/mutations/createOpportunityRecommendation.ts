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
