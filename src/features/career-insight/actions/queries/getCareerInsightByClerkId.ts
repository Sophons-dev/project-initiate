'use server';

import { db } from '@/lib/db';
import { toCareerInsightDto } from '@/features/career-insight/mappers/insight.mapper';
import { CareerInsightDto } from '../../dto/insight.dto';

export async function getCareerInsightByClerkId(userId: string): Promise<CareerInsightDto | null> {
  const entity = await db.careerInsight.findUnique({ where: { userId } });
  return entity ? toCareerInsightDto(entity) : null;
}
