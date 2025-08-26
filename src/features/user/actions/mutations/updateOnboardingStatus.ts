'use server';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function updateOnboardingStatus() {
  const { userId, isAuthenticated } = await auth();

  if (!userId && !isAuthenticated) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const user = await db.user.update({
      where: { clerkId: userId },
      data: {
        preferences: {
          onboardingCompleted: true,
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
