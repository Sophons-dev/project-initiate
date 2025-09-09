'use server';

import { db } from '@/lib/db';
import { OpportunityDto } from '@/features/opportunities/types';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';

/**
 * Fetches an opportunity by its ID and returns it as an OpportunityDto, or null if not found.
 *
 * @param id - The opportunity's unique identifier.
 * @returns The mapped OpportunityDto when a matching record exists, otherwise `null`.
 */
export async function getOpportunityById(id: string): Promise<OpportunityDto | null> {
  const opp = await db.opportunity.findUnique({ where: { id } });
  return opp ? toOpportunityDto(opp) : null;
}
