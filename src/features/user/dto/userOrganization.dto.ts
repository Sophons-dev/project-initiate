import { OrganizationDto } from '@/features/organizations/dto/organization.dto';

export type UserOrganizationDto = {
  id: string;
  userId: string;
  organizationId: string;
  createdAt?: Date | null;
  organization?: OrganizationDto;
};
