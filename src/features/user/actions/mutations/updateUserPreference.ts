import { db } from '@/lib/db';

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  id: string,
  preferences: {
    interests?: string[];
    goals?: string;
    preferredOpportunityTypes?: string[];
    skills?: string[];
  }
) {
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        preferences: {
          ...preferences,
          preferencesUpdatedAt: new Date(),
        },
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return { success: false, error: 'Failed to update user preferences' };
  }
}
