'use server';

import { db } from '@/lib/db';
import { OrganizationDto } from '../../dto/organization.dto';
import { toOrganizationDto } from '../../mappers/organization.mapper';

export async function getOrganizationsByIndustry(industry: string): Promise<OrganizationDto[]> {
  const orgs = await db.organization.findMany({
    where: { industry },
    orderBy: { companyRating: 'desc' },
  });

  return orgs.map(toOrganizationDto);
}
