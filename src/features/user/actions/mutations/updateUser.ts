'use server';

import { db } from '@/lib/db';
import { ResponseDto } from '@/lib/dto/response.dto';
import { UpdateUserDto } from '../../dto/updateUser.dto';
import { UserDto } from '../../dto/user.dto';
import { mapUserToDto } from '../../mappers/user.mapper';
import { Prisma } from '@prisma/client';

type UserIdentifier = { key: 'id'; value: string } | { key: 'clerkId'; value: string };

/**
 * Update user (id or clerkId)
 * TODO: Use user.service.ts to orchestrate business logic instead of putting it all here
 */
export async function updateUser(identifier: UserIdentifier, updates: UpdateUserDto): Promise<ResponseDto<UserDto>> {
  try {
    const whereClause: Prisma.UserWhereUniqueInput =
      identifier.key === 'id' ? { id: identifier.value } : { clerkId: identifier.value };

    const existing = await db.user.findUnique({
      where: whereClause,
    });

    if (!existing) {
      return { success: false, error: 'User not found' };
    }

    const nextProfile = updates.profile
      ? {
          name: updates.profile.name ?? existing.profile?.name ?? '',
          image: updates.profile.image ?? existing.profile?.image ?? null,
          gender: updates.profile.gender ?? existing.profile?.gender ?? null,
          dateOfBirth: updates.profile.dateOfBirth ?? existing.profile?.dateOfBirth ?? null,
          phoneNumber: updates.profile.phoneNumber ?? existing.profile?.phoneNumber ?? null,
          location: updates.profile.location ?? existing.profile?.location ?? null,
          interests: updates.profile.interests ?? existing.profile?.interests ?? [],
          education: updates.profile.education ?? existing.profile?.education ?? undefined,
        }
      : undefined;

    const user = await db.user.update({
      where: whereClause,
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
