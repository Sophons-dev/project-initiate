'use server';

import { db } from '@/lib/db';

export async function deleteCareerInsight(userId: string): Promise<void> {
  await db.careerInsight.delete({ where: { userId } });
}
