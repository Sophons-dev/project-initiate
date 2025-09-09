'use server';

import { db } from '@/lib/db';
import { ResponseDto } from '@/lib/dto/response.dto';
import { UserDto } from '../../dto/user.dto';
import { mapUserToDto } from '../../mappers/user.mapper';

/**
 * Fetches a user by ID and returns a ResponseDto containing a UserDto or an error message.
 *
 * Queries the database for a user with the given `id`, including related data (careerInsight, careerInsightLogs, userAnswers, userOpportunities). On success returns `{ success: true, data: UserDto }`. If no user is found returns `{ success: false, error: 'User not found' }`. On failure returns `{ success: false, error: 'Failed to fetch user' }`.
 *
 * @param id - The user's unique identifier
 * @returns A ResponseDto with `data` set to the mapped UserDto on success, or an `error` message on failure
 */
export async function getUserById(id: string): Promise<ResponseDto<UserDto | null>> {
  console.log('Fetching user with id:', id);

  try {
    const user = await db.user.findFirst({
      where: { id },
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
