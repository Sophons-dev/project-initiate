export type OrganizationDTO = {
  id: string;
  name: string;
  type: string;
  description?: string | null;
  website?: string | null;
  logoUrl?: string | null;
  location?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
