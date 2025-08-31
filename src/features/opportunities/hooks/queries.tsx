import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { opportunityData } from '@/lib/utils';
import { Opportunity } from '@/features/opportunities/components/opportunity-card';

// TODO: remove this dummy function once the backend is ready
const getOpportunities = async (): Promise<Opportunity[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(opportunityData);
    }, 1000); // Simulate network delay of 1 second
  });
};

// TODO: remove this dummy function once the backend is ready
const getOpportunityById = async (id: string): Promise<Opportunity | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        opportunityData.find(opportunity => opportunity.id === id) ?? null
      );
    }, 500); // Simulate network delay of 0.5 seconds
  });
};

export const useGetAllOpportunities = (): UseQueryResult<Opportunity[]> => {
  return useQuery<Opportunity[]>({
    queryKey: ['opportunities'],
    queryFn: () => getOpportunities(),
  });
};

export const useGetOpportunityById = (
  opportunityId: string
): UseQueryResult<Opportunity | null> => {
  return useQuery<Opportunity | null>({
    queryKey: ['opportunity', opportunityId],
    queryFn: () => getOpportunityById(opportunityId),
    enabled: !!opportunityId,
  });
};
