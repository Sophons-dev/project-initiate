import { Organization, Opportunity } from '@prisma/client';
import { OrganizationDto } from '../dto/organization.dto';
import { toOpportunityDto } from '@/features/opportunities/mappers/opportunity.mapper';

export function toOrganizationDto(organization: Organization & { opportunities?: Opportunity[] }): OrganizationDto {
  return {
    id: organization.id,
    name: organization.name,
    type: organization.type as unknown as string,
    isPartner: organization.isPartner,
    website: organization.website ?? null,
    logoUrl: organization.logoUrl ?? null,
    location: organization.location ?? null,
    organizationUrl: organization.organizationUrl ?? null,

    // Enhanced organization details for AI recommendations
    aboutTheCompany: organization.aboutTheCompany ?? null,
    industry: organization.industry ?? null,
    employmentSize: organization.employmentSize ?? null,
    companyRating: organization.companyRating ?? null,
    reviewCount: organization.reviewCount ?? null,

    // Relations
    opportunities: organization.opportunities
      ? organization.opportunities.map(o => toOpportunityDto(o as Opportunity))
      : undefined,

    createdAt: organization.createdAt ?? null,
    updatedAt: organization.updatedAt ?? null,
  };
}
