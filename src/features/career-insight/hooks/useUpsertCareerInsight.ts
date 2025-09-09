import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCareerInsight, updateCareerInsight } from '@/features/career-insight/actions';
import { CreateCareerInsightDto } from '../dto/createInsight.dto';
import { UpdateCareerInsightDto } from '../dto/updateInsight.dto';

export function useUpsertCareerInsight(userId: string) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (input: CreateCareerInsightDto) => createCareerInsight(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['careerInsight', userId] }),
  });

  const update = useMutation({
    mutationFn: (input: UpdateCareerInsightDto) => updateCareerInsight(userId, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['careerInsight', userId] }),
  });

  return { create, update };
}
