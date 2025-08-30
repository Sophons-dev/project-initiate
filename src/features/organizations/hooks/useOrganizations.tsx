import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Organization } from '../types';
import { organizationData } from '@/lib/utils';

// TODO: remove this dummy function once the backend is ready
const getOrganizations = async (): Promise<Organization[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(organizationData);
    }, 1000); // Simulate network delay of 1 second
  });
};

export const useOrganizations = (): UseQueryResult<Organization[]> => {
  return useQuery<Organization[]>({
    queryKey: ['organizations'],
    queryFn: () => getOrganizations(),
  });
};
