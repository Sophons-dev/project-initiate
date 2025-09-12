/* eslint-disable @typescript-eslint/no-explicit-any */

import { Opportunity, OpportunitySubtype, Organization } from '@prisma/client';
import { OpportunityDto, CreateOpportunityDto } from '../dto';
import { OrganizationDto } from '@/features/organizations/dto/organization.dto';

export function toOpportunityDto(opportunity: Opportunity & { organization?: Organization }): OpportunityDto {
  return {
    id: opportunity.id,
    type: opportunity.type,
    subtype: opportunity.subtype,
    title: opportunity.title,
    shortDescription: opportunity.shortDescription,
    longDescription: opportunity.longDescription,

    // Generic content fields
    tags: opportunity.tags || [],
    highlights: opportunity.highlights || [],
    prerequisites: opportunity.prerequisites || [],
    outcomes: opportunity.outcomes || [],

    // Location details
    location: {
      type: opportunity.locationType as 'remote' | 'onsite' | 'hybrid',
      city: opportunity.city,
      country: opportunity.country,
      workLocation: opportunity.workLocation,
    },

    // Contact and application
    url: opportunity.url,
    contactEmail: opportunity.contactEmail ?? undefined,
    contactPhone: opportunity.contactPhone ?? undefined,

    // Important dates
    postedDate: opportunity.postedDate,
    applicationDeadline: opportunity.applicationDeadline,
    startDate: opportunity.startDate ?? undefined,
    endDate: opportunity.endDate ?? undefined,

    // Type-specific metadata
    metadata: opportunity.metadata as any,

    // Organization benefits
    organizationBenefits: opportunity.organizationBenefits as any,

    // Organization reference
    organizationId: opportunity.organizationId,
    organization: opportunity.organization
      ? ({
          id: opportunity.organization.id,
          name: opportunity.organization.name,
          type: opportunity.organization.type,
          aboutTheCompany: opportunity.organization.aboutTheCompany,
          website: opportunity.organization.website,
          logoUrl: opportunity.organization.logoUrl,
          location: opportunity.organization.location,
          organizationUrl: opportunity.organization.organizationUrl,
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
        return 'other'; // Default to full-time for jobs
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
        return 'other'; // Default for courses
    }
  } else if (recommendationType === 'event') {
    // For events, map to event subtypes
    switch (recommendationSubtype) {
      case 'conference':
        return 'conference';
      case 'seminar':
        return 'seminar';
      case 'webinar':
        return 'webinar';
      case 'workshop':
        return 'workshop';
      case 'meetup':
        return 'meetup';
      case 'hackathon':
        return 'hackathon';
      case 'networking':
        return 'networking';
      default:
        return 'other'; // Default for events
    }
  }

  // Fallback - default to full_time for unknown types
  return 'other';
}

/**
 * Maps recommendation data to CreateOpportunityDto
 */
export function mapRecommendationToCreateDto(recommendation: any): CreateOpportunityDto {
  return {
    type: recommendation.type,
    subtype: mapSubtype(recommendation.type, recommendation.subtype, recommendation.metadata?.employmentType),
    title: recommendation.title,
    shortDescription: recommendation.shortDescription,
    longDescription: recommendation.longDescription,
    tags: recommendation.tags || [],
    highlights: recommendation.highlights || [],
    prerequisites: recommendation.prerequisites || [],
    outcomes: recommendation.outcomes || [],
    location: {
      type: recommendation.location.type,
      city: recommendation.location.city,
      country: recommendation.location.country,
      workLocation: recommendation.location.workLocation,
    },
    url: recommendation.url,
    contactEmail: recommendation.contactEmail,
    contactPhone: recommendation.contactPhone,
    postedDate: recommendation.postedDate,
    applicationDeadline: recommendation.applicationDeadline,
    startDate: recommendation.startDate,
    endDate: recommendation.endDate,
    metadata: recommendation.metadata,
    organizationBenefits: recommendation.organizationBenefits,
    organizationId: recommendation.organization?.id || '',
    createdBy: '', // This should be set by the service
  };
}
