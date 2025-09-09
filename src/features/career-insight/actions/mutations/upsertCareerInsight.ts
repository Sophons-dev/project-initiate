'use server';

import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { UpdateCareerInsightDto } from '../../dto/updateInsight.dto';
import { CreateCareerInsightDto } from '../../dto/createInsight.dto';

/**
 * Upserts a career insight record for the given user.
 *
 * Performs a database upsert keyed by `userId`: if a record exists it is updated, otherwise a new record is created.
 * - On update: always sets `summary`; JSON-like fields (`recommendedPaths`, `skillsGap`, `strengths`, `interests`, `preferredRoles`)
 *   are updated only when the corresponding field on `input` is defined. `experienceLevel` is updated when provided.
 * - On create: sets `userId` and `summary`; JSON-like fields are stored as JSON when provided or set to `null` if absent;
 *   `experienceLevel` is set to the provided value or `null`.
 *
 * Values for JSON-like fields are coerced to Prisma.InputJsonValue before persisting. Any database errors propagate to the caller.
 *
 * @param userId - ID of the user whose career insight should be upserted
 * @param input - Data to create or update the career insight (CreateCareerInsightDto | UpdateCareerInsightDto)
 * @returns The upserted careerInsight record as returned by Prisma
 */
export async function upsertCareerInsight(userId: string, input: CreateCareerInsightDto | UpdateCareerInsightDto) {
  const toJson = (v: unknown) => v as unknown as Prisma.InputJsonValue;

  return await db.careerInsight.upsert({
    where: { userId },
    update: {
      summary: (input as UpdateCareerInsightDto).summary,
      recommendedPaths:
        (input as UpdateCareerInsightDto).recommendedPaths !== undefined
          ? toJson((input as UpdateCareerInsightDto).recommendedPaths)
          : undefined,
      skillsGap:
        (input as UpdateCareerInsightDto).skillsGap !== undefined
          ? toJson((input as UpdateCareerInsightDto).skillsGap)
          : undefined,
      strengths:
        (input as UpdateCareerInsightDto).strengths !== undefined
          ? toJson((input as UpdateCareerInsightDto).strengths)
          : undefined,
      interests:
        (input as UpdateCareerInsightDto).interests !== undefined
          ? toJson((input as UpdateCareerInsightDto).interests)
          : undefined,
      experienceLevel: (input as UpdateCareerInsightDto).experienceLevel ?? undefined,
      preferredRoles:
        (input as UpdateCareerInsightDto).preferredRoles !== undefined
          ? toJson((input as UpdateCareerInsightDto).preferredRoles)
          : undefined,
    },
    create: {
      userId,
      summary: (input as CreateCareerInsightDto).summary,
      recommendedPaths:
        (input as CreateCareerInsightDto).recommendedPaths !== undefined
          ? toJson((input as CreateCareerInsightDto).recommendedPaths)
          : null,
      skillsGap:
        (input as CreateCareerInsightDto).skillsGap !== undefined
          ? toJson((input as CreateCareerInsightDto).skillsGap)
          : null,
      strengths:
        (input as CreateCareerInsightDto).strengths !== undefined
          ? toJson((input as CreateCareerInsightDto).strengths)
          : null,
      interests:
        (input as CreateCareerInsightDto).interests !== undefined
          ? toJson((input as CreateCareerInsightDto).interests)
          : null,
      experienceLevel: (input as CreateCareerInsightDto).experienceLevel ?? null,
      preferredRoles:
        (input as CreateCareerInsightDto).preferredRoles !== undefined
          ? toJson((input as CreateCareerInsightDto).preferredRoles)
          : null,
    },
  });
}
