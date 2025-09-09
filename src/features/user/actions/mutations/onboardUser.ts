'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { EducationLevel, Gender } from '@prisma/client';
import { OnboardingUserParams } from '@/features/onboarding/types/onboarding';
import { ResponseDto } from '@/lib/dto/response.dto';

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
 * TODO: Use user.service.ts to orchestrate business logic instead of putting it all here
 */
export async function onboardUser(
  onboardingData: OnboardingUserParams
): Promise<ResponseDto<{ userId: string; onboardingCompleted: boolean }>> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }

    const existing = await db.user.findUnique({ where: { clerkId: userId } });

    if (!existing) {
      return { success: false, error: 'User not found' };
    }

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

    // Save answers (idempotent)
    const entries = Object.entries(onboardingData.answers);

    if (entries.length > 0) {
      await db.$transaction([
        // Remove existing answers for this user and these questions
        db.userAnswer.deleteMany({
          where: {
            userId: updated.id,
            questionId: { in: entries.map(([q]) => q) },
          },
        }),
        db.userAnswer.createMany({
          data: entries.map(([questionId, answer]) => ({
            userId: updated.id,
            questionId,
            value: Array.isArray(answer) ? answer.join(', ') : answer,
          })),
        }),
      ]);
    }

    return { success: true, data: { userId: updated.id, onboardingCompleted: true } };
  } catch (err) {
    console.error('Error during onboarding:', err);
    return { success: false, error: 'Failed to complete onboarding' };
  }
}
