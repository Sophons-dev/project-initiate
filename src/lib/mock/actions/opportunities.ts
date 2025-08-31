import { OpportunityDTO } from '@/features/opportunities/types';
import { mockOpportunities } from '../data/opportunities';
import { mockOrganizations } from '../data/organizations';

export async function getOpportunities(): Promise<OpportunityDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockOpportunities.map(opp => ({
          ...opp,
          metadata: opp.metadata as Record<string, unknown> | null | undefined,
          organization: mockOrganizations.find(
            org => org.id === opp.organizationId
          ),
        }))
      );
    }, 1000);
  });
}

export async function getOpportunityById(
  id: string
): Promise<OpportunityDTO | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const opp = mockOpportunities.find(o => o.id === id);
      if (!opp) return resolve(null);

      resolve({
        ...opp,
        metadata: opp.metadata as Record<string, unknown> | null | undefined,
        organization: mockOrganizations.find(
          org => org.id === opp.organizationId
        ),
      });
    }, 1000);
  });
}

export async function getOpportunitiesByOrganizationId(
  organizationId: string
): Promise<OpportunityDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockOpportunities
          .filter(o => o.organizationId === organizationId)
          .map(opp => ({
            ...opp,
            metadata: opp.metadata as
              | Record<string, unknown>
              | null
              | undefined,
            organization: mockOrganizations.find(
              org => org.id === opp.organizationId
            ),
          }))
      );
    }, 1000);
  });
}
