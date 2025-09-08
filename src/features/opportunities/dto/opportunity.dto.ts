import { OrganizationDto } from '@/features/organizations/dto/organization.dto';

export type OpportunityDto = {
  id: string;
  type: string;
  subtype?: string | null;
  title: string;
  description?: string | null;
  tags: string[];
  organizationId: string;
  location?: string | null;
  deliveryMode?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  deadline?: Date | null;
  metadata?: Record<string, unknown> | null;
  createdBy: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  organization?: OrganizationDto | null;
};

export type CreateOpportunityDto = Omit<OpportunityDto, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateOpportunityDto = Partial<CreateOpportunityDto>;
