'use server';

import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';
import { generateRecommendations } from '@/lib/agents/recommendation-agent/recommendation-generator';
import { Recommendation } from '@/lib/agents/recommendation-agent/types';
import { createOpportunity } from '@/features/opportunities/actions/mutations/createOpportunity';
import { createOrganization, getOrganizationByName } from '@/features/organizations/actions';
import { createOpportunityRecommendation } from '../actions/mutations/createOpportunityRecommendation';
import { CreateOpportunityDto, OpportunityDto } from '../dto';
import { OpportunitySubtype, OpportunityType } from '@prisma/client';
import { mapSubtype } from '../mappers/opportunity.mapper';

export async function generateAndSaveOpportunities(
  generatedInsight: unknown,
  userId: string
): Promise<OpportunityDto[]> {
  console.log('🚀 Starting opportunity generation for user:', userId);

  const generatedRecommendations = await generateRecommendations({
    context: JSON.stringify(generatedInsight),
  });

  console.log('📋 Generated recommendations:', generatedRecommendations);

  const recommendations = Array.isArray(generatedRecommendations?.recommendations)
    ? (generatedRecommendations.recommendations as Recommendation[])
    : [];

  console.log('📊 Processing', recommendations.length, 'recommendations');

  const created: OpportunityDto[] = [];

  for (const recommendation of recommendations) {
    try {
      console.log('🔄 Processing recommendation:', recommendation.title);
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

      const mappedSubtype = mapSubtype(
        recommendation.type,
        recommendation.subtype,
        recommendation.metadata?.employmentType
      );
      console.log(
        `🔄 Mapping subtype: "${recommendation.subtype}" (type: "${recommendation.type}", employmentType: "${recommendation.metadata?.employmentType}") -> "${mappedSubtype}"`
      );

      const payload: CreateOpportunityDto = {
        type: recommendation.type as OpportunityType,
        subtype: mappedSubtype,
        title: recommendation.title,
        description: recommendation.description,
        matchReason: recommendation.matchReason,

        // Core job details
        jobDescription: recommendation.jobDescription,
        tags: recommendation.metadata?.requiredSkills || [],
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

      console.log('💾 Creating opportunity with payload:', JSON.stringify(payload, null, 2));
      const opp = await createOpportunity(payload);
      console.log('✅ Opportunity created successfully:', opp.id);

      console.log('🔗 Creating opportunity recommendation...');
      await createOpportunityRecommendation({
        userId,
        opportunityId: opp.id,
        score: recommendation.metadata.matchScore.skillsMatched,
        rank: created.length + 1,
        reasoning: recommendation.matchReason || 'Matches your interests',
        tagsMatched: recommendation.metadata.requiredSkills,
        modelVersion: 'v1',
      });
      console.log('✅ Recommendation created successfully');

      created.push(opp);
      console.log('📈 Total opportunities created so far:', created.length);
    } catch (e) {
      console.error('❌ Failed to process opportunity:', e);
      console.error('Recommendation data:', recommendation);
    }
  }

  console.log('🎉 Opportunity generation completed. Total created:', created.length);
  return created;
}
