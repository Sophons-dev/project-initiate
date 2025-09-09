'use server';

import { db } from '@/lib/db';
import { OpportunityDto } from '@/features/opportunities/types';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';

export async function getOpportunities(): Promise<OpportunityDto[]> {
  const opps = await db.opportunity.findMany({ orderBy: { createdAt: 'desc' } });
  return opps.map(toOpportunityDto);
}
