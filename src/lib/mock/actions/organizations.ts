import { OrganizationDTO } from '@/features/organizations/types';
import { mockOrganizations } from '../data/organizations';

export async function getOrganizations(): Promise<OrganizationDTO[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockOrganizations);
    }, 1000);
  });
}

export async function getOrganizationById(
  id: string
): Promise<OrganizationDTO | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockOrganizations.find(o => o.id === id) ?? null);
    }, 1000);
  });
}
