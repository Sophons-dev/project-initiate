import { OpportunityDto } from './opportunity.dto';

export type OpportunityRecommendationDto = {
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
