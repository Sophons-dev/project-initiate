'use client';

import Greeter from '@/components/layout/greeter';
import { useOpportunityDetailsContext } from './opportunity-details.provider';

export const OpportunityDetailsHero = () => {
  const { opportunity } = useOpportunityDetailsContext();

  if (!opportunity) return null;

  return (
    <Greeter
      action={{ title: 'View Recommendations', redirect: '/dashboard' }}
      message='Here are the list of opportunities that are available for you.'
    />
  );
};
