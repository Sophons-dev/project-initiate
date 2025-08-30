'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { opportunityData } from '@/lib/utils';
import { Opportunity } from '@/components/shared/cards/recommended-opportunity-card';

// TODO: remove this dummy function once the backend is ready
const getOpportunities = async (): Promise<Opportunity[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(opportunityData);
    }, 1000); // Simulate network delay of 1 second
  });
};

export const useOpportunities = (): UseQueryResult<Opportunity[]> => {
  return useQuery<Opportunity[]>({
    queryKey: ['opportunities'],
    queryFn: () => getOpportunities(),
  });
};
