'use server';

import { OpportunityType, CourseSubtype, Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { OpportunityDto, UpdateOpportunityDto } from '@/features/opportunities/types';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';

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
