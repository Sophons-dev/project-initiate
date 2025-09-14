'use client';

import { PaginatedResponse, PaginationParams } from '@/features/opportunities/types/pagination';
import { useProgress } from '@bprogress/next';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { OrganizationDto } from '../dto/organization.dto';
import { getOrganizations } from '../actions';
import { useEffect } from 'react';

export const useGetOrganizations = (paginationParams?: PaginationParams) => {
  const { start, stop } = useProgress();

  const query = useQuery<PaginatedResponse<OrganizationDto>>({
    queryKey: ['organizations', paginationParams],
    queryFn: async () => {
      return await getOrganizations(paginationParams);
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isFetching) start();
    else stop();
  }, [query.isFetching, start, stop]);

  return {
    organizations: query.data,
    meta: query.data?.meta,
    isLoading: query.isLoading,
    error: query.error ?? null,
    refetch: query.refetch,
  };
};
