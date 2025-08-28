import { db } from '@/lib/db';
import { GetUserParams, GetUserResult, User } from '../types';

export async function getUser(params: GetUserParams): Promise<GetUserResult> {
  try {
    const user = await db.user.findFirst({
      where: { [params.key]: params.value },
      include: {
        careerInsight: true,
        careerInsightLogs: true,
        opportunityRecommendations: true,
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
      profile: user.profile
        ? {
            name: user.profile.name,
            image: user.profile?.image,
            gender: user.profile.gender,
            dateOfBirth: user.profile.dateOfBirth,
            phoneNumber: user.profile.phoneNumber,
            location: user.profile.location,
            education: user.profile.education,
          }
        : undefined,
    };

    return { success: true, data: userData };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, error: 'Failed to fetch user' };
  }
}
