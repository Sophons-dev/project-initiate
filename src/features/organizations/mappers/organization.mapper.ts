import { Organization } from '@prisma/client';
import { OrganizationDto } from '../dto/organization.dto';

export function toOrganizationDto(organization: Organization): OrganizationDto {
  return {
    id: organization.id,
    name: organization.name,
    type: organization.type as unknown as string,
    description: organization.description ?? null,
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

    createdAt: organization.createdAt ?? null,
    updatedAt: organization.updatedAt ?? null,
  };
}
