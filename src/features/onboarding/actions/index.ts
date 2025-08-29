'use server';

import { db } from '@/lib/db';
import type { Question } from '@prisma/client';
import { UserType } from '../types/question';

export async function getQuestionsByUserType(
  userType: UserType
): Promise<{ success: boolean; data?: Question[]; error?: string }> {
  try {
    const questions = await db.question.findMany({
      where: { userTypes: { has: userType } },
    });

    return { success: true, data: questions };
  } catch (error) {
    console.error('Error fetching questions:', error);
    return { success: false, error: 'Failed to fetch questions' };
  }
}
