'use server';

import { db } from '@/lib/db';
import { OrganizationDto } from '../../dto/organization.dto';
import { toOrganizationDto } from '../../mappers/organization.mapper';
import { PaginatedResponse, PaginationParams } from '@/features/opportunities/types/pagination';

export async function getOrganizations(
  paginationParams?: PaginationParams
): Promise<PaginatedResponse<OrganizationDto>> {
  const { page = 1, limit = 10, search } = paginationParams || {};
  const skip = (page - 1) * limit;

  const searchConditions = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { location: { contains: search, mode: 'insensitive' as const } },
          { aboutTheCompany: { contains: search, mode: 'insensitive' as const } },
          { industry: { contains: search, mode: 'insensitive' as const } },
        ],
      }
    : {};

  const total = await db.organization.count({
    where: searchConditions,
  });

  const organizations = await db.organization.findMany({
    where: searchConditions,
    orderBy: { createdAt: 'asc' },
    skip,
    take: limit,
    include: {
      opportunities: true,
    },
  });

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const meta = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };

  return {
    data: organizations.map(toOrganizationDto),
    meta,
  };
}
