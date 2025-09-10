'use server';

import { db } from '@/lib/db';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';
import { OpportunityDto } from '../../dto';

export async function getOpportunities(): Promise<OpportunityDto[]> {
  const opps = await db.opportunity.findMany({ orderBy: { createdAt: 'desc' } });
  return opps.map(toOpportunityDto);
}
