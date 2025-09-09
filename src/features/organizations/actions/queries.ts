'use server';

import { db } from '@/lib/db';

/**
 * Find an organization by exact name and return its id.
 *
 * @param name - Exact organization name to match.
 * @returns An object with the organization's `id`, or `null` if no organization matches.
 */
export async function findOrganizationByName(name: string): Promise<{ id: string } | null> {
  return db.organization.findFirst({ where: { name }, select: { id: true } });
}
