'use server';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { UserType, EducationLevel, Gender } from '@prisma/client';

import { OnboardingUserParams } from '@/features/onboarding/types/onboarding';
import { ResponseDto } from '@/lib/dto/response.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

/**
 * Create user
 */
export async function createUser(userData: CreateUserDto): Promise<ResponseDto<UserDto>> {
  if (!userData.email || !userData.clerkId || !userData.profile?.name) {
    return new ResponseDto({ success: false, error: 'Missing required fields' });
  }

  try {
    // Check if user already exists (idempotent)
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ clerkId: userData.clerkId }, { email: userData.email }],
      },
    });

    if (existingUser) {
      return new ResponseDto({ success: true, data: convertToDto(existingUser) });
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

    return new ResponseDto({ success: true, data: convertToDto(user) });
  } catch (err) {
    console.error('Error creating user:', err);
    return new ResponseDto({ success: false, error: 'Failed to create user' });
  }
}

/**
 * Delete user
 */
export async function deleteUser(clerkId: string) {
  try {
    const user = await db.user.findUnique({ where: { clerkId } });

    if (!user) return { success: true };

    await db.$transaction([
      db.opportunityRecommendation.deleteMany({ where: { userId: user.id } }),
      db.userAnswer.deleteMany({ where: { userId: user.id } }),
      db.userOpportunity.deleteMany({ where: { userId: user.id } }),
      db.user.delete({ where: { id: user.id } }),
    ]);

    return { success: true };
  } catch (err) {
    console.error('Error deleting user:', err);
    return { success: false, error: 'Failed to delete user' };
  }
}

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

/**
 * Onboard user
 */
export async function onboardUser(
  onboardingData: OnboardingUserParams
): Promise<ResponseDto<{ userId: string; onboardingCompleted: boolean }>> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('User not authenticated');

    const updated = await db.user.update({
      where: { clerkId: userId },
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

    return new ResponseDto({ success: true, data: { userId: updated.id, onboardingCompleted: true } });
  } catch (err) {
    console.error('Error during onboarding:', err);
    return new ResponseDto({ success: false, error: 'Failed to complete onboarding' });
  }
}

/**
 * Update user (id or clerkId)
 */
export async function updateUser(
  identifier: { key: 'id' | 'clerkId'; value: string },
  updates: UpdateUserDto
): Promise<ResponseDto<UserDto>> {
  try {
    const existing = await db.user.findFirst({ where: { [identifier.key]: identifier.value } as any });
    if (!existing) {
      return new ResponseDto({ success: false, error: 'User not found' });
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

    return new ResponseDto({ success: true, data: convertToDto(user) });
  } catch (err) {
    console.error('Error updating user:', err);
    return new ResponseDto({ success: false, error: 'Failed to update user' });
  }
}

/**
 * Utility: map Prisma user model → UserDto
 */
function convertToDto(user: any): UserDto {
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
