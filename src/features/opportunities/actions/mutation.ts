'use server';

import { OpportunityType, CourseSubtype, Prisma } from '@prisma/client';
import { CreateOpportunityDto, OpportunityDto } from '../dto';
import { db } from '@/lib/db';
import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';
import { generateRecommendations } from '@/lib/agents/recommendation-agent/recommendation-generator';
import { randomBytes } from 'crypto';
import { Recommendation } from '@/lib/agents/recommendation-agent/types';

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

    const result: OpportunityDto = {
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

    return result;
  } catch (error) {
    console.error('Error creating opportunity:', error);
    throw new Error('Failed to create opportunity');
  }
}

export async function generateAndSaveOpportunities(context: string, userId: string): Promise<OpportunityDto[]> {
  const dummyOrganizationId = '000000000000000000000000';

  const insights = await generateInsight({ context });
  const recommendations = await generateRecommendations({
    context: JSON.stringify(insights),
  });

  console.log('RECOMMENDATIONS', recommendations);

  const recs = Array.isArray(recommendations?.recommendations)
    ? (recommendations.recommendations as Recommendation[])
    : [];

  const payloads: CreateOpportunityDto[] = recs.map((r: any) => ({
    type: r.type,
    title: r.title,
    description: r.description ?? null,
    tags: r.tags ?? [],
    organizationId: dummyOrganizationId,
    location:
      r.location?.city && r.location?.country
        ? `${r.location.city}, ${r.location.country}`
        : r.location?.city || 'Remote',
    deliveryMode: r.delivery_mode ?? null,
    startDate: r.start_date ? new Date(r.start_date) : null,
    endDate: r.end_date ? new Date(r.end_date) : null,
    deadline: r.deadline ? new Date(r.deadline) : null,
    metadata: r.metadata as Record<string, unknown> | null,
    createdBy: userId,
  }));

  const created = await Promise.all(
    payloads.map(async (p, index) => {
      try {
        const opp = await createOpportunity(p);
        // Also create a recommendation entry tied to this opportunity
        try {
          await db.opportunityRecommendation.create({
            data: {
              userId,
              opportunityId: opp.id,
              score: 0,
              rank: index + 1,
              reasoning: recs[index]?.matchReason || 'Matches your interests',
              tagsMatched: opp.tags ?? [],
              modelVersion: 'v1',
              createdAt: new Date(),
            },
          });
        } catch (recErr) {
          console.error('Failed to create opportunity recommendation', recErr);
        }
        return opp;
      } catch (e) {
        console.error('Failed to create opportunity', e);
        return null;
      }
    })
  );

  return created.filter(Boolean) as OpportunityDto[];
}
