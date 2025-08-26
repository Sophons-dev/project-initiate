import { db } from '@/lib/db';

/**
 * Delete user
 */
export async function deleteUser(id: string) {
  try {
    await db.user.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}
