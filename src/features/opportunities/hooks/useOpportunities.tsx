'use client';

import { useMutation, useQuery, UseMutationResult } from '@tanstack/react-query';
import { getRecommendationsByUserId, getOpportunityById } from '@/features/opportunities/actions';
import { useEffect } from 'react';
import { useProgress } from '@bprogress/next';
import { OpportunityDto, OpportunityRecommendationDto } from '../dto';
import { generateAndSaveOpportunities } from '../services/opportunity.service';
import { generateInsightsForUser } from '../../career-insight/services/insight.service';
import { upsertCareerInsight } from '@/features/career-insight/actions/mutations/upsertCareerInsight';
import { PaginationParams, PaginatedResponse } from '../types/pagination';

export const useGetUserOpportunitiesPaginated = (userId: string, paginationParams?: PaginationParams) => {
  const { start, stop } = useProgress();

  const query = useQuery<PaginatedResponse<OpportunityRecommendationDto>>({
    queryKey: ['user-opportunities-paginated', userId, paginationParams],
    queryFn: async () => {
      if (!userId)
        return {
          data: [],
          meta: { page: 1, limit: 10, total: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false },
        };
      return await getRecommendationsByUserId(userId, paginationParams);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isFetching) start();
    else stop();
  }, [query.isFetching, start, stop]);

  return {
    opportunities: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    error: query.error ?? null,
    refetch: query.refetch,
  };
};

export const useGenerateAndSaveOpportunities = (): UseMutationResult<
  OpportunityDto[],
  unknown,
  { context: string; userId: string }
> => {
  return useMutation<OpportunityDto[], unknown, { context: string; userId: string }>({
    mutationKey: ['save-opportunities'],
    mutationFn: async ({ context, userId }) => {
      const insights = await generateInsightsForUser(context);

      if (!insights) {
        return [];
      }

      await upsertCareerInsight(userId, {
        userId,
        summary: insights.summary,
        recommendedPaths: insights.recommendedPaths ?? null,
        skillsGap: (insights.skillsGap as unknown as Record<string, unknown>) ?? null,
        strengths: (insights.strengths as unknown as Record<string, unknown>) ?? null,
        interests: (insights.interests as unknown as Record<string, unknown>) ?? null,
        experienceLevel: insights.experienceLevel ?? null,
        preferredRoles: insights.preferredRoles ?? null,
      });

      const result = await generateAndSaveOpportunities(insights, userId);

      return result;
    },
  });
};

export const useGetOpportunityById = (id: string) => {
  const { start, stop } = useProgress();

  const query = useQuery<OpportunityDto | null>({
    queryKey: ['opportunity', id],
    queryFn: async () => {
      if (!id) return null;
      return await getOpportunityById(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isFetching) start();
    else stop();
  }, [query.isFetching, start, stop]);

  return {
    opportunity: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
