import { mockOpportunities } from './opportunities';
import { mockOrganizations } from './organizations';

export const mockUserOpportunities = [
  {
    id: 'uo1',
    userId: 'user1',
    opportunityId: mockOpportunities[0].id,
    status: 'saved' as const,
    createdAt: new Date(),
  },
  {
    id: 'uo2',
    userId: 'user1',
    opportunityId: mockOpportunities[2].id,
    status: 'applied' as const,
    createdAt: new Date(),
  },
];

export const mockUserOrganizations = [
  {
    id: 'uorg1',
    userId: 'user1',
    organizationId: mockOrganizations[0].id,
    createdAt: new Date(),
  },
];
