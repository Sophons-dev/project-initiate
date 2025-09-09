import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCareerInsightByClerkId } from '@/features/career-insight/actions';
import { CareerInsightDto } from '../dto/insight.dto';
import { CreateCareerInsightDto } from '../dto/createInsight.dto';
import { UpdateCareerInsightDto } from '../dto/updateInsight.dto';
import { upsertCareerInsight } from '../actions/mutations/upsertCareerInsight';

export function useGetUserInsight(userId: string) {
  return useQuery<CareerInsightDto | null>({
    queryKey: ['user-career-insight', userId],
    queryFn: () => getCareerInsightByClerkId(userId),
    enabled: Boolean(userId),
  });
}

export function useUpsertCareerInsight(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCareerInsightDto | UpdateCareerInsightDto) => upsertCareerInsight(userId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-career-insight', userId] });
    },
  });
}
