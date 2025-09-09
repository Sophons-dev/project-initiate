import { useQuery } from '@tanstack/react-query';
import { getCareerInsightByUserId } from '@/features/career-insight/actions';
import { CareerInsightDto } from '../dto/insight.dto';

export function useCareerInsight(userId: string | undefined) {
  return useQuery<CareerInsightDto | null>({
    queryKey: ['careerInsight', userId],
    queryFn: () => (userId ? getCareerInsightByUserId(userId) : Promise.resolve(null)),
    enabled: Boolean(userId),
  });
}
