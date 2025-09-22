import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { createUser, updateUser, deleteUser, onboardUser } from '../actions';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { OnboardingUserParams } from '@/features/onboarding/types/onboarding';
import { getUserByClerkId } from '../actions/queries/getUserByClerkId';

// Query key factory for consistent cache management
export const userQueryKeys = {
  all: ['user'] as const,
  byId: (id: string) => ['user', 'id', id] as const,
  byClerkId: (clerkId: string) => ['user', 'clerkId', clerkId] as const,
  byEmail: (email: string) => ['user', 'email', email] as const,
} as const;

// Get user by Clerk ID (most common use case)
export function useUserByClerkId(clerkId?: string) {
  return useQuery({
    queryKey: userQueryKeys.byClerkId(clerkId || ''),
    queryFn: () => getUserByClerkId(clerkId!),
    enabled: !!clerkId,
    refetchOnWindowFocus: true,
  });
}

// Get current user (using Clerk auth) - this is the most commonly used hook
export function useCurrentUser() {
  const { userId } = useAuth();
  return useUserByClerkId(userId || undefined);
}

// Legacy hook for backward compatibility
export function useGetUserByClerkId(clerkId: string) {
  return useUserByClerkId(clerkId);
}

// Get user by ID (less common, but useful for admin operations)
export function useUserById(id?: string) {
  return useQuery({
    queryKey: userQueryKeys.byId(id || ''),
    queryFn: async () => {
      throw new Error('getUserById not implemented yet');
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Create user mutation
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserDto) => createUser(userData),
    onSuccess: data => {
      if (data.success && data.data) {
        // Update cache for both clerkId and id queries
        queryClient.setQueryData(userQueryKeys.byClerkId(data.data.clerkId), data);
        queryClient.setQueryData(userQueryKeys.byId(data.data.id), data);

        // Invalidate all user queries to ensure consistency
        queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
      }
    },
  });
}

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      identifier,
      updates,
    }: {
      identifier: { key: 'id' | 'clerkId'; value: string };
      updates: UpdateUserDto;
    }) => updateUser(identifier, updates),
    onSuccess: (data, variables) => {
      if (data.success && data.data) {
        // Update cache for the specific user
        const clerkIdKey = userQueryKeys.byClerkId(data.data.clerkId);
        const idKey = userQueryKeys.byId(data.data.id);

        queryClient.setQueryData(clerkIdKey, data);
        queryClient.setQueryData(idKey, data);

        // Also update the original query key if different
        if (variables.identifier.key === 'clerkId') {
          queryClient.setQueryData(userQueryKeys.byClerkId(variables.identifier.value), data);
        } else {
          queryClient.setQueryData(userQueryKeys.byId(variables.identifier.value), data);
        }
      }
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clerkId: string) => deleteUser(clerkId),
    onSuccess: (_, clerkId) => {
      // Remove all cached data for this user
      queryClient.removeQueries({ queryKey: userQueryKeys.byClerkId(clerkId) });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
}

// Onboard user mutation
export function useOnboardUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (onboardingData: OnboardingUserParams) => onboardUser(onboardingData),
    onSuccess: data => {
      if (data.success && data.data) {
        // Invalidate all user queries to refresh the data
        queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
      }
    },
  });
}

// Utility hook to prefetch user data
export function usePrefetchUser() {
  const queryClient = useQueryClient();

  return {
    prefetchByClerkId: (clerkId: string) => {
      return queryClient.prefetchQuery({
        queryKey: userQueryKeys.byClerkId(clerkId),
        queryFn: () => getUserByClerkId(clerkId),
        staleTime: 5 * 60 * 1000,
      });
    },
    prefetchById: (id: string) => {
      return queryClient.prefetchQuery({
        queryKey: userQueryKeys.byId(id),
        queryFn: async () => {
          throw new Error('getUserById not implemented yet');
        },
        staleTime: 5 * 60 * 1000,
      });
    },
  };
}
