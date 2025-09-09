import { User, UserType } from '@prisma/client';
import { UserDto } from '../dto/user.dto';

/**
 * Maps Prisma user model to UserDto
 */
export function mapUserToDto(user: User): UserDto {
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
  };
}
