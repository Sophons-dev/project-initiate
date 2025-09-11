'use server';

import { db } from '@/lib/db';
import { OpportunityRecommendationDto } from '@/features/opportunities/dto/opportunity-recommendation.dto';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';
import { OpportunityDto } from '../../dto';

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
