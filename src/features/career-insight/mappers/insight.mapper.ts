import { CareerInsight, CareerInsightLog } from '@prisma/client';
import { CareerInsightDto } from '../dto/insight.dto';

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
