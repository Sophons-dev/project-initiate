import { OrganizationDTO } from '@/features/organizations/types';

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
  organization?: OrganizationDTO;
};

export type CreateOpportunityDto = Omit<OpportunityDto, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateOpportunityDto = Partial<CreateOpportunityDto>;

export type OpportunityRecommendationDTO = {
  id: string;
  userId: string;
  opportunityId: string;
  score?: number | null;
  rank?: number | null;
  reasoning?: string | null;
  tagsMatched: string[];
  modelVersion?: string | null;
  createdAt?: Date | null;
  opportunity?: OpportunityDto;
};
