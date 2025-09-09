'use server';

import { OpportunityType, CourseSubtype, Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { OpportunityDto, UpdateOpportunityDto } from '@/features/opportunities/types';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';

/**
 * Updates an existing Opportunity by ID with values from an UpdateOpportunityDto and returns the updated OpportunityDto.
 *
 * The function maps `input.type` (case-insensitive) to the Prisma `OpportunityType` enum (`'job'` → OpportunityType.job, any other provided value → OpportunityType.course). When optional fields on `input` are omitted or null/undefined they are not changed on the record; provided fields overwrite existing values. `input.subtype` is cast to `CourseSubtype` when present, and `input.metadata` is cast to `Prisma.JsonValue`. `updatedAt` is set to the current time.
 *
 * @param id - The ID of the Opportunity to update.
 * @param input - Partial update payload; only provided fields will be applied.
 * @returns The updated Opportunity as an OpportunityDto.
 */
export async function updateOpportunity(id: string, input: UpdateOpportunityDto): Promise<OpportunityDto> {
  const normalizedType = input.type ? input.type.toString().toLowerCase() : undefined;

  const updated = await db.opportunity.update({
    where: { id },
    data: {
      type: normalizedType ? (normalizedType === 'job' ? OpportunityType.job : OpportunityType.course) : undefined,
      subtype: input.subtype ? (input.subtype as CourseSubtype) : undefined,
      title: input.title,
      description: input.description ?? undefined,
      tags: input.tags ?? undefined,
      organizationId: input.organizationId,
      location: input.location ?? undefined,
      deliveryMode: input.deliveryMode ?? undefined,
      startDate: input.startDate ?? undefined,
      endDate: input.endDate ?? undefined,
      deadline: input.deadline ?? undefined,
      metadata: (input.metadata as unknown as Prisma.JsonValue) ?? undefined,
      updatedAt: new Date(),
    },
  });

  return toOpportunityDto(updated);
}
