'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Opportunity, OpportunitySchema } from '@/features/opportunities/components/opportunity-card';
import { generateAndSaveOpportunities, getRecommendationsByUserId } from '@/features/opportunities/actions';
import { useEffect, useState } from 'react';
import { useProgress } from '@bprogress/next';
import { OpportunityDto } from '../dto';

export const useGetUserOpportunities = (userId: string) => {
  const { start, stop } = useProgress();

  const query = useQuery<OpportunityDto[]>({
    queryKey: ['user-opportunities', userId],
    queryFn: async () => {
      if (!userId) return [];
      const recs = await getRecommendationsByUserId(userId);
      const opps = (recs || []).map(r => r.opportunity).filter(Boolean) as OpportunityDto[];
      return opps;
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

async function getRecommendations({ context, userId }: { context: string; userId: string }): Promise<Opportunity[]> {
  console.log(userId);
  try {
    const saved = await generateAndSaveOpportunities(context, userId);

    // Map saved DTOs to the UI card shape
    const mapped: Opportunity[] = saved.map(o => ({
      type: o.type,
      title: o.title,
      description: o.description || '',
      tags: o.tags,
      organization: {
        name: o.organization?.name || 'AI Generated Organization',
        url: o.organization?.website || undefined,
      },
      location: o.location || 'Remote',
      date: o.startDate ? new Date(o.startDate).toISOString() : new Date().toISOString(),
      deliveryMode: o.deliveryMode || undefined,
      startDate: o.startDate ? new Date(o.startDate).toISOString() : null,
      endDate: o.endDate ? new Date(o.endDate).toISOString() : null,
      deadline: o.deadline ? new Date(o.deadline).toISOString() : null,
      metadata: (o.metadata as any) || null,
      createdBy: o.createdBy,
      createdAt: o.createdAt?.toISOString?.() || new Date().toISOString(),
      updatedAt: o.updatedAt?.toISOString?.() || new Date().toISOString(),
      matchReason: 'Matches your interests',
      dueDate: o.deadline ? new Date(o.deadline).toISOString() : 'No deadline',
    }));

    // Validate the UI shape before returning
    return OpportunitySchema.array().parse(mapped);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
}

export const useOpportunities = ({
  context,
  userId,
}: {
  context: string;
  userId: string;
}): UseQueryResult<Opportunity[]> => {
  return useQuery<Opportunity[]>({
    queryKey: ['opportunities', userId],
    queryFn: async () => await getRecommendations({ context, userId }),
    enabled: !!context && !!userId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};
