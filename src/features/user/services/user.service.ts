import { db } from '@/lib/db';
import { EducationLevel, Gender } from '@prisma/client';
import { OnboardingUserParams } from '@/features/onboarding/types/onboarding';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserDto } from '../dto/user.dto';
import { mapUserToDto } from '../mappers/user.mapper';

const gradeLevelMap: Record<string, EducationLevel> = {
  primary: EducationLevel.primary,
  secondary: EducationLevel.secondary,
  bachelor: EducationLevel.bachelor,
  master: EducationLevel.master,
  doctorate: EducationLevel.doctorate,
  diploma: EducationLevel.diploma,
  certificate: EducationLevel.certificate,
  other: EducationLevel.other,
};

const genderMap: Record<string, Gender> = {
  male: Gender.male,
  female: Gender.female,
  'non-binary': Gender.binary,
  'prefer-not-to-say': Gender.prefer_not_to_say,
};

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(userData: CreateUserDto): Promise<UserDto> {
    if (!userData.email || !userData.clerkId || !userData.profile?.name) {
      throw new Error('Missing required fields');
    }

    // Check if user already exists (idempotent)
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ clerkId: userData.clerkId }, { email: userData.email }],
      },
    });

    if (existingUser) {
      return mapUserToDto(existingUser);
    }

    const user = await db.user.create({
      data: {
        clerkId: userData.clerkId,
        email: userData.email,
        onboardingCompleted: false,
        profile: {
          set: {
            name: userData.profile?.name ?? '',
            image: userData.profile?.image,
          },
        },
      },
    });

    return mapUserToDto(user);
  }

  /**
   * Update user
   */
  static async updateUser(
    identifier: { key: 'id' | 'clerkId'; value: string },
    updates: UpdateUserDto
  ): Promise<UserDto> {
    const existing = await db.user.findFirst({ where: { [identifier.key]: identifier.value } as any });
    if (!existing) {
      throw new Error('User not found');
    }

    const nextProfile = updates.profile
      ? {
          name: updates.profile.name ?? existing.profile?.name ?? '',
          image: updates.profile.image ?? existing.profile?.image ?? null,
          gender: (updates.profile as any).gender ?? (existing.profile as any)?.gender ?? null,
          dateOfBirth: updates.profile.dateOfBirth ?? existing.profile?.dateOfBirth ?? null,
          phoneNumber: updates.profile.phoneNumber ?? existing.profile?.phoneNumber ?? null,
          location: updates.profile.location ?? existing.profile?.location ?? null,
          interests: (updates.profile as any).interests ?? existing.profile?.interests ?? [],
          education: updates.profile.education ?? existing.profile?.education ?? undefined,
        }
      : undefined;

    const user = await db.user.update({
      where: { [identifier.key]: identifier.value } as any,
      data: {
        userType: updates.userType,
        onboardingCompleted: updates.onboardingCompleted,
        profile: nextProfile ? { set: nextProfile } : undefined,
      },
    });

    return mapUserToDto(user);
  }

  /**
   * Onboard user
   */
  static async onboardUser(
    clerkId: string,
    onboardingData: OnboardingUserParams
  ): Promise<{ userId: string; onboardingCompleted: boolean }> {
    const updated = await db.user.update({
      where: { clerkId },
      data: {
        userType: onboardingData.userType,
        onboardingCompleted: true,
        profile: {
          set: {
            name: onboardingData.fullName,
            gender: genderMap[onboardingData.gender],
            dateOfBirth: new Date(onboardingData.dateOfBirth),
            phoneNumber: onboardingData.contactInfo,
            interests: onboardingData.interests,
            location: onboardingData.location,
            education: {
              school: onboardingData.school,
              level: gradeLevelMap[onboardingData.gradeLevel] || EducationLevel.other,
            },
          },
        },
      },
    });

    // Save answers
    await Promise.all(
      Object.entries(onboardingData.answers).map(([questionId, answer]) =>
        db.userAnswer.create({
          data: {
            userId: updated.id,
            questionId,
            value: Array.isArray(answer) ? answer.join(', ') : answer,
          },
        })
      )
    );

    return { userId: updated.id, onboardingCompleted: true };
  }

  /**
   * Delete user
   */
  static async deleteUser(clerkId: string): Promise<void> {
    const user = await db.user.findUnique({ where: { clerkId } });

    if (!user) return;

    await db.$transaction([
      db.opportunityRecommendation.deleteMany({ where: { userId: user.id } }),
      db.userAnswer.deleteMany({ where: { userId: user.id } }),
      db.userOpportunity.deleteMany({ where: { userId: user.id } }),
      db.careerInsight.deleteMany({ where: { userId: user.id } }),
      db.user.delete({ where: { id: user.id } }),
    ]);
  }
}
