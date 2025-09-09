'use server';

import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { UpdateCareerInsightDto } from '../../dto/updateInsight.dto';
import { CreateCareerInsightDto } from '../../dto/createInsight.dto';

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
