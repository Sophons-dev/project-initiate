'use server';

import { db } from '@/lib/db';
import { OpportunityRecommendationDto } from '@/features/opportunities/dto/opportunity-recommendation.dto';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';
import { OpportunityDto } from '../../dto';
import { PaginationParams, PaginatedResponse, PaginationMeta } from '../../types/pagination';

export async function getRecommendationsByUserId(
  userId: string,
  paginationParams?: PaginationParams
): Promise<PaginatedResponse<OpportunityRecommendationDto>> {
  const { page = 1, limit = 10, search } = paginationParams || {};
  const skip = (page - 1) * limit;

  // Build search conditions
  const searchConditions = search
    ? {
        AND: [
          { userId },
          {
            OR: [
              { opportunity: { title: { contains: search, mode: 'insensitive' as const } } },
              { opportunity: { shortDescription: { contains: search, mode: 'insensitive' as const } } },
              { opportunity: { longDescription: { contains: search, mode: 'insensitive' as const } } },
              { opportunity: { tags: { has: search } } },
              { opportunity: { organization: { name: { contains: search, mode: 'insensitive' as const } } } },
              { reasoning: { contains: search, mode: 'insensitive' as const } },
              { tagsMatched: { has: search } },
            ],
          },
        ],
      }
    : { userId };

  // Get total count for pagination metadata
  console.log('getRecommendationsByUserId - userId:', userId);
  console.log('getRecommendationsByUserId - searchConditions:', searchConditions);

  const total = await db.opportunityRecommendation.count({
    where: searchConditions,
  });

  console.log('getRecommendationsByUserId - total count:', total);

  // Get paginated recommendations
  const recs = await db.opportunityRecommendation.findMany({
    where: searchConditions,
    orderBy: [{ rank: 'asc' }, { createdAt: 'desc' }],
    include: { opportunity: { include: { organization: true } } },
    skip,
    take: limit,
  });

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const meta: PaginationMeta = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };

  const data = recs.map(r => {
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

  return {
    data,
    meta,
  };
}
