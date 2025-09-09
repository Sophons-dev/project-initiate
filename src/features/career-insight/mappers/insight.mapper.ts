import { CareerInsight, CareerInsightLog } from '@prisma/client';
import { CareerInsightDto } from '../dto/insight.dto';

/**
 * Convert a Prisma CareerInsight entity into a CareerInsightDto.
 *
 * Maps entity fields to the DTO shape, preserving id, userId, and summary.
 * JSON-like fields (recommendedPaths, skillsGap, strengths, interests, preferredRoles)
 * are cast to Record<string, unknown> for typing and default to `null` when absent.
 * Date and scalar fields that may be undefined on the entity (experienceLevel, createdAt, updatedAt)
 * are normalized to `null` when not present.
 *
 * @param entity - The Prisma CareerInsight entity to convert
 * @returns A CareerInsightDto with normalized nullable fields suitable for API responses
 */
export function toCareerInsightDto(entity: CareerInsight): CareerInsightDto {
  return {
    id: entity.id,
    userId: entity.userId,
    summary: entity.summary,
    recommendedPaths: (entity.recommendedPaths as unknown as Record<string, unknown>) ?? null,
    skillsGap: (entity.skillsGap as unknown as Record<string, unknown>) ?? null,
    strengths: (entity.strengths as unknown as Record<string, unknown>) ?? null,
    interests: (entity.interests as unknown as Record<string, unknown>) ?? null,
    experienceLevel: entity.experienceLevel ?? null,
    preferredRoles: (entity.preferredRoles as unknown as Record<string, unknown>) ?? null,
    createdAt: entity.createdAt ?? null,
    updatedAt: entity.updatedAt ?? null,
  };
}
