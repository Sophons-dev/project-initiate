'use client';

import { useMutation, useQuery, UseMutationResult } from '@tanstack/react-query';
import { getRecommendationsByUserId } from '@/features/opportunities/actions';
import { useEffect } from 'react';
import { useProgress } from '@bprogress/next';
import { OpportunityDto, OpportunityRecommendationDto } from '../dto';
import { generateAndSaveOpportunities } from '../services/opportunity.service';
import { generateInsightsForUser } from '../../career-insight/services/insight.service';

export const useGetUserOpportunities = (userId: string) => {
  const { start, stop } = useProgress();

  const query = useQuery<OpportunityRecommendationDto[]>({
    queryKey: ['user-opportunities', userId],
    queryFn: async () => {
      if (!userId) return [];
      return await getRecommendationsByUserId(userId);
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
    opportunities: query.data ?? [],
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
      return await generateAndSaveOpportunities(JSON.stringify(context), userId);
    },
  });
};
