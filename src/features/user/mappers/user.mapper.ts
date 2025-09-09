import { User, UserType, UserAnswer, CareerInsightLog, UserOpportunity, CareerInsight } from '@prisma/client';
import { UserDto } from '../dto/user.dto';
import { UserAnswerDto } from '../dto/userAnswer.dto';
import { CareerInsightLogDto } from '../dto/careerInsightLog.dto';
import { UserOpportunityDto } from '../dto/userOpportunity.dto';
import { toCareerInsightDto } from '@/features/career-insight/mappers/insight.mapper';

// Type for User with included relations
type UserWithRelations = User & {
  careerInsight?: CareerInsight | null;
  careerInsightLogs?: CareerInsightLog[];
  userAnswers?: UserAnswer[];
  userOpportunities?: UserOpportunity[];
};

/**
 * Maps Prisma UserAnswer model to UserAnswerDto
 */
export function mapUserAnswerToDto(userAnswer: UserAnswer): UserAnswerDto {
  return {
    id: userAnswer.id,
    userId: userAnswer.userId,
    questionId: userAnswer.questionId,
    version: userAnswer.version,
    value: userAnswer.value,
    answeredAt: userAnswer.answeredAt,
  };
}

/**
 * Maps Prisma CareerInsightLog model to CareerInsightLogDto
 */
export function mapCareerInsightLogToDto(careerInsightLog: CareerInsightLog): CareerInsightLogDto {
  return {
    id: careerInsightLog.id,
    userId: careerInsightLog.userId,
    triggeredBy: careerInsightLog.triggeredBy,
    triggerId: careerInsightLog.triggerId,
    createdAt: careerInsightLog.createdAt,
  };
}

/**
 * Maps Prisma UserOpportunity model to UserOpportunityDto
 */
export function mapUserOpportunityToDto(userOpportunity: UserOpportunity): UserOpportunityDto {
  return {
    id: userOpportunity.id,
    userId: userOpportunity.userId,
    opportunityId: userOpportunity.opportunityId,
    status: userOpportunity.status,
    createdAt: userOpportunity.createdAt,
    updatedAt: userOpportunity.updatedAt,
    // Note: opportunity relation would need to be included in the query to map it
    opportunity: undefined,
  };
}

/**
 * Maps Prisma user model to UserDto (without relations)
 */
export function mapUserToDto(user: User): UserDto;
/**
 * Maps Prisma user model to UserDto (with relations)
 */
export function mapUserToDto(user: UserWithRelations): UserDto;
export function mapUserToDto(user: User | UserWithRelations): UserDto {
  const userWithRelations = user as UserWithRelations;

  return {
    id: user.id,
    clerkId: user.clerkId,
    email: user.email,
    userType: user.userType ?? UserType.student,
    onboardingCompleted: user.onboardingCompleted,
    profile: user.profile
      ? {
          name: user.profile.name,
          image: user.profile.image ?? null,
          gender: user.profile.gender ?? 'unknown',
          dateOfBirth: user.profile.dateOfBirth ?? null,
          phoneNumber: user.profile.phoneNumber ?? '',
          location: user.profile.location ?? '',
          education: user.profile.education
            ? {
                school: user.profile.education.school ?? '',
                level: user.profile.education.level,
              }
            : undefined,
        }
      : undefined,
    careerInsight: userWithRelations.careerInsight ? toCareerInsightDto(userWithRelations.careerInsight) : null,
    careerInsightLogs: userWithRelations.careerInsightLogs?.map(mapCareerInsightLogToDto),
    userAnswers: userWithRelations.userAnswers?.map(mapUserAnswerToDto),
    userOpportunities: userWithRelations.userOpportunities?.map(mapUserOpportunityToDto),
  };
}
