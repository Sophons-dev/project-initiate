import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getOrganizationById, getAllOrganizations, getOrganizationsByIndustry } from '../actions/queries';
import { OrganizationDto } from '../dto/organization.dto';

export const useGetOrganizationById = (id: string): UseQueryResult<OrganizationDto | null> => {
  return useQuery<OrganizationDto | null>({
    queryKey: ['organization', id],
    queryFn: () => getOrganizationById(id),
    enabled: !!id,
  });
};

export const useGetAllOrganizations = (): UseQueryResult<OrganizationDto[]> => {
  return useQuery<OrganizationDto[]>({
    queryKey: ['organizations'],
    queryFn: () => getAllOrganizations(),
  });
};

export const useGetOrganizationsByIndustry = (industry: string): UseQueryResult<OrganizationDto[]> => {
  return useQuery<OrganizationDto[]>({
    queryKey: ['organizations', 'industry', industry],
    queryFn: () => getOrganizationsByIndustry(industry),
    enabled: !!industry,
  });
};
