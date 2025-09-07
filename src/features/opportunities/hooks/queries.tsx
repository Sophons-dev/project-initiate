import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getOpportunitiesByOrganizationId,
  getOpportunityById,
} from '@/lib/mock/actions/opportunities';
import { getOpportunities } from '@/lib/mock/actions/opportunities';
import { OpportunityDTO, OpportunityRecommendationDTO } from '../types';
import {
  getUserRecommendationById,
  getUserRecommendations,
} from '@/lib/mock/actions/user';
import { getRelatedOpportunities } from '@/lib/mock/actions/opportunities';

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

export const useGetRecommendedOpportunities = (
  userId: string
): UseQueryResult<OpportunityRecommendationDTO[]> => {
  return useQuery<OpportunityRecommendationDTO[]>({
    queryKey: ['recommended-opportunities', userId],
    queryFn: () => getUserRecommendations(userId),
    enabled: !!userId,
  });
};

export const useGetRecommendedOpportunityById = (
  opportunityId: string,
  userId: string
): UseQueryResult<OpportunityRecommendationDTO | null> => {
  return useQuery<OpportunityRecommendationDTO | null>({
    queryKey: ['recommended-opportunity', opportunityId, userId],
    queryFn: () => getUserRecommendationById(opportunityId, userId),
    enabled: !!opportunityId,
  });
};

export const useGetRecommendedOpportunitiesByTags = (
  opportunityId: string,
  tags: string[]
): UseQueryResult<OpportunityDTO[]> => {
  return useQuery<OpportunityDTO[]>({
    queryKey: ['recommended-opportunities-by-tags', opportunityId, tags],
    queryFn: () => getRelatedOpportunities(opportunityId, tags),
    enabled: !!opportunityId && tags.length > 0,
  });
};
