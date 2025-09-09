'use server';

import { db } from '@/lib/db';

/**
 * Delete an opportunity record by its ID.
 *
 * Deletes the opportunity row with the given `id` from the database. The promise
 * resolves when the deletion completes; any database errors propagate to the caller.
 *
 * @param id - The unique identifier of the opportunity to remove
 * @returns A promise that resolves when the deletion has finished
 */
export async function deleteOpportunity(id: string): Promise<void> {
  await db.opportunity.delete({ where: { id } });
}
