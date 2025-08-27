'use server';

import { db } from '@/lib/db';

export async function getQuestionsByUserType(
  userTypes: 'student' | 'professional'
) {
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
