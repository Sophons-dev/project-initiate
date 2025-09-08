import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getOpportunitiesByOrganizationId, getOpportunityById } from '@/lib/mock/actions/opportunities';
import { getOpportunities } from '@/lib/mock/actions/opportunities';
import { getUserRecommendationById, getUserRecommendations } from '@/lib/mock/actions/user';
import { getRelatedOpportunities } from '@/lib/mock/actions/opportunities';
import { OpportunityDto, OpportunityRecommendationDTO } from '../dto';

export const useGetAllOpportunities = (): UseQueryResult<OpportunityDto[]> => {
  return useQuery<OpportunityDto[]>({
    queryKey: ['opportunities'],
    queryFn: () => getOpportunities(),
  });
};

export const useGetOpportunityById = (opportunityId: string): UseQueryResult<OpportunityDto | null> => {
  return useQuery<OpportunityDto | null>({
    queryKey: ['opportunity', opportunityId],
    queryFn: () => getOpportunityById(opportunityId),
    enabled: !!opportunityId,
  });
};

export const useGetOpportunitiesByOrganizationId = (organizationId: string): UseQueryResult<OpportunityDto[]> => {
  return useQuery<OpportunityDto[]>({
    queryKey: ['opportunities', organizationId],
    queryFn: () => getOpportunitiesByOrganizationId(organizationId),
    enabled: !!organizationId,
  });
};

export const useGetRecommendedOpportunities = (userId: string): UseQueryResult<OpportunityRecommendationDTO[]> => {
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
): UseQueryResult<OpportunityDto[]> => {
  return useQuery<OpportunityDto[]>({
    queryKey: ['recommended-opportunities-by-tags', opportunityId, tags],
    queryFn: () => getRelatedOpportunities(opportunityId, tags),
    enabled: !!opportunityId && tags.length > 0,
  });
};
