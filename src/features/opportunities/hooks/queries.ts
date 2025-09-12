// TODO: Remove this file when we have a real backend to fetch data from

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getOpportunitiesByOrganizationId } from '@/lib/mock/actions/opportunities';
import { getOpportunities } from '@/lib/mock/actions/opportunities';
import { getUserRecommendationById, getUserRecommendations } from '@/lib/mock/actions/user';
import { getRelatedOpportunities } from '@/lib/mock/actions/opportunities';
import { OpportunityDto, OpportunityRecommendationDto } from '../dto';
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

export const useGetAllOpportunities = (): UseQueryResult<OpportunityDto[]> => {
  return useQuery<OpportunityDto[]>({
    queryKey: ['opportunities'],
    queryFn: () => getOpportunities(),
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
