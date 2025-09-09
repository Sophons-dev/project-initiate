'use server';

import { db } from '@/lib/db';
import { ResponseDto } from '@/lib/dto/response.dto';
import { CreateUserDto } from '../../dto/createUser.dto';
import { UserDto } from '../../dto/user.dto';
import { mapUserToDto } from '../../mappers/user.mapper';

/**
 * Create user
 */
export async function createUser(userData: CreateUserDto): Promise<ResponseDto<UserDto>> {
  try {
    if (!userData.email || !userData.clerkId || !userData.profile?.name) {
      return { success: false, error: 'Missing required fields' };
    }

    // Check if user already exists (idempotent)
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ clerkId: userData.clerkId }, { email: userData.email }],
      },
    });

    if (existingUser) {
      const userDto = mapUserToDto(existingUser);
      return { success: true, data: userDto };
    }

    const user = await db.user.create({
      data: {
        clerkId: userData.clerkId,
        email: userData.email,
        onboardingCompleted: false,
        profile: {
          set: {
            name: userData.profile?.name ?? '',
            image: userData.profile?.image,
          },
        },
      },
    });

    const userDto = mapUserToDto(user);
    return { success: true, data: userDto };
  } catch (err) {
    console.error('Error creating user:', err);
    return { success: false, error: 'Failed to create user' };
  }
}
