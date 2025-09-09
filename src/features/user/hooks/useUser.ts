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

/**
 * React Query hook to fetch a user by their Clerk ID.
 *
 * The query is enabled only when `clerkId` is provided. Cached data is considered
 * fresh for 5 minutes and kept in the cache for 10 minutes. Uses `getUserByClerkId`
 * as the fetcher and a stable cache key from `userQueryKeys.byClerkId`.
 *
 * @param clerkId - The Clerk user ID to fetch; when falsy the query remains disabled.
 * @returns A React Query result for the user fetch.
 */
export function useUserByClerkId(clerkId?: string) {
  return useQuery({
    queryKey: userQueryKeys.byClerkId(clerkId || ''),
    queryFn: () => getUserByClerkId(clerkId!),
    enabled: !!clerkId,
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes - cache persists for 10 minutes
  });
}

/**
 * Returns the authenticated user's query result by delegating to `useUserByClerkId`.
 *
 * Uses Clerk's `useAuth()` to obtain the current `userId` and fetches that user's
 * data. The underlying query is disabled when there is no authenticated user.
 *
 * @returns The React Query result returned by `useUserByClerkId` for the current user.
 */
export function useCurrentUser() {
  const { userId } = useAuth();
  return useUserByClerkId(userId || undefined);
}

/**
 * Legacy alias for useUserByClerkId kept for backward compatibility.
 *
 * Delegates to `useUserByClerkId` and returns the same React Query result.
 *
 * @param clerkId - Clerk user identifier
 * @returns The query result returned by `useUserByClerkId`
 */
export function useGetUserByClerkId(clerkId: string) {
  return useUserByClerkId(clerkId);
}

/**
 * React Query hook to fetch a user by internal ID (admin use).
 *
 * The query is enabled only when `id` is provided. Cached data is considered
 * fresh for 5 minutes and retained for 10 minutes before garbage collection.
 *
 * Note: the query function is a placeholder and currently throws
 * `"getUserById not implemented yet"` when executed — implement `getUserById`
 * before relying on this hook to fetch real data.
 *
 * @param id - The internal user ID to fetch. If omitted or falsy, the query is disabled.
 * @returns The React Query result for the user fetch (data, status, error, etc.).
 */
export function useUserById(id?: string) {
  return useQuery({
    queryKey: userQueryKeys.byId(id || ''),
    queryFn: async () => {
      // You'll need to implement getUserById action
      throw new Error('getUserById not implemented yet');
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * React Query mutation hook to create a new user.
 *
 * On success (when the action response has `success` and `data`), the hook updates cache entries
 * for the created user's Clerk ID and internal ID, then invalidates the top-level user query key
 * to ensure consistency.
 *
 * Uses CreateUserDto as the mutation input.
 *
 * @returns A React Query mutation object for creating a user.
 */
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

/**
 * Hook returning a mutation to update a user and keep related React Query caches in sync.
 *
 * Performs an update via the `updateUser` action. On successful response (when `data.success` and
 * `data.data` are present) the hook writes the returned user payload into the cache for both the
 * Clerk ID and internal ID keys, and also updates the cache entry that corresponds to the original
 * identifier used for the mutation.
 *
 * The mutation function expects an object with:
 * - `identifier`: which identifies the target user and must have shape `{ key: 'id' | 'clerkId'; value: string }`
 * - `updates`: partial user fields matching `UpdateUserDto`
 *
 * @returns The React Query mutation object for the update operation.
 */
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

/**
 * Provides a mutation hook to delete a user by their Clerk ID.
 *
 * Invokes the backend `deleteUser` action with a Clerk ID. On success it removes any cached entry for that Clerk ID and invalidates the top-level user queries so related lists and views refresh.
 *
 * The mutation function expects a single argument: the user's Clerk ID (string).
 *
 * @returns A React Query mutation object for performing the delete operation.
 */
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

/**
 * Creates a mutation hook to onboard a user and refresh user-related cache on success.
 *
 * When the onboarding action returns a successful response containing data, the hook invalidates the top-level user query key so related user queries will refetch.
 *
 * @returns A React Query mutation object for onboarding a user. Call `mutate` or `mutateAsync` with `OnboardingUserParams`.
 */
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

/**
 * Returns helpers to prefetch user data into the React Query cache.
 *
 * prefetchByClerkId(clerkId) — Prefetches the user identified by a Clerk ID and caches it with a 5-minute stale window.
 * prefetchById(id) — Placeholder prefetch for internal user ID; currently throws "getUserById not implemented yet".
 *
 * @returns An object with two functions:
 * - prefetchByClerkId(clerkId: string): Promise<void>
 * - prefetchById(id: string): Promise<void>
 */
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
