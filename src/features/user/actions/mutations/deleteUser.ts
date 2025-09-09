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

    // Cascade delete will automatically handle related records
    await db.user.delete({ where: { id: user.id } });

    return { success: true };
  } catch (err) {
    console.error('Error deleting user:', err);
    return { success: false, error: 'Failed to delete user' };
  }
}
