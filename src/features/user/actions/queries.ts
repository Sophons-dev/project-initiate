'use server';

import { db } from '@/lib/db';
import { GetUserParams, GetUserResult, User } from '../types';

export async function getUser(params: GetUserParams): Promise<GetUserResult> {
  try {
    const user = await db.user.findFirst({
      where: { [params.key]: params.value },
      include: {
        careerInsight: true,
        careerInsightLogs: true,
        userAnswers: true,
        userOpportunities: true,
      },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const userData: User = {
      id: user.id,
      clerkId: user.clerkId,
      email: user.email as string,
      onboardingCompleted: user.onboardingCompleted,
      userType: user.userType ?? 'student',
      profile: user.profile
        ? {
            name: user.profile.name,
            image: user.profile?.image,
            gender: user.profile.gender ?? 'unknown',
            dateOfBirth: user.profile.dateOfBirth ?? new Date(),
            phoneNumber: user.profile.phoneNumber ?? '',
            location: user.profile.location ?? '',
            education: user.profile.education
              ? {
                  school: user.profile.education.school ?? '',
                  level: user.profile.education.level ?? '',
                }
              : undefined,
          }
        : undefined,
    };

    return { success: true, data: userData };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, error: 'Failed to fetch user' };
  }
}
