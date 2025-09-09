import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCareerInsightByUserId } from '@/features/career-insight/actions';
import { CareerInsightDto } from '../dto/insight.dto';
import { CreateCareerInsightDto } from '../dto/createInsight.dto';
import { UpdateCareerInsightDto } from '../dto/updateInsight.dto';
import { upsertCareerInsight } from '../actions/mutations/upsertCareerInsight';

export function useCareerInsight(userId: string | undefined) {
  return useQuery<CareerInsightDto | null>({
    queryKey: ['user-career-insight', userId],
    queryFn: () => (userId ? getCareerInsightByUserId(userId) : Promise.resolve(null)),
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
