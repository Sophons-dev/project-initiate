import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getOrganizationById,
  getOrganizations,
} from '@/lib/mock/actions/organizations';
import { OrganizationDTO } from '../types';

export const useGetAllOrganizations = (): UseQueryResult<OrganizationDTO[]> => {
  return useQuery<OrganizationDTO[]>({
    queryKey: ['organizations'],
    queryFn: () => getOrganizations(),
  });
};

export const useGetOrganizationById = (
  organizationId: string
): UseQueryResult<OrganizationDTO | null> => {
  return useQuery<OrganizationDTO | null>({
    queryKey: ['organizations', organizationId],
    queryFn: () => getOrganizationById(organizationId),
    enabled: !!organizationId,
  });
};
