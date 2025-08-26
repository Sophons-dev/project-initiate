import { db } from '@/lib/db';

/**
 * Update user model data (learning preferences, availability, etc.)
 */
export async function updateUserModelData(
  id: string,
  modelData: {
    learningStyle?: string;
    availability?: string;
    preferredWorkEnv?: string;
    remoteFriendly?: boolean;
  }
) {
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        modelData: {
          ...modelData,
          updatedAt: new Date(),
        },
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating user model data:', error);
    return { success: false, error: 'Failed to update user model data' };
  }
}
