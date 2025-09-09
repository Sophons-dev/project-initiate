'use server';

import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';
import { generateRecommendations } from '@/lib/agents/recommendation-agent/recommendation-generator';
import { Recommendation } from '@/lib/agents/recommendation-agent/types';
import { CreateOpportunityDto, OpportunityDto } from '@/features/opportunities/types';
import { createOpportunity } from '@/features/opportunities/actions/mutations/createOpportunity';
import { createOrganization, findOrganizationByName } from '@/features/organizations/actions';
import { createOpportunityRecommendation } from '../actions/mutations/createOpportunityRecommendation';

export async function generateAndSaveOpportunities(context: string, userId: string): Promise<OpportunityDto[]> {
  const generatedInsights = await generateInsight({ context });

  const generatedRecommendations = await generateRecommendations({
    context: JSON.stringify(generatedInsights),
  });

  const recommendations = Array.isArray(generatedRecommendations?.recommendations)
    ? (generatedRecommendations.recommendations as Recommendation[])
    : [];

  const created: OpportunityDto[] = [];

  for (const recommendation of recommendations) {
    try {
      let organizationId: string | undefined;

      if (recommendation.organization?.name) {
        const existingOrg = await findOrganizationByName(recommendation.organization.name);
        if (existingOrg?.id) {
          organizationId = existingOrg.id;
        } else {
          const orgResponse = await createOrganization({
            name: recommendation.organization.name,
            type: recommendation.organization.type || 'other',
            organizationUrl: recommendation.organization.url,
          });
          if (orgResponse.success && orgResponse.data) {
            organizationId = orgResponse.data.id;
          }
        }
      }

      const payload: CreateOpportunityDto = {
        type: recommendation.type,
        title: recommendation.title,
        description: recommendation.description ?? null,
        tags: recommendation.tags ?? [],
        organizationId: organizationId || '000000000000000000000000',
        location:
          recommendation.location?.city && recommendation.location?.country
            ? `${recommendation.location.city}, ${recommendation.location.country}`
            : recommendation.location?.city || 'Remote',
        deliveryMode: recommendation.delivery_mode ?? null,
        startDate: recommendation.start_date ? new Date(recommendation.start_date) : null,
        endDate: recommendation.end_date ? new Date(recommendation.end_date) : null,
        deadline: recommendation.deadline ? new Date(recommendation.deadline) : null,
        metadata: recommendation.metadata as Record<string, unknown> | null,
        createdBy: userId,
      };

      const opp = await createOpportunity(payload);

      await createOpportunityRecommendation({
        userId,
        opportunityId: opp.id,
        score: 0,
        rank: created.length + 1,
        reasoning: recommendation.matchReason || 'Matches your interests',
        tagsMatched: opp.tags ?? [],
        modelVersion: 'v1',
      });

      created.push(opp);
    } catch (e) {
      console.error('Failed to process opportunity', e);
    }
  }

  return created;
}
