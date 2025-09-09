'use server';

import { db } from '@/lib/db';
import { ResponseDto } from '@/lib/dto/response.dto';
import { UserDto } from '../../dto/user.dto';
import { mapUserToDto } from '../../mappers/user.mapper';

/**
 * Retrieve a user by their Clerk ID, including related career and answer/opportunity data.
 *
 * Looks up the user with the given Clerk provider identifier and returns a ResponseDto:
 * - On success: `data` contains a mapped `UserDto` with related `careerInsight`, `careerInsightLogs`, `userAnswers`, and `userOpportunities`.
 * - If no user exists: returns `{ success: false, error: 'User not found' }`.
 * - On query failure: returns `{ success: false, error: 'Failed to fetch user' }`.
 *
 * @param clerkId - The Clerk provider user identifier to query for.
 * @returns A ResponseDto whose `data` is the mapped `UserDto` when found, otherwise an error response.
 */
export async function getUserByClerkId(clerkId: string): Promise<ResponseDto<UserDto | null>> {
  console.log('Fetching user with clerk id:', clerkId);

  try {
    const user = await db.user.findFirst({
      where: { clerkId: clerkId },
      include: {
        careerInsight: true,
        careerInsightLogs: true,
        userAnswers: true,
        userOpportunities: true,
      },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const userData = mapUserToDto(user);
    return { success: true, data: userData };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, error: 'Failed to fetch user' };
  }
}
