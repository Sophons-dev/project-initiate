'use server';

import { OpportunityType, Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';
import { OpportunityDto, UpdateOpportunityDto } from '../../dto';

export async function updateOpportunity(id: string, input: UpdateOpportunityDto): Promise<OpportunityDto> {
  const updated = await db.opportunity.update({
    where: { id },
    data: {
      type: input.type,
      subtype: input.subtype,
      title: input.title,
      shortDescription: input.shortDescription,
      longDescription: input.longDescription,

      // Generic content fields
      tags: input.tags,
      highlights: input.highlights,
      prerequisites: input.prerequisites,
      outcomes: input.outcomes,

      // Location details
      locationType: input.location?.type,
      city: input.location?.city,
      country: input.location?.country,
      workLocation: input.location?.workLocation,

      // Contact and application
      url: input.url,
      contactEmail: input.contactEmail,
      contactPhone: input.contactPhone,

      // Important dates
      postedDate: input.postedDate,
      applicationDeadline: input.applicationDeadline,
      startDate: input.startDate,
      endDate: input.endDate,

      // Type-specific metadata
      metadata: input.metadata as Prisma.InputJsonValue,

      // Organization benefits
      organizationBenefits: input.organizationBenefits as Prisma.InputJsonValue,

      // Organization reference
      organizationId: input.organizationId,
      updatedAt: new Date(),
    },
    include: {
      organization: true,
    },
  });

  return toOpportunityDto(updated);
}
