'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Opportunity } from '@/features/opportunities/components/opportunity-card';
import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';
import { generateRecommendations } from '@/lib/agents/recommendation-agent/recommendation-generator';

// TODO: Refactor, uses hacky solution. Also add logic to save opportunities to db if not already saved.
async function getRecommendations({
  context,
}: {
  context: string;
}): Promise<Opportunity[]> {
  try {
    const insights = await generateInsight({ context });
    const opportunities = await generateRecommendations({
      context: JSON.stringify(insights),
    });

    if (!opportunities?.recommendations) {
      return [];
    }

    return opportunities.recommendations.map((data, i) => ({
      id: i,
      type: data.type,
      typeColor: 'green',
      date: data.start_date,
      title: data.title,
      organization: data.organization.name,
      location: data.location.country + ', ' + data.location.city,
      description: data.description,
      matchReason: data.matchReason,
      dueDate: data.end_date,
    }));
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
}

export const useOpportunities = ({
  context,
}: {
  context: string;
}): UseQueryResult<Opportunity[]> => {
  return useQuery<Opportunity[]>({
    queryKey: ['opportunities'],
    queryFn: async () => await getRecommendations({ context }),
    enabled: !!context,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
