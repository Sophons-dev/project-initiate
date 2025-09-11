import { Opportunity, OpportunitySubtype, OpportunityType } from '@prisma/client';
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

/**
 * Maps recommendation agent subtype to our OpportunitySubtype enum
 */
export function mapSubtype(
  recommendationType: string,
  recommendationSubtype: string,
  employmentType?: string
): OpportunitySubtype {
  if (recommendationType === 'job') {
    // For jobs, use employment type to determine subtype
    switch (employmentType) {
      case 'full-time':
        return 'full_time';
      case 'part-time':
        return 'part_time';
      case 'contract':
        return 'contract';
      case 'internship':
        return 'internship';
      case 'freelance':
        return 'freelance';
      case 'temporary':
        return 'temporary';
      default:
        return 'full_time'; // Default to full-time for jobs
    }
  } else if (recommendationType === 'course') {
    // For courses, use the subtype directly or default based on context
    switch (recommendationSubtype) {
      case 'course':
        return 'online_cert'; // Default course type
      case 'online_cert':
        return 'online_cert';
      case 'online_degree':
        return 'online_degree';
      case 'bootcamp':
        return 'bootcamp';
      case 'workshop':
        return 'workshop';
      case 'school_course':
        return 'school_course';
      default:
        return 'online_cert'; // Default for courses
    }
  }

  // Fallback - default to full_time for unknown types
  return 'full_time';
}
