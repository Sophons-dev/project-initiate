import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCareerInsightByClerkId } from '@/features/career-insight/actions';
import { CareerInsightDto } from '../dto/insight.dto';
import { CreateCareerInsightDto } from '../dto/createInsight.dto';
import { UpdateCareerInsightDto } from '../dto/updateInsight.dto';
import { upsertCareerInsight } from '../actions/mutations/upsertCareerInsight';

/**
 * Returns a React Query hook that fetches a user's career insight by their Clerk ID.
 *
 * The query is keyed by `['user-career-insight', userId]` and is only enabled when `userId` is truthy.
 *
 * @param userId - Clerk user ID used to fetch the career insight.
 * @returns A React Query `UseQueryResult` containing `CareerInsightDto | null`.
 */
export function useGetUserInsight(userId: string) {
  return useQuery<CareerInsightDto | null>({
    queryKey: ['user-career-insight', userId],
    queryFn: () => getCareerInsightByClerkId(userId),
    enabled: Boolean(userId),
  });
}

/**
 * Creates a React Query mutation to create or update a user's career insight and refresh the cached insight on success.
 *
 * The returned mutation's `mutationFn` expects a `CreateCareerInsightDto` or `UpdateCareerInsightDto` and will call the API to upsert the insight for the given `userId`. After a successful mutation, the hook invalidates the ['user-career-insight', userId] query to trigger a refetch.
 *
 * @param userId - Clerk ID of the user whose career insight will be upserted and whose cached insight will be invalidated on success
 * @returns A React Query mutation object (from `useMutation`) configured to upsert a career insight for `userId`
 */
export function useUpsertCareerInsight(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCareerInsightDto | UpdateCareerInsightDto) => upsertCareerInsight(userId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-career-insight', userId] });
    },
  });
}
