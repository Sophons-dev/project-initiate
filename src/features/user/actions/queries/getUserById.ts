'use server';

import { db } from '@/lib/db';
import { ResponseDto } from '@/lib/dto/response.dto';
import { UserDto } from '../../dto/user.dto';
import { mapUserToDto } from '../../mappers/user.mapper';

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
