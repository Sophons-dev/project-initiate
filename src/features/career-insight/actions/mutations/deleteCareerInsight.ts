'use server';

import { db } from '@/lib/db';

/**
 * Delete the career insight record for the given user.
 *
 * Performs a permanent deletion of the `careerInsight` record associated with `userId` via the database client. Database errors will propagate to the caller.
 *
 * @param userId - ID of the user whose career insight should be deleted
 */
export async function deleteCareerInsight(userId: string): Promise<void> {
  await db.careerInsight.delete({ where: { userId } });
}
