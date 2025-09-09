'use server';

import { ResponseDto } from '@/lib/dto/response.dto';
import { CreateUserDto } from '../../dto/createUser.dto';
import { UserService } from '../../services/user.service';

/**
 * Create a new user from the provided data.
 *
 * Attempts to create a user via UserService. On success returns a ResponseDto with `success: true`
 * and the created user in `data`. On failure returns a ResponseDto with `success: false` and a
 * generic `error` message.
 *
 * @param userData - Data transfer object containing the new user's properties
 * @returns A Promise resolving to a ResponseDto wrapping either the created user (`data`) or an error message
 */
export async function createUser(userData: CreateUserDto): Promise<ResponseDto<any>> {
  try {
    const user = await UserService.createUser(userData);
    return new ResponseDto({ success: true, data: user });
  } catch (err) {
    console.error('Error creating user:', err);
    return new ResponseDto({ success: false, error: 'Failed to create user' });
  }
}
