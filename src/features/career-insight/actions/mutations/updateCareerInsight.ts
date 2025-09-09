'use server';

import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { toCareerInsightDto } from '@/features/career-insight/mappers/insight.mapper';
import { CareerInsightDto } from '../../dto/insight.dto';
import { UpdateCareerInsightDto } from '../../dto/updateInsight.dto';

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
