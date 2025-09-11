'use server';

import { db } from '@/lib/db';
import { OrganizationDto } from '../../dto/organization.dto';
import { toOrganizationDto } from '../../mappers/organization.mapper';

export async function getAllOrganizations(): Promise<OrganizationDto[]> {
  const orgs = await db.organization.findMany({ orderBy: { createdAt: 'desc' } });
  return orgs.map(toOrganizationDto);
}
