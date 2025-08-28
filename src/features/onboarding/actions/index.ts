'use server';

import { db } from '@/lib/db';
import type { Question, UserType } from '@prisma/client';

export async function getQuestionsByUserType(
  userTypes: UserType
): Promise<{ success: boolean; data?: Question[]; error?: string }> {
  try {
    const questions = await db.question.findMany({
      where: { userTypes: { has: userTypes } },
    });
    return { success: true, data: questions };
  } catch (error) {
    console.error('Error fetching questions:', error);
    return { success: false, error: 'Failed to fetch questions' };
  }
}
