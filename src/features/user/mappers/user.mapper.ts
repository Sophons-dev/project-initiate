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
 * Convert a Prisma UserAnswer record into a UserAnswerDto.
 *
 * @param userAnswer - The Prisma `UserAnswer` to map.
 * @returns A `UserAnswerDto` containing `id`, `userId`, `questionId`, `version`, `value`, and `answeredAt`.
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
 * Convert a Prisma CareerInsightLog model into a CareerInsightLogDto.
 *
 * @returns A DTO containing the log's id, userId, triggeredBy, triggerId, and createdAt.
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
 * Maps a Prisma UserOpportunity record into a UserOpportunityDto.
 *
 * The returned DTO contains the model's scalar fields. If the related
 * opportunity was not included on the input (not eager-loaded), the
 * `opportunity` property will be undefined.
 *
 * @returns The mapped UserOpportunityDto
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
/**
 * Maps a Prisma `User` (optionally with related records) to a `UserDto`.
 *
 * Converts core user fields and, when present, maps nested relations into DTO form:
 * - `userType` defaults to `UserType.student` if missing.
 * - `profile` is mapped with sensible defaults for `image` (null), `gender` ('unknown'),
 *   `dateOfBirth` (current date), `phoneNumber` (empty string), and `location` (empty string);
 *   nested `education` is included only if present.
 * - When provided on the input (via `UserWithRelations`), `careerInsight` is mapped with `toCareerInsightDto`,
 *   and arrays `careerInsightLogs`, `userAnswers`, and `userOpportunities` are mapped to their respective DTOs.
 *
 * @param user - A `User` or a `User` augmented with optional related records; absent relations are safely handled.
 * @returns A `UserDto` representing the mapped user and any included relations.
 */
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
          dateOfBirth: user.profile.dateOfBirth ?? new Date(),
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
