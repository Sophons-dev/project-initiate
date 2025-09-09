'use server';

import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { toCareerInsightDto } from '@/features/career-insight/mappers/insight.mapper';
import { CareerInsightDto } from '../../dto/insight.dto';
import { CreateCareerInsightDto } from '../../dto/createInsight.dto';

export async function createCareerInsight(input: CreateCareerInsightDto): Promise<CareerInsightDto> {
  const created = await db.careerInsight.create({
    data: {
      user: { connect: { id: input.userId } },
      summary: input.summary,
      recommendedPaths: (input.recommendedPaths as unknown as Prisma.JsonValue) ?? null,
      skillsGap: (input.skillsGap as unknown as Prisma.JsonValue) ?? null,
      strengths: (input.strengths as unknown as Prisma.JsonValue) ?? null,
      interests: (input.interests as unknown as Prisma.JsonValue) ?? null,
      experienceLevel: input.experienceLevel ?? null,
      preferredRoles: (input.preferredRoles as unknown as Prisma.JsonValue) ?? null,
    },
  });

  return toCareerInsightDto(created);
}
