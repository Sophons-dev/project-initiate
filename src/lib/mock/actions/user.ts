import {
  OpportunityDto as OpportunityDTO,
  OpportunityRecommendationDto as OpportunityRecommendationDTO,
} from '@/features/opportunities/types';
import { UserOpportunityDto, UserOrganizationDto } from '@/features/user/dto';
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

/**
 * Retrieve a specific opportunity recommendation for a given user.
 *
 * Searches the mock recommendations for one matching `opportunityId` and `userId`. If found and the
 * referenced opportunity exists in the mock opportunities dataset, the recommendation is returned
 * with an embedded `OpportunityDTO` under the `opportunity` property. If the recommendation exists
 * but the opportunity is missing, the original recommendation is returned unchanged. If no
 * recommendation is found, resolves to `null`.
 *
 * @param opportunityId - The ID of the opportunity to look up
 * @param userId - The ID of the user who received the recommendation
 * @returns A promise resolving to the matched `OpportunityRecommendationDTO` (possibly augmented
 * with an `opportunity` object) or `null` if no recommendation exists
 */
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

/**
 * Retrieve saved opportunities for a user from the mock dataset.
 *
 * Filters the mock user-opportunities by `userId` and returns an array of UserOpportunityDto
 * where each entry includes the corresponding opportunity object (built from mockOpportunities,
 * including its metadata). The function simulates an async API call and resolves after ~1 second.
 *
 * @param userId - ID of the user whose saved opportunities should be returned
 * @returns A promise that resolves to an array of UserOpportunityDto (may be empty)
 */
export async function getUserOpportunities(userId: string): Promise<UserOpportunityDto[]> {
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

/**
 * Retrieve all organizations saved by a user (mocked).
 *
 * Returns the list of user-organization records for `userId`, each augmented with an
 * `organization` object looked up from the in-memory mockOrganizations dataset.
 * This function simulates an asynchronous API call and resolves after ~1 second.
 *
 * @param userId - The id of the user whose saved organizations to retrieve.
 * @returns A promise that resolves to an array of UserOrganizationDto objects.
 */
export async function getUserOrganizations(userId: string): Promise<UserOrganizationDto[]> {
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
