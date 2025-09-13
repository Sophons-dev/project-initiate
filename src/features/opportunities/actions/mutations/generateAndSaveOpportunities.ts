'use server';

import { generateRecommendations } from '@/lib/agents/recommendation-agent/recommendation-generator';
import { Recommendation } from '@/lib/agents/recommendation-agent/types';
import { createOpportunity } from '@/features/opportunities/actions/mutations/createOpportunity';
import { createOrganization, getOrganizationByName } from '@/features/organizations/actions';
import { createOpportunityRecommendation } from './createOpportunityRecommendation';
import { CreateOpportunityDto, OpportunityDto } from '../../dto';
import { OpportunityType } from '@prisma/client';
import { mapSubtype, toOpportunityDto } from '../../mappers/opportunity.mapper';
import { db } from '@/lib/db';

export async function generateAndSaveOpportunities(
  generatedInsight: unknown,
  userId: string
): Promise<OpportunityDto[]> {
  // Idempotency guard: if recommendations already exist for this user, return them instead of regenerating
  try {
    const existingRecs = await db.opportunityRecommendation.findMany({
      where: { userId },
      orderBy: [{ rank: 'asc' }, { createdAt: 'desc' }],
      include: { opportunity: { include: { organization: true } } },
      take: 10,
    });

    if (existingRecs.length > 0) {
      const existingOpps: OpportunityDto[] = existingRecs
        .map(r => r.opportunity)
        .filter((opp): opp is NonNullable<typeof opp> => Boolean(opp))
        .map(opp => ({ ...toOpportunityDto(opp), organization: opp.organization }));
      if (existingOpps.length > 0) {
        return existingOpps;
      }
    }
  } catch (e) {
    // If the guard fails, proceed with generation rather than blocking
    console.warn('Idempotency guard failed, proceeding with generation', e);
  }

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
            isPartner: false,
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

      // Map subtype to ensure it aligns with our enum
      const mappedSubtype = mapSubtype(
        recommendation.type,
        recommendation.subtype,
        recommendation.metadata?.employmentType
      );

      const payload: CreateOpportunityDto = {
        type: recommendation.type as OpportunityType,
        subtype: mappedSubtype,
        title: recommendation.title,
        shortDescription: recommendation.shortDescription,
        longDescription: recommendation.longDescription,

        // Generic content fields
        tags: recommendation.tags || [],
        highlights: recommendation.highlights || [],
        prerequisites: recommendation.prerequisites || [],
        outcomes: recommendation.outcomes || [],

        // Location details
        location: {
          type: recommendation.location.type,
          city: recommendation.location.city,
          country: recommendation.location.country,
          workLocation: recommendation.location.workLocation,
        },

        // Contact and application
        url: recommendation.url,
        contactEmail: recommendation.contactEmail,
        contactPhone: recommendation.contactPhone,

        // Important dates
        postedDate: recommendation.postedDate,
        applicationDeadline: recommendation.applicationDeadline,
        startDate: recommendation.startDate,
        endDate: recommendation.endDate,

        // Type-specific metadata
        metadata: recommendation.metadata,

        // Organization benefits
        organizationBenefits: recommendation.organizationBenefits,

        // Organization reference
        organizationId: organizationId || '',
        createdBy: userId,
      };

      // Idempotent opportunity upsert: try to reuse an existing opportunity that looks identical
      let opp = await db.opportunity.findFirst({
        where: {
          title: payload.title,
          organizationId: payload.organizationId,
          url: payload.url,
        },
        include: { organization: true },
      });

      if (!opp) {
        const createdOpp = await createOpportunity(payload);
        // Fetch with organization for DTO mapping consistency
        opp = await db.opportunity.findUnique({
          where: { id: createdOpp.id },
          include: { organization: true },
        });
      }

      if (!opp) {
        throw new Error('Failed to create or fetch opportunity');
      }

      // Idempotent recommendation: skip if already exists for this user/opportunity
      const existingRec = await db.opportunityRecommendation.findFirst({
        where: { userId, opportunityId: opp.id },
      });

      if (!existingRec) {
        await createOpportunityRecommendation({
          userId,
          opportunityId: opp.id,
          score: recommendation.metadata.matchScore.skillsMatched,
          rank: created.length + 1,
          reasoning: recommendation.matchReason || 'Matches your interests',
          tagsMatched: recommendation.metadata.requiredSkills,
          modelVersion: 'v1',
        });
      }

      created.push({ ...toOpportunityDto(opp), organization: opp.organization });
    } catch (e) {
      console.error('❌ Failed to process opportunity:', e);
      console.error('Recommendation data:', recommendation);
    }
  }

  console.log('🎉 Opportunity generation completed. Total created:', created.length);
  return created;
}
