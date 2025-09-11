'use server';

import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';
import { generateRecommendations } from '@/lib/agents/recommendation-agent/recommendation-generator';
import { Recommendation } from '@/lib/agents/recommendation-agent/types';
import { createOpportunity } from '@/features/opportunities/actions/mutations/createOpportunity';
import { createOrganization, getOrganizationByName } from '@/features/organizations/actions';
import { createOpportunityRecommendation } from '../actions/mutations/createOpportunityRecommendation';
import { CreateOpportunityDto, OpportunityDto } from '../dto';
import { OpportunitySubtype } from '@prisma/client';

/**
 * Maps recommendation agent subtype to our OpportunitySubtype enum
 */
function mapSubtype(
  recommendationType: string,
  recommendationSubtype: string,
  employmentType?: string
): OpportunitySubtype {
  if (recommendationType === 'job') {
    // For jobs, use employment type to determine subtype
    switch (employmentType) {
      case 'full-time':
        return 'full_time';
      case 'part-time':
        return 'part_time';
      case 'contract':
        return 'contract';
      case 'internship':
        return 'internship';
      case 'freelance':
        return 'freelance';
      case 'temporary':
        return 'temporary';
      default:
        return 'full_time'; // Default to full-time for jobs
    }
  } else if (recommendationType === 'course') {
    // For courses, use the subtype directly
    switch (recommendationSubtype) {
      case 'course':
        return 'online_cert';
      case 'online_cert':
        return 'online_cert';
      case 'online_degree':
        return 'online_degree';
      case 'bootcamp':
        return 'bootcamp';
      case 'workshop':
        return 'workshop';
      default:
        return 'online_cert';
    }
  }

  // Fallback
  return 'full_time';
}

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
        const existingOrg = await getOrganizationByName(recommendation.organization.name);

        if (existingOrg?.id) {
          organizationId = existingOrg.id;
        } else {
          const orgResponse = await createOrganization({
            name: recommendation.organization.name,
            type: recommendation.organization.type || 'other',
            aboutTheCompany: recommendation.organization.aboutTheCompany,
            website: recommendation.organization.website,
            logoUrl: recommendation.organization.logoUrl,
            location: recommendation.organization.location,
            organizationUrl: recommendation.organization.organizationUrl,
            industry: recommendation.organization.industry,
            employmentSize: recommendation.organization.employmentSize,
            companyRating: recommendation.organization.companyRating,
            reviewCount: recommendation.organization.reviewCount,
          });

          if (orgResponse.success && orgResponse.data) {
            organizationId = orgResponse.data.id;
          }
        }
      }

      const payload: CreateOpportunityDto = {
        type: recommendation.type as OpportunityDto['type'],
        subtype: mapSubtype(recommendation.type, recommendation.subtype, recommendation.metadata.employmentType),
        title: recommendation.title,
        description: recommendation.description,
        matchReason: recommendation.matchReason,

        // Core job details
        jobDescription: recommendation.jobDescription,
        responsibilities: recommendation.responsibilities,
        requirements: recommendation.requirements,
        benefits: recommendation.benefits,

        // Location details
        location: {
          type: recommendation.location.type,
          city: recommendation.location.city,
          country: recommendation.location.country,
          workLocation: recommendation.location.workLocation,
        },

        url: recommendation.url,

        // Important dates
        postedDate: recommendation.postedDate,
        applicationDeadline: recommendation.applicationDeadline,
        daysAgoPosted: recommendation.daysAgoPosted,

        // Core metadata for AI matching
        metadata: recommendation.metadata,

        // Company benefits
        companyBenefits: recommendation.companyBenefits,

        // Organization reference
        organizationId: organizationId || '',
        createdBy: userId,
      };

      const opp = await createOpportunity(payload);

      await createOpportunityRecommendation({
        userId,
        opportunityId: opp.id,
        score: recommendation.metadata.matchScore.skillsMatched,
        rank: created.length + 1,
        reasoning: recommendation.matchReason || 'Matches your interests',
        tagsMatched: recommendation.metadata.requiredSkills,
        modelVersion: 'v1',
      });

      created.push(opp);
    } catch (e) {
      console.error('Failed to process opportunity', e);
    }
  }

  return created;
}
