'use server';

import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { toCareerInsightDto } from '@/features/career-insight/mappers/insight.mapper';
import { CareerInsightDto } from '../../dto/insight.dto';
import { UpdateCareerInsightDto } from '../../dto/updateInsight.dto';

/**
 * Updates the career insight record for the given user and returns the updated DTO.
 *
 * Applies the fields present in the provided UpdateCareerInsightDto to the persisted record.
 * JSON-like fields (recommendedPaths, skillsGap, strengths, interests, preferredRoles) are stored as Prisma.JsonValue;
 * fields that are undefined or null are omitted from the update. The record's updatedAt timestamp is set to the current time.
 *
 * @param userId - Identifier of the user whose career insight will be updated
 * @param input - Partial update payload describing the career insight fields to set
 * @returns The updated CareerInsightDto representing the persisted record
 */
export async function updateCareerInsight(userId: string, input: UpdateCareerInsightDto): Promise<CareerInsightDto> {
  const updated = await db.careerInsight.update({
    where: { userId },
    data: {
      summary: input.summary,
      recommendedPaths: (input.recommendedPaths as unknown as Prisma.JsonValue) ?? undefined,
      skillsGap: (input.skillsGap as unknown as Prisma.JsonValue) ?? undefined,
      strengths: (input.strengths as unknown as Prisma.JsonValue) ?? undefined,
      interests: (input.interests as unknown as Prisma.JsonValue) ?? undefined,
      experienceLevel: input.experienceLevel ?? undefined,
      preferredRoles: (input.preferredRoles as unknown as Prisma.JsonValue) ?? undefined,
      updatedAt: new Date(),
    },
  });

  return toCareerInsightDto(updated);
}
