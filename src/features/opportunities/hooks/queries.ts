import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getOpportunities } from '@/features/opportunities/actions';
import { getOpportunitiesByOrganizationId } from '@/lib/mock/actions/opportunities';
import { getUserRecommendationById, getUserRecommendations } from '@/lib/mock/actions/user';
import { getRelatedOpportunities } from '@/lib/mock/actions/opportunities';
import { OpportunityDto, OpportunityRecommendationDto } from '../dto';
import { PaginationParams, PaginatedResponse } from '../types/pagination';
import type { Insight } from '@/lib/agents/insight-agent/types';
import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';

export const useGenerateUserInsights = (context: string): UseQueryResult<Insight | null> => {
  return useQuery<Insight | null>({
    queryKey: ['generated-insights', context],
    queryFn: async (): Promise<Insight | null> => {
      return await generateInsight({ context });
    },
    enabled: !!context,
  });
};

export const useGetAllOpportunities = (
  paginationParams?: PaginationParams
): UseQueryResult<PaginatedResponse<OpportunityDto>> => {
  return useQuery<PaginatedResponse<OpportunityDto>>({
    queryKey: ['opportunities', paginationParams],
    queryFn: () => getOpportunities(paginationParams),
  });
};

export const useGetOpportunitiesByOrganizationId = (organizationId: string): UseQueryResult<OpportunityDto[]> => {
  return useQuery<OpportunityDto[]>({
    queryKey: ['opportunities', organizationId],
    queryFn: () => getOpportunitiesByOrganizationId(organizationId),
    enabled: !!organizationId,
  });
};

export const useGetRecommendedOpportunities = (userId: string): UseQueryResult<OpportunityRecommendationDto[]> => {
  return useQuery<OpportunityRecommendationDto[]>({
    queryKey: ['recommended-opportunities', userId],
    queryFn: () => getUserRecommendations(userId),
    enabled: !!userId,
  });
};

export const useGetRecommendedOpportunityById = (
  opportunityId: string,
  userId: string
): UseQueryResult<OpportunityRecommendationDto | null> => {
  return useQuery<OpportunityRecommendationDto | null>({
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
