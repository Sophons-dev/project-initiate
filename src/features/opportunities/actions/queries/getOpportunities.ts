'use server';

import { db } from '@/lib/db';
import { OpportunityDto } from '@/features/opportunities/types';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';

/**
 * Fetches all opportunities from the database, ordered by newest first, and converts them to DTOs.
 *
 * Retrieves opportunities via the database client ordered by `createdAt` descending and maps each record
 * through `toOpportunityDto` before returning.
 *
 * Errors from the database call propagate to the caller.
 *
 * @returns A promise that resolves to an array of `OpportunityDto` objects.
 */
export async function getOpportunities(): Promise<OpportunityDto[]> {
  const opps = await db.opportunity.findMany({ orderBy: { createdAt: 'desc' } });
  return opps.map(toOpportunityDto);
}
