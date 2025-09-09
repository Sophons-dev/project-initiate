'use server';

import { db } from '@/lib/db';
import { toCareerInsightDto } from '@/features/career-insight/mappers/insight.mapper';
import { CareerInsightDto } from '../../dto/insight.dto';

/**
 * Fetches the career insight for a clerk by their user ID.
 *
 * Looks up the CareerInsight record for the given `userId` and returns it mapped to a `CareerInsightDto`.
 *
 * @param userId - Clerk's user identifier to search for
 * @returns The mapped `CareerInsightDto` when a record exists; otherwise `null`.
 */
export async function getCareerInsightByClerkId(userId: string): Promise<CareerInsightDto | null> {
  const entity = await db.careerInsight.findUnique({ where: { userId } });
  return entity ? toCareerInsightDto(entity) : null;
}
