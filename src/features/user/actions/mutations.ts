'use server';
import { db } from '@/lib/db';
import { EducationLevel, Gender } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import {
  CreateUserParams,
  CreateUserResult,
  OnboardUserParams,
  OnboardUserResult,
} from '../types';

export async function createUser(
  userData: CreateUserParams
): Promise<CreateUserResult> {
  console.log('Creating user with data:', userData);
  try {
    const user = await db.user.create({
      data: {
        clerkId: userData.clerkId,
        email: userData.email,
        onboardingCompleted: false,
        profile: {
          set: {
            name: userData.name,
            image: userData.image,
          },
        },
      },
    });

    return { success: true, data: { userId: user.id } };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
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

export async function onboardUser(
  onboardingData: OnboardUserParams
): Promise<OnboardUserResult> {
  console.log('Onboarding user with data:', onboardingData);

  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const updatedUser = await db.user.update({
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
              level:
                gradeLevelMap[onboardingData.gradeLevel] ||
                EducationLevel.other,
            },
          },
        },
        updatedAt: new Date(),
      },
    });

    // Create user answers for each question
    const userAnswers = await Promise.all(
      Object.entries(onboardingData.answers).map(
        async ([questionId, answer]) => {
          const answerValue = Array.isArray(answer)
            ? answer.join(', ')
            : answer;

          const user = await db.user.findFirst({
            where: { clerkId: userId },
          });
          if (!user) {
            throw new Error('User not found');
          }

          return await db.userAnswer.create({
            data: {
              userId: user.id,
              questionId: questionId,
              value: answerValue,
              answeredAt: new Date(),
            },
          });
        }
      )
    );

    console.log(`Onboarding completed for user ${userId}`);
    console.log(`Created ${userAnswers.length} user answers`);

    return {
      success: true,
      data: {
        userId: updatedUser.id,
        onboardingCompleted: true,
      },
    };
  } catch (error) {
    console.error('Error during onboarding:', error);
    return {
      success: false,
      error: 'Failed to complete onboarding',
    };
  }
}
