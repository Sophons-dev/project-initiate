'use server';

import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';
import { generateRecommendations } from '@/lib/agents/recommendation-agent/recommendation-generator';
import { Recommendation } from '@/lib/agents/recommendation-agent/types';
import { CreateOpportunityDto, OpportunityDto } from '@/features/opportunities/types';
import { createOpportunity } from '@/features/opportunities/actions/mutations/createOpportunity';
import { createOrganization, findOrganizationByName } from '@/features/organizations/actions';
import { createOpportunityRecommendation } from '../actions/mutations/createOpportunityRecommendation';

/**
 * Generates opportunity recommendations from an insight, creates any missing organizations and opportunities, records recommendation metadata, and returns the created opportunities.
 *
 * This function calls the recommendation service with the provided `generatedInsight`, normalizes the response to an array of recommendations, and processes each recommendation:
 * - Finds or creates an organization when the recommendation includes organization data.
 * - Builds a CreateOpportunityDto from the recommendation (with sensible defaults: empty tags array, `organizationId` fallback `'000000000000000000000000'`, and location `'Remote'` when missing).
 * - Creates an opportunity and then creates a corresponding opportunity recommendation record (uses modelVersion `'v1'` and a default score of 0).
 * Processing errors for individual recommendations are caught and logged; the function continues processing remaining recommendations.
 *
 * @param generatedInsight - The insight object used as context for generating recommendations; it will be stringified before sending to the recommendation service.
 * @param userId - ID of the user to set as the creator of created opportunities and to associate with created recommendation records.
 * @returns A promise that resolves to the array of created OpportunityDto objects (empty if none were created).
 */
export async function generateAndSaveOpportunities(
  generatedInsight: unknown,
  userId: string
): Promise<OpportunityDto[]> {
  const generatedRecommendations = await generateRecommendations({
    context: JSON.stringify(generatedInsight),
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
