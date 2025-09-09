'use server';

import { db } from '@/lib/db';
import { ResponseDto } from '@/lib/dto/response.dto';

/**
 * Delete user
 */
export async function deleteUser(clerkId: string): Promise<ResponseDto<void>> {
  try {
    const user = await db.user.findUnique({ where: { clerkId } });

    if (!user) {
      return { success: true }; // User doesn't exist, consider it deleted
    }

    await db.$transaction([
      db.opportunityRecommendation.deleteMany({ where: { userId: user.id } }),
      db.userAnswer.deleteMany({ where: { userId: user.id } }),
      db.userOpportunity.deleteMany({ where: { userId: user.id } }),
      db.careerInsight.deleteMany({ where: { userId: user.id } }),
      db.user.delete({ where: { id: user.id } }),
    ]);

    return { success: true };
  } catch (err) {
    console.error('Error deleting user:', err);
    return { success: false, error: 'Failed to delete user' };
  }
}
