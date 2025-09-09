'use server';

import { ResponseDto } from '@/lib/dto/response.dto';
import { UpdateUserDto } from '../../dto/updateUser.dto';
import { UserService } from '../../services/user.service';

/**
 * Update a user by `id` or `clerkId`.
 *
 * Attempts to apply the provided partial updates to the user identified by `identifier`.
 *
 * @param identifier - Object specifying which key to use (`'id'` | `'clerkId'`) and its string value.
 * @param updates - Partial user fields to apply (see UpdateUserDto).
 * @returns A ResponseDto containing the updated user on success (`success: true, data: <user>`) or a failure marker on error (`success: false, error: 'Failed to update user'`).
 */
export async function updateUser(
  identifier: { key: 'id' | 'clerkId'; value: string },
  updates: UpdateUserDto
): Promise<ResponseDto<any>> {
  try {
    const user = await UserService.updateUser(identifier, updates);
    return new ResponseDto({ success: true, data: user });
  } catch (err) {
    console.error('Error updating user:', err);
    return new ResponseDto({ success: false, error: 'Failed to update user' });
  }
}
