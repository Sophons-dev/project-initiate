'use client';

import Greeter from '@/components/layout/greeter';
import { useOpportunityDetailsContext } from './opportunity-details.provider';
import { OpportunityDto, OpportunityRecommendationDto } from '../dto';

const isOpportunityRecommendation = (
  opportunity: OpportunityDto | OpportunityRecommendationDto
): opportunity is OpportunityRecommendationDto => {
  return (opportunity as OpportunityRecommendationDto).userId !== undefined;
};

export const OpportunityDetailsHero = () => {
  const { opportunity } = useOpportunityDetailsContext();

  if (!opportunity) return null;

  // const baseOpportunity: OpportunityDto = isOpportunityRecommendation(opportunity)
  //   ? ((opportunity as OpportunityRecommendationDto).opportunity as OpportunityDto)
  //   : (opportunity as OpportunityDto);

  return (
    <Greeter
      action={{ title: 'View Recommendations', redirect: '/dashboard' }}
      message='Here are the list of opportunities that are available for you.'
    />
  );
};
