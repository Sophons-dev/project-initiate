import {
  OpportunityDTO,
  OpportunityRecommendationDTO,
} from '@/features/opportunities/types';
import {
  UserOpportunityDTO,
  UserOrganizationDTO,
} from '@/features/user/actions';
import {
  mockOpportunities,
  mockOpportunityRecommendations,
} from '../data/opportunities';
import { mockUserOpportunities, mockUserOrganizations } from '../data/user';
import { mockOrganizations } from '../data/organizations';

export async function getUserRecommendations(
  userId: string
): Promise<OpportunityRecommendationDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockOpportunityRecommendations
          .filter(rec => rec.userId === userId)
          .map(rec => ({
            ...rec,
            opportunity: {
              ...mockOpportunities.find(o => o.id === rec.opportunityId),
              metadata: mockOpportunities.find(o => o.id === rec.opportunityId)
                ?.metadata as Record<string, unknown> | null | undefined,
            } as OpportunityDTO,
          }))
      );
    }, 1000);
  });
}

// --- Saved Opportunities ---
export async function getUserOpportunities(
  userId: string
): Promise<UserOpportunityDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockUserOpportunities
          .filter(uo => uo.userId === userId)
          .map(uo => ({
            ...uo,
            opportunity: {
              ...mockOpportunities.find(o => o.id === uo.opportunityId),
              metadata: mockOpportunities.find(o => o.id === uo.opportunityId)
                ?.metadata as Record<string, unknown> | null | undefined,
            } as OpportunityDTO,
          }))
      );
    }, 1000);
  });
}

// --- Saved Organizations ---
export async function getUserOrganizations(
  userId: string
): Promise<UserOrganizationDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockUserOrganizations
          .filter(uo => uo.userId === userId)
          .map(uo => ({
            ...uo,
            organization: mockOrganizations.find(
              org => org.id === uo.organizationId
            ),
          }))
      );
    }, 1000);
  });
}
