import { db } from '@/lib/db';

export async function updateOnboardingStatus(id: string, completed: boolean) {
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        preferences: {
          onboardingCompleted: completed,
          preferencesUpdatedAt: new Date(),
        },
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating onboarding status:', error);
    return { success: false, error: 'Failed to update onboarding status' };
  }
}
