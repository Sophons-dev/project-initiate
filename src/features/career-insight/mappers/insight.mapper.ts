import { CareerInsight, CareerInsightLog } from '@prisma/client';
import { CareerInsightDto } from '../dto/insight.dto';

export function toCareerInsightDto(entity: CareerInsight): CareerInsightDto {
  return {
    id: entity.id,
    userId: entity.userId,
    summary: entity.summary,
    recommendedPaths: (entity.recommendedPaths as unknown as string[]) ?? null,
    skillsGap: (entity.skillsGap as unknown as { missing: string[]; priority: string }) ?? null,
    strengths: (entity.strengths as unknown as { tech: string[]; soft: string[] }) ?? null,
    interests: (entity.interests as unknown as { industries: string[]; roles: string[] }) ?? null,
    experienceLevel: entity.experienceLevel ?? null,
    preferredRoles: (entity.preferredRoles as unknown as string[]) ?? null,
    createdAt: entity.createdAt ?? null,
    updatedAt: entity.updatedAt ?? null,
  };
}
