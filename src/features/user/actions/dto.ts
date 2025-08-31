import { OpportunityDTO } from '@/features/opportunities/types';
import { OrganizationDTO } from '@/features/organizations/types';

export type UserOpportunityDTO = {
  id: string;
  userId: string;
  opportunityId: string;
  type: 'SAVED' | 'APPLIED'; // or enum
  createdAt?: Date | null;
  opportunity?: OpportunityDTO;
};

export type UserOrganizationDTO = {
  id: string;
  userId: string;
  organizationId: string;
  createdAt?: Date | null;
  organization?: OrganizationDTO;
};
