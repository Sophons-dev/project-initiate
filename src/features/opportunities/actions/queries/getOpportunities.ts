'use server';

import { db } from '@/lib/db';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';
import { OpportunityDto } from '../../dto';
import { PaginationParams, PaginatedResponse, PaginationMeta } from '../../types/pagination';

export async function getOpportunities(
  paginationParams?: PaginationParams
): Promise<PaginatedResponse<OpportunityDto>> {
  const { page = 1, limit = 10, search } = paginationParams || {};
  const skip = (page - 1) * limit;

  // Build search conditions
  const searchConditions = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { shortDescription: { contains: search, mode: 'insensitive' as const } },
          { longDescription: { contains: search, mode: 'insensitive' as const } },
          { tags: { has: search } },
          { organization: { name: { contains: search, mode: 'insensitive' as const } } },
        ],
      }
    : {};

  // Get total count for pagination metadata with search
  const total = await db.opportunity.count({
    where: searchConditions,
  });

  // Get paginated opportunities with search
  const opps = await db.opportunity.findMany({
    where: searchConditions,
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
