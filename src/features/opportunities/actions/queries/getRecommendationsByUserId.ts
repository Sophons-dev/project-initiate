'use server';

import { db } from '@/lib/db';
import { OpportunityDto } from '@/features/opportunities/types';
import { OpportunityRecommendationDto } from '@/features/opportunities/dto/opportunity-recommendation.dto';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';

/**
 * Fetches opportunity recommendations for a user and maps them to DTOs.
 *
 * Returns recommendations for the given `userId`, ordered by `rank` (ascending)
 * then `createdAt` (descending). Each returned item includes nullable scalar
 * fields (score, rank, reasoning, modelVersion, createdAt), `tagsMatched` (defaults
 * to an empty array when absent), and an `opportunity` DTO when the related
 * opportunity exists; if the related opportunity is missing, `opportunity` will be `undefined`.
 *
 * @param userId - The ID of the user whose recommendations should be fetched.
 * @returns An array of OpportunityRecommendationDto objects for the user.
 */
export async function getRecommendationsByUserId(userId: string): Promise<OpportunityRecommendationDto[]> {
  const recs = await db.opportunityRecommendation.findMany({
    where: { userId },
    orderBy: [{ rank: 'asc' }, { createdAt: 'desc' }],
    include: { opportunity: { include: { organization: true } } },
  });

  return recs.map(r => {
    const opp = r.opportunity;
    const oppDto: OpportunityDto | undefined = opp
      ? { ...toOpportunityDto(opp), organization: opp.organization }
      : undefined;

    return {
      id: r.id,
      userId: r.userId,
      opportunityId: r.opportunityId,
      score: r.score ?? null,
      rank: r.rank ?? null,
      reasoning: r.reasoning ?? null,
      tagsMatched: r.tagsMatched ?? [],
      modelVersion: r.modelVersion ?? null,
      createdAt: r.createdAt ?? null,
      opportunity: oppDto,
    } as OpportunityRecommendationDto;
  });
}
