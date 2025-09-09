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
 */
export async function onboardUser(
  onboardingData: OnboardingUserParams
): Promise<ResponseDto<{ userId: string; onboardingCompleted: boolean }>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
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

    return { success: true, data: { userId: updated.id, onboardingCompleted: true } };
  } catch (err) {
    console.error('Error during onboarding:', err);
    return { success: false, error: 'Failed to complete onboarding' };
  }
}
