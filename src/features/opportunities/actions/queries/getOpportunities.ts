'use server';

import { db } from '@/lib/db';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';
import { OpportunityDto } from '../../dto';
import { PaginationParams, PaginatedResponse, PaginationMeta } from '../../types/pagination';

export async function getOpportunities(
  paginationParams?: PaginationParams
): Promise<PaginatedResponse<OpportunityDto>> {
  const { page = 1, limit = 10 } = paginationParams || {};
  const skip = (page - 1) * limit;

  // Get total count for pagination metadata
  const total = await db.opportunity.count();

  // Get paginated opportunities
  const opps = await db.opportunity.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      organization: true,
    },
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

  return {
    data: opps.map(toOpportunityDto),
    meta,
  };
}
