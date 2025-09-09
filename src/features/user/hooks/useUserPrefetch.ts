import { useRouter } from 'next/navigation';
import { usePrefetchUser } from './useUser';

/**
 * Prefetches a user's data before navigating to reduce or eliminate loading states.
 *
 * Returns:
 * - `navigateWithUserPrefetch(href, clerkId?)`: navigates to `href`; if `clerkId` is provided, calls `prefetchByClerkId(clerkId)` before navigation.
 * - `prefetchByClerkId`: function to prefetch a user by their Clerk ID.
 *
 * @returns An object containing `navigateWithUserPrefetch` and `prefetchByClerkId`.
 */
export function useUserPrefetch() {
  const { prefetchByClerkId } = usePrefetchUser();
  const router = useRouter();

  const navigateWithUserPrefetch = (href: string, clerkId?: string) => {
    if (clerkId) {
      // Prefetch user data before navigation
      prefetchByClerkId(clerkId);
    }
    router.push(href);
  };

  return {
    navigateWithUserPrefetch,
    prefetchByClerkId,
  };
}
