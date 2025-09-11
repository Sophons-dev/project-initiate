import { Opportunity, OpportunityType } from '@prisma/client';
import { OpportunityDto } from '../dto';
import { OrganizationDto } from '@/features/organizations/dto/organization.dto';

export function toOpportunityDto(opportunity: Opportunity & { organization?: any }): OpportunityDto {
  return {
    id: opportunity.id,
    type: opportunity.type,
    subtype: opportunity.subtype,
    title: opportunity.title,
    description: opportunity.description,
    matchReason: opportunity.matchReason,

    // Core job details
    tags: opportunity.tags || [],
    jobDescription: opportunity.jobDescription,
    responsibilities: opportunity.responsibilities,
    requirements: opportunity.requirements,
    benefits: opportunity.benefits,

    // Location details
    location: {
      type: opportunity.locationType as 'remote' | 'onsite' | 'hybrid',
      city: opportunity.city,
      country: opportunity.country,
      workLocation: opportunity.workLocation,
    },

    url: opportunity.url,

    // Important dates
    postedDate: opportunity.postedDate,
    applicationDeadline: opportunity.applicationDeadline,
    daysAgoPosted: opportunity.daysAgoPosted,

    // Core metadata for AI matching
    metadata: opportunity.metadata as any,

    // Company benefits
    companyBenefits: opportunity.companyBenefits as any,

    // Organization reference
    organizationId: opportunity.organizationId,
    organization: opportunity.organization
      ? ({
          id: opportunity.organization.id,
          name: opportunity.organization.name,
          type: opportunity.organization.type,
          description: opportunity.organization.description,
          website: opportunity.organization.website,
          logoUrl: opportunity.organization.logoUrl,
          location: opportunity.organization.location,
          organizationUrl: opportunity.organization.organizationUrl,
          aboutTheCompany: opportunity.organization.aboutTheCompany,
          industry: opportunity.organization.industry,
          employmentSize: opportunity.organization.employmentSize,
          companyRating: opportunity.organization.companyRating,
          reviewCount: opportunity.organization.reviewCount,
          createdAt: opportunity.organization.createdAt,
          updatedAt: opportunity.organization.updatedAt,
        } as OrganizationDto)
      : null,

    // System fields
    createdBy: opportunity.createdBy,
    createdAt: opportunity.createdAt ?? null,
    updatedAt: opportunity.updatedAt ?? null,
  };
}
