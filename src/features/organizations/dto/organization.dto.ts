export type OrganizationDto = {
  id: string;
  name: string;
  type: string;
  aboutTheCompany?: string | null;
  website?: string | null;
  logoUrl?: string | null;
  location?: string | null;
  organizationUrl?: string | null;

  // Enhanced organization details for AI recommendations
  industry?: string | null;
  employmentSize?: string | null;
  companyRating?: number | null;
  reviewCount?: number | null;

  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export type CreateOrganizationDto = Omit<OrganizationDto, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateOrganizationDto = Partial<CreateOrganizationDto>;
