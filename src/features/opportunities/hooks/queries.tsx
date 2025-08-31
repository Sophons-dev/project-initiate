import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getOpportunitiesByOrganizationId,
  getOpportunityById,
} from '@/lib/mock/actions/opportunities';
import { getOpportunities } from '@/lib/mock/actions/opportunities';
import { OpportunityDTO } from '../types';

export const useGetAllOpportunities = (): UseQueryResult<OpportunityDTO[]> => {
  return useQuery<OpportunityDTO[]>({
    queryKey: ['opportunities'],
    queryFn: () => getOpportunities(),
  });
};

export const useGetOpportunityById = (
  opportunityId: string
): UseQueryResult<OpportunityDTO | null> => {
  return useQuery<OpportunityDTO | null>({
    queryKey: ['opportunity', opportunityId],
    queryFn: () => getOpportunityById(opportunityId),
    enabled: !!opportunityId,
  });
};

export const useGetOpportunitiesByOrganizationId = (
  organizationId: string
): UseQueryResult<OpportunityDTO[]> => {
  return useQuery<OpportunityDTO[]>({
    queryKey: ['opportunities', organizationId],
    queryFn: () => getOpportunitiesByOrganizationId(organizationId),
    enabled: !!organizationId,
  });
};
