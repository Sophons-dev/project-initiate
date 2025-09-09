import { Opportunity } from '@prisma/client';
import { OpportunityDto } from '@/features/opportunities/types';

export function toOpportunityDto(opportunity: Opportunity): OpportunityDto {
  return {
    id: opportunity.id,
    type: opportunity.type as unknown as string,
    subtype: (opportunity.subtype as unknown as string) ?? null,
    title: opportunity.title,
    description: opportunity.description ?? null,
    tags: opportunity.tags ?? [],
    organizationId: opportunity.organizationId,
    location: opportunity.location ?? null,
    deliveryMode: opportunity.deliveryMode ?? null,
    startDate: opportunity.startDate ?? null,
    endDate: opportunity.endDate ?? null,
    deadline: opportunity.deadline ?? null,
    metadata: (opportunity.metadata as unknown as Record<string, unknown>) ?? null,
    createdBy: opportunity.createdBy,
    createdAt: opportunity.createdAt ?? null,
    updatedAt: opportunity.updatedAt ?? null,
  };
}
