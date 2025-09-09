'use server';

import { db } from '@/lib/db';

export async function deleteOpportunity(id: string): Promise<void> {
  await db.opportunity.delete({ where: { id } });
}
