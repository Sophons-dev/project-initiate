import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getRecommendationsByUserId } from '@/features/opportunities/actions';
import { OpportunityRecommendationDto } from '@/features/opportunities/dto';

export function useUserOpportunitiesInfinite(userId: string, searchQuery: string = '') {
  return useInfiniteScroll<OpportunityRecommendationDto>({
    fetchData: async (page, search) => {
      const result = await getRecommendationsByUserId(userId, {
        page,
        limit: 9,
        search,
      });
      return {
        data: result.data,
        hasNextPage: result.meta.hasNextPage,
      };
    },
    searchQuery,
  });
}
