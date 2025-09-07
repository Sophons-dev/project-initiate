'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  Opportunity,
  OpportunitySchema,
} from '@/features/opportunities/components/opportunity-card';
import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';
import { generateRecommendations } from '@/lib/agents/recommendation-agent/recommendation-generator';

// TODO: Implement DB Fetch and Upload logic
// [ ] Check DB for existing opportunities, if none, generate new ones
// [ ] Use Scraped Data for opportunity recommendation
// PS: I got lost in the code, didn't know how relationships work in prisma, so I decided to use the generated recommendations as a starting point. Thanks and sorry 🙏

async function getRecommendations({
  context,
  userId,
}: {
  context: string;
  userId: string;
}): Promise<Opportunity[]> {
  console.log(userId);
  try {
    // If no existing opportunities, generate new ones
    console.log('Started generation');
    const insights = await generateInsight({ context });
    console.log('insights generated', insights);

    console.log('started recommendation generation');
    const recommendations = await generateRecommendations({
      context: JSON.stringify(insights),
    });
    console.log('recommendations generated', recommendations);

    if (!recommendations?.recommendations) {
      return [];
    }

    const opportunities: Opportunity[] = recommendations.recommendations.map(
      recommendation => ({
        id: 'temp-' + Math.random().toString(36).substring(2, 9),
        type: recommendation.type,
        typeColor: '#4CAF50',
        date: recommendation.start_date,
        title: recommendation.title,
        organization:
          recommendation.organization?.name || 'Unknown Organization',
        location: recommendation.location?.city || 'Remote',
        description: recommendation.description,
        matchReason: 'Matches your interests',
        dueDate: recommendation.deadline || 'No deadline',
      })
    );

    // Parse and validate the created opportunities
    const parsedOpportunities = OpportunitySchema.array().parse(opportunities);

    return parsedOpportunities;
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
