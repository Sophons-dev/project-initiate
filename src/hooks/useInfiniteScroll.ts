import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';

interface UseInfiniteScrollOptions<T> {
  fetchData: (page: number, search?: string) => Promise<{ data: T[]; hasNextPage: boolean }>;
  searchQuery?: string;
  pageSize?: number;
}

export function useInfiniteScroll<T>({ fetchData, searchQuery = '', pageSize = 9 }: UseInfiniteScrollOptions<T>) {
  const [allData, setAllData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef<number>(0);
  const currentPageRef = useRef(1);

  // Reset when search changes
  useEffect(() => {
    setAllData([]);
    setHasMore(true);
    currentPageRef.current = 1;
    loadInitialData();
  }, [searchQuery]);

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchData(1, searchQuery);
      setAllData(result.data);
      setHasMore(result.hasNextPage);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, searchQuery]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    scrollPositionRef.current = window.scrollY;
    setIsLoadingMore(true);
    currentPageRef.current += 1;

    try {
      const result = await fetchData(currentPageRef.current, searchQuery);
      setAllData(prev => [...prev, ...result.data]);
      setHasMore(result.hasNextPage);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [fetchData, searchQuery, isLoadingMore, hasMore]);

  // Preserve scroll position
  useLayoutEffect(() => {
    if (currentPageRef.current > 1 && scrollPositionRef.current > 0) {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    }
  }, [allData]);

  // Intersection Observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, isLoadingMore]);

  return {
    data: allData,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMoreRef,
  };
}
