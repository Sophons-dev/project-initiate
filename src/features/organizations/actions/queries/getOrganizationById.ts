'use server';

import { db } from '@/lib/db';
import { OrganizationDto } from '../../dto/organization.dto';
import { toOrganizationDto } from '../../mappers/organization.mapper';

export async function getOrganizationById(id: string): Promise<OrganizationDto | null> {
  const org = await db.organization.findUnique({ where: { id } });
  if (!org) return null;

  return toOrganizationDto(org);
}
