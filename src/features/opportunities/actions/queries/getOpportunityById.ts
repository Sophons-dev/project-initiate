'use server';

import { db } from '@/lib/db';
import { OpportunityDto } from '@/features/opportunities/types';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';

export async function getOpportunityById(id: string): Promise<OpportunityDto | null> {
  const opp = await db.opportunity.findUnique({ where: { id } });
  return opp ? toOpportunityDto(opp) : null;
}
