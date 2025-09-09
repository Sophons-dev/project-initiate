import { UserOpportunityStatus } from '@prisma/client';
import { OpportunityDto } from '@/features/opportunities/dto/opportunity.dto';

export type UserOpportunityDto = {
  id: string;
  userId: string;
  opportunityId: string;
  status: UserOpportunityStatus;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  opportunity?: OpportunityDto;
};
