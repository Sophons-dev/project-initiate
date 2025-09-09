'use server';

import { ResponseDto } from '@/lib/dto/response.dto';
import { UpdateUserDto } from '../../dto/updateUser.dto';
import { UserService } from '../../services/user.service';

/**
 * Update user (id or clerkId)
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
