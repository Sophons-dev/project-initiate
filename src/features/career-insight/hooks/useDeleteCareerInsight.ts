import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCareerInsight } from '@/features/career-insight/actions';

export function useDeleteCareerInsight(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCareerInsight(userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['careerInsight', userId] }),
  });
}
