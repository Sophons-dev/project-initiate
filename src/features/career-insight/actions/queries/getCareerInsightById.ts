'use server';

import { db } from '@/lib/db';
import { toCareerInsightDto } from '@/features/career-insight/mappers/insight.mapper';
import { CareerInsightDto } from '../../dto/insight.dto';

/**
 * Fetches a career insight by its ID.
 *
 * Queries the database for a career insight with the given `id` and returns it mapped to a DTO.
 * If no matching record exists, returns `null`. Database errors are not caught and will propagate to the caller.
 *
 * @param id - The career insight identifier to fetch
 * @returns The matching CareerInsightDto, or `null` if not found
 */
export async function getCareerInsightById(id: string): Promise<CareerInsightDto | null> {
  const entity = await db.careerInsight.findUnique({ where: { id } });
  return entity ? toCareerInsightDto(entity) : null;
}
