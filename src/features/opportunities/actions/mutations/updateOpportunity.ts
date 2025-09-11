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
      description: input.description,
      matchReason: input.matchReason,

      // Core job details
      jobDescription: input.jobDescription,
      responsibilities: input.responsibilities,
      requirements: input.requirements,
      benefits: input.benefits,

      // Location details
      locationType: input.location?.type,
      city: input.location?.city,
      country: input.location?.country,
      workLocation: input.location?.workLocation,

      url: input.url,

      // Important dates
      postedDate: input.postedDate,
      applicationDeadline: input.applicationDeadline,
      daysAgoPosted: input.daysAgoPosted,

      // Core metadata for AI matching
      metadata: input.metadata as Prisma.InputJsonValue,

      // Company benefits
      companyBenefits: input.companyBenefits as Prisma.InputJsonValue,

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
