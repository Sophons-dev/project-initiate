import { OpportunityDTO } from '@/features/opportunities/dto';
import { mockOpportunities } from '../data/opportunities';
import { mockOrganizations } from '../data/organizations';

export async function getOpportunities(): Promise<OpportunityDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockOpportunities.map(opp => ({
          ...opp,
          metadata: opp.metadata as Record<string, unknown> | null | undefined,
          organization: mockOrganizations.find(org => org.id === opp.organizationId),
        }))
      );
    }, 1000);
  });
}

export async function getOpportunityById(id: string): Promise<OpportunityDTO | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const opp = mockOpportunities.find(o => o.id === id);
      if (!opp) return resolve(null);

      resolve({
        ...opp,
        metadata: opp.metadata as Record<string, unknown> | null | undefined,
        organization: mockOrganizations.find(org => org.id === opp.organizationId),
      });
    }, 1000);
  });
}

export async function getOpportunitiesByOrganizationId(organizationId: string): Promise<OpportunityDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockOpportunities
          .filter(o => o.organizationId === organizationId)
          .map(opp => ({
            ...opp,
            metadata: opp.metadata as Record<string, unknown> | null | undefined,
            organization: mockOrganizations.find(org => org.id === opp.organizationId),
          }))
      );
    }, 1000);
  });
}

export async function getRelatedOpportunities(opportunityId: string, tags: string[]): Promise<OpportunityDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const allOpportunities = mockOpportunities
        .filter(opp => opp.id !== opportunityId)
        .map(opp => {
          const matchingTags = opp.tags.filter(tag => tags.includes(tag));
          const score = matchingTags.length * 10 + Math.random() * 5; // Use score internally for sorting
          return {
            ...opp,
            metadata: opp.metadata as Record<string, unknown> | null | undefined,
            organization: mockOrganizations.find(org => org.id === opp.organizationId),
            _matchingTagsCount: matchingTags.length, // Store matching tags count for sorting
            _score: score, // Store score for sorting
          };
        });

      const exactMatches = allOpportunities.filter(opp => opp._matchingTagsCount > 0);
      const otherOpportunities = allOpportunities.filter(opp => opp._matchingTagsCount === 0);

      let finalRecommendations = exactMatches.sort((a, b) => {
        // Prioritize by number of matching tags first
        if (a._matchingTagsCount !== b._matchingTagsCount) {
          return b._matchingTagsCount - a._matchingTagsCount;
        }
        // Then sort by score (descending)
        return (b._score || 0) - (a._score || 0);
      });

      if (finalRecommendations.length < 3) {
        const needed = 3 - finalRecommendations.length;
        const fallback = otherOpportunities.sort(() => 0.5 - Math.random()).slice(0, needed);
        finalRecommendations = [...finalRecommendations, ...fallback];
      }

      // Remove temporary sorting properties before resolving
      const opportunitiesToReturn = finalRecommendations.slice(0, 3).map(opp => {
        const { _matchingTagsCount, _score, ...rest } = opp;
        return rest as OpportunityDTO;
      });

      resolve(opportunitiesToReturn);
    }, 1000);
  });
}
