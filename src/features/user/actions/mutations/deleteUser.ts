'use server';

import { UserService } from '../../services/user.service';

/**
 * Delete a user by their Clerk identifier.
 *
 * Attempts to remove the user via UserService. On success returns `{ success: true }`.
 * On failure returns `{ success: false, error: 'Failed to delete user' }` and handles the error internally.
 *
 * @param clerkId - The Clerk user ID of the account to delete.
 * @returns An object indicating success; includes an `error` message on failure.
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
