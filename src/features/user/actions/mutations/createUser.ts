'use server';

import { ResponseDto } from '@/lib/dto/response.dto';
import { CreateUserDto } from '../../dto/createUser.dto';
import { UserService } from '../../services/user.service';

/**
 * Create user
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
