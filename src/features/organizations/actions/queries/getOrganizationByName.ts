'use server';

import { db } from '@/lib/db';

export async function getOrganizationByName(name: string): Promise<{ id: string } | null> {
  return db.organization.findFirst({ where: { name }, select: { id: true } });
}
