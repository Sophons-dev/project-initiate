export type OrganizationDto = {
  id: string;
  name: string;
  type: string;
  description?: string | null;
  website?: string | null;
  logoUrl?: string | null;
  location?: string | null;
  organizationUrl?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export type CreateOrganizationDto = Omit<OrganizationDto, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateOrganizationDto = Partial<CreateOrganizationDto>;
