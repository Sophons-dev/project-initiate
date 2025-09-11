'use server';

import { OpportunityType, OpportunitySubtype, Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';
import { CreateOpportunityDto, OpportunityDto } from '../../dto';

export async function createOpportunity(input: CreateOpportunityDto): Promise<OpportunityDto> {
  const created = await db.opportunity.create({
    data: {
      type: input.type,
      subtype: input.subtype,
      title: input.title,
      description: input.description,
      matchReason: input.matchReason,

      // Core job details
      jobDescription: input.jobDescription,
      tags: input.tags,
      responsibilities: input.responsibilities,
      requirements: input.requirements,
      benefits: input.benefits,

      // Location details
      locationType: input.location.type,
      city: input.location.city,
      country: input.location.country,
      workLocation: input.location.workLocation,

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
      createdBy: input.createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    include: {
      organization: true,
    },
  });

  return toOpportunityDto(created);
}
