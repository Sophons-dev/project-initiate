'use server';

import { db } from '@/lib/db';
import { OpportunityDto, OpportunityRecommendationDTO } from '@/features/opportunities/types';

export async function getRecommendationsByUserId(userId: string): Promise<OpportunityRecommendationDTO[]> {
  const recs = await db.opportunityRecommendation.findMany({
    where: { userId },
    orderBy: [{ rank: 'asc' }, { createdAt: 'desc' }],
    include: {
      opportunity: true,
    },
  });

  return recs.map(r => {
    const opp = r.opportunity;
    const oppDto: OpportunityDto | undefined = opp
      ? {
          id: opp.id,
          type: opp.type,
          subtype: opp.subtype ?? null,
          title: opp.title,
          description: opp.description ?? null,
          tags: opp.tags ?? [],
          organizationId: opp.organizationId,
          location: opp.location ?? null,
          deliveryMode: opp.deliveryMode ?? null,
          startDate: opp.startDate ?? null,
          endDate: opp.endDate ?? null,
          deadline: opp.deadline ?? null,
          metadata: (opp.metadata as unknown as Record<string, unknown>) ?? null,
          createdBy: opp.createdBy,
          createdAt: opp.createdAt ?? null,
          updatedAt: opp.updatedAt ?? null,
        }
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
    } as OpportunityRecommendationDTO;
  });
}
