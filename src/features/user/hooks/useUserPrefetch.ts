import { useRouter } from 'next/navigation';
import { usePrefetchUser } from './useUser';

/**
 * Hook to prefetch user data when navigating to pages that need it
 * This helps avoid loading states when users navigate between pages
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
