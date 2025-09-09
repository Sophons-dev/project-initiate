'use server';

import { db } from '@/lib/db';
import { OpportunityDto, OpportunityRecommendationDto } from '@/features/opportunities/types';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';

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
