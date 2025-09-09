'use server';

import { UserService } from '../../services/user.service';

/**
 * Delete user
 */
export async function deleteUser(clerkId: string) {
  try {
    await UserService.deleteUser(clerkId);
    return { success: true };
  } catch (err) {
    console.error('Error deleting user:', err);
    return { success: false, error: 'Failed to delete user' };
  }
}
