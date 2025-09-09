'use server';

import { OpportunityType, CourseSubtype, Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { CreateOpportunityDto, OpportunityDto } from '@/features/opportunities/types';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';

/**
 * Create a new Opportunity record in the database and return it as an OpportunityDto.
 *
 * Normalizes `input.type` (case-insensitive) to determine the OpportunityType (`'job'` => OpportunityType.job, otherwise OpportunityType.course).
 * Fields on `input` are mapped with sensible defaults: nullable fields become `null` when absent, `tags` defaults to `[]`, `metadata` is cast to `Prisma.JsonValue` if provided, and `createdAt`/`updatedAt` are set to the current timestamp.
 *
 * @param input - Data for the opportunity to create; see CreateOpportunityDto for field meanings. Only `type` receives special normalization as described above.
 * @returns The created opportunity mapped to an OpportunityDto.
 */
export async function createOpportunity(input: CreateOpportunityDto): Promise<OpportunityDto> {
  const normalizedType = (input.type || '').toString().toLowerCase();
  const typeEnum = normalizedType === 'job' ? OpportunityType.job : OpportunityType.course;

  const created = await db.opportunity.create({
    data: {
      type: typeEnum,
      subtype: input.subtype ? (input.subtype as CourseSubtype) : undefined,
      title: input.title,
      description: input.description ?? null,
      tags: input.tags ?? [],
      organizationId: input.organizationId,
      location: input.location ?? null,
      deliveryMode: input.deliveryMode ?? null,
      startDate: input.startDate ?? null,
      endDate: input.endDate ?? null,
      deadline: input.deadline ?? null,
      metadata: (input.metadata as unknown as Prisma.JsonValue) ?? null,
      createdBy: input.createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return toOpportunityDto(created);
}
