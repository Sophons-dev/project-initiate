import { db } from '@/lib/db';

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        role: true,
        opportunities: true,
        questionAnswers: true,
        recommendations: true,
        careerInsights: true,
        careerInsightLogs: true,
      },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, error: 'Failed to fetch user' };
  }
}
