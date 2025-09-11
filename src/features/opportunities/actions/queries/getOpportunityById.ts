'use server';

import { db } from '@/lib/db';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';
import { OpportunityDto } from '../../dto';

export async function getOpportunityById(id: string): Promise<OpportunityDto | null> {
  const opp = await db.opportunity.findUnique({
    where: { id },
    include: {
      organization: true,
    },
  });
  return opp ? toOpportunityDto(opp) : null;
}
