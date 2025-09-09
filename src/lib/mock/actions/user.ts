import {
  OpportunityDto as OpportunityDTO,
  OpportunityRecommendationDto as OpportunityRecommendationDTO,
} from '@/features/opportunities/types';
import { UserOpportunityDTO, UserOrganizationDTO } from '@/features/user/actions';
import { mockOpportunities, mockOpportunityRecommendations } from '../data/opportunities';
import { mockUserOpportunities, mockUserOrganizations } from '../data/user';
import { mockOrganizations } from '../data/organizations';

export async function getUserRecommendations(userId: string): Promise<OpportunityRecommendationDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockOpportunityRecommendations
          .filter(rec => rec.userId === userId)
          .map(rec => ({
            ...rec,
            opportunity: {
              ...mockOpportunities.find(o => o.id === rec.opportunityId),
              metadata: mockOpportunities.find(o => o.id === rec.opportunityId)?.metadata as
                | Record<string, unknown>
                | null
                | undefined,
            } as OpportunityDTO,
          }))
      );
    }, 1000);
  });
}

export async function getUserRecommendationById(
  opportunityId: string,
  userId: string
): Promise<OpportunityRecommendationDTO | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const recommendation = mockOpportunityRecommendations.find(
        rec => rec.opportunityId === opportunityId && rec.userId === userId
      );

      if (recommendation) {
        const opportunity = mockOpportunities.find(opp => opp.id === recommendation.opportunityId);

        if (opportunity) {
          const opportunityDTO: OpportunityDTO = {
            id: opportunity.id,
            type: opportunity.type,
            subtype: opportunity.subtype,
            title: opportunity.title,
            description: opportunity.description,
            tags: opportunity.tags,
            organizationId: opportunity.organizationId,
            location: opportunity.location,
            deliveryMode: opportunity.deliveryMode,
            startDate: opportunity.startDate,
            endDate: opportunity.endDate,
            deadline: opportunity.deadline,
            metadata: opportunity.metadata as Record<string, unknown>,
            createdBy: opportunity.createdBy,
            createdAt: opportunity.createdAt,
            updatedAt: opportunity.updatedAt,
          };
          resolve({ ...recommendation, opportunity: opportunityDTO });
        } else {
          resolve(recommendation);
        }
      } else {
        resolve(null);
      }
    }, 1000);
  });
}

// --- Saved Opportunities ---
export async function getUserOpportunities(userId: string): Promise<UserOpportunityDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockUserOpportunities
          .filter(uo => uo.userId === userId)
          .map(uo => ({
            ...uo,
            opportunity: {
              ...mockOpportunities.find(o => o.id === uo.opportunityId),
              metadata: mockOpportunities.find(o => o.id === uo.opportunityId)?.metadata as
                | Record<string, unknown>
                | null
                | undefined,
            } as OpportunityDTO,
          }))
      );
    }, 1000);
  });
}

// --- Saved Organizations ---
export async function getUserOrganizations(userId: string): Promise<UserOrganizationDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockUserOrganizations
          .filter(uo => uo.userId === userId)
          .map(uo => ({
            ...uo,
            organization: mockOrganizations.find(org => org.id === uo.organizationId),
          }))
      );
    }, 1000);
  });
}
