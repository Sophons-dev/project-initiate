'use server';

import { OpportunityType, CourseSubtype, Prisma, Opportunity } from '@prisma/client';
import { CreateOpportunityDto, OpportunityDto } from '../dto';
import { db } from '@/lib/db';
import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';
import { generateRecommendations } from '@/lib/agents/recommendation-agent/recommendation-generator';
import { randomBytes } from 'crypto';
import { Recommendation } from '@/lib/agents/recommendation-agent/types';
import { createOrganization } from '@/features/organizations/actions/mutations';

export async function createOpportunity(input: CreateOpportunityDto): Promise<OpportunityDto> {
  console.log('Creating opportunity with data:', input);

  try {
    const normalizedType = (input.type || '').toString().toLowerCase();
    const typeEnum = normalizedType === 'job' ? OpportunityType.job : OpportunityType.course;

    const created = await db.opportunity.create({
      data: {
        type: typeEnum,
        subtype: input.subtype ? (input.subtype as CourseSubtype) : undefined,
        title: input.title,
        description: input.description ?? null,
        tags: input.tags ?? [],
        organizationId: input.organizationId,
        location: input.location ?? null,
        deliveryMode: input.deliveryMode ?? null,
        startDate: input.startDate ?? null,
        endDate: input.endDate ?? null,
        deadline: input.deadline ?? null,
        metadata: (input.metadata as unknown as Prisma.JsonValue) ?? null,
        createdBy: input.createdBy,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return convertToDto(created);
  } catch (error) {
    console.error('Error creating opportunity:', error);
    throw new Error('Failed to create opportunity');
  }
}

export async function generateAndSaveOpportunities(context: string, userId: string): Promise<OpportunityDto[]> {
  const insights = await generateInsight({ context });
  const generatedRecommendations = await generateRecommendations({
    context: JSON.stringify(insights),
  });

  const recommendations = Array.isArray(generatedRecommendations?.recommendations)
    ? (generatedRecommendations.recommendations as Recommendation[])
    : [];

  // Process opportunities in sequence to handle organization creation properly
  const created: OpportunityDto[] = [];

  for (const recommendation of recommendations) {
    try {
      let organizationId: string | undefined;

      // If organization data is provided, try to find or create it
      if (recommendation.organization?.name) {
        // First try to find existing organization
        const existingOrg = await db.organization.findFirst({
          where: { name: recommendation.organization.name },
          select: { id: true },
        });

        if (existingOrg) {
          organizationId = existingOrg.id;
        } else {
          // Create new organization if it doesn't exist
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

      // Create recommendation entry
      try {
        await db.opportunityRecommendation.create({
          data: {
            userId,
            opportunityId: opp.id,
            score: 0,
            rank: created.length + 1,
            reasoning: recommendation.matchReason || 'Matches your interests',
            tagsMatched: opp.tags ?? [],
            modelVersion: 'v1',
            createdAt: new Date(),
          },
        });
      } catch (recErr) {
        console.error('Failed to create opportunity recommendation', recErr);
      }

      created.push(opp);
    } catch (e) {
      console.error('Failed to process opportunity', e);
    }
  }

  return created;
}

function convertToDto(created: Opportunity): OpportunityDto {
  return {
    id: created.id,
    type: created.type,
    subtype: created.subtype ?? null,
    title: created.title,
    description: created.description ?? null,
    tags: created.tags ?? [],
    organizationId: created.organizationId,
    location: created.location ?? null,
    deliveryMode: created.deliveryMode ?? null,
    startDate: created.startDate ?? null,
    endDate: created.endDate ?? null,
    deadline: created.deadline ?? null,
    metadata: (created.metadata as unknown as Record<string, unknown>) ?? null,
    createdBy: created.createdBy,
    createdAt: created.createdAt ?? null,
    updatedAt: created.updatedAt ?? null,
  };
}
