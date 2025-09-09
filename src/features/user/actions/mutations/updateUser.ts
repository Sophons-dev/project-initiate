'use server';

import { db } from '@/lib/db';
import { ResponseDto } from '@/lib/dto/response.dto';
import { UpdateUserDto } from '../../dto/updateUser.dto';
import { UserDto } from '../../dto/user.dto';
import { mapUserToDto } from '../../mappers/user.mapper';

/**
 * Update user (id or clerkId)
 */
export async function updateUser(
  identifier: { key: 'id' | 'clerkId'; value: string },
  updates: UpdateUserDto
): Promise<ResponseDto<UserDto>> {
  try {
    const existing = await db.user.findFirst({
      where: { [identifier.key]: identifier.value } as any,
    });

    if (!existing) {
      return { success: false, error: 'User not found' };
    }

    const nextProfile = updates.profile
      ? {
          name: updates.profile.name ?? existing.profile?.name ?? '',
          image: updates.profile.image ?? existing.profile?.image ?? null,
          gender: (updates.profile as any).gender ?? (existing.profile as any)?.gender ?? null,
          dateOfBirth: updates.profile.dateOfBirth ?? existing.profile?.dateOfBirth ?? null,
          phoneNumber: updates.profile.phoneNumber ?? existing.profile?.phoneNumber ?? null,
          location: updates.profile.location ?? existing.profile?.location ?? null,
          interests: (updates.profile as any).interests ?? existing.profile?.interests ?? [],
          education: updates.profile.education ?? existing.profile?.education ?? undefined,
        }
      : undefined;

    const user = await db.user.update({
      where: { [identifier.key]: identifier.value } as any,
      data: {
        userType: updates.userType,
        onboardingCompleted: updates.onboardingCompleted,
        profile: nextProfile ? { set: nextProfile } : undefined,
      },
    });

    const userDto = mapUserToDto(user);
    return { success: true, data: userDto };
  } catch (err) {
    console.error('Error updating user:', err);
    return { success: false, error: 'Failed to update user' };
  }
}
