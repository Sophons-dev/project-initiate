'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUser } from '@/features/user/actions';
import { User } from '@/features/user/types';

export function useUserByClerkId(clerkId?: string): UseQueryResult<User | null> {
  return useQuery<User | null>({
    queryKey: ['user-by-clerk-id', clerkId],

    queryFn: async () => {
      if (!clerkId) return null;

      const res = await getUser({ key: 'clerkId', value: clerkId });

      if (!res.success) throw new Error(res.error || 'Failed to fetch user');

      return res.data ?? null;
    },
    enabled: !!clerkId,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
