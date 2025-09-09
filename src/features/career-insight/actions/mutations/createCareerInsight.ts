'use server';

import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { toCareerInsightDto } from '@/features/career-insight/mappers/insight.mapper';
import { CareerInsightDto } from '../../dto/insight.dto';
import { CreateCareerInsightDto } from '../../dto/createInsight.dto';

/**
 * Creates a Career Insight record for a user and returns it as a DTO.
 *
 * Creates a new career insight in the database using fields from `input`. JSON-like fields
 * (recommendedPaths, skillsGap, strengths, interests, preferredRoles) are stored as JSON
 * values and optional fields default to null when absent.
 *
 * @param input - Data required to create the career insight (includes userId, summary and optional JSON fields and experienceLevel)
 * @returns The created CareerInsight represented as a CareerInsightDto
 */
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
