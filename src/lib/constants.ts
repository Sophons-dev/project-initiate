import { Opportunity } from '@/features/opportunities/components/opportunity-card';
import { Organization } from '@/features/organizations/types';

export const filterColors = {
  job: 'bg-blue-500',
  course: 'bg-orange-500',
  event: 'bg-red-500',
} as const;

export const opportunityFilters = [
  { label: 'All Opportunities', value: 'show_all', predicate: () => true },
  {
    label: 'Jobs',
    value: 'job',
    predicate: (op: Opportunity) => op.type === 'JOB',
  },
  {
    label: 'Courses',
    value: 'course',
    predicate: (op: Opportunity) => op.type === 'COURSE',
  },
  {
    label: 'Events',
    value: 'event',
    predicate: (op: Opportunity) => op.type === 'EVENT',
  },
];

export const organizationFilters = [
  { label: 'All Organizations', value: 'show_all', predicate: () => true },
  {
    label: 'Company',
    value: 'company',
    predicate: (org: Organization) => org.type === 'company',
  },
  {
    label: 'University',
    value: 'university',
    predicate: (org: Organization) => org.type === 'university',
  },
  {
    label: 'Bootcamp',
    value: 'bootcamp',
    predicate: (org: Organization) => org.type === 'bootcamp',
  },
  {
    label: 'Online Platform',
    value: 'online_platform',
    predicate: (org: Organization) => org.type === 'online_platform',
  },
  {
    label: 'Government',
    value: 'government',
    predicate: (org: Organization) => org.type === 'government',
  },
  {
    label: 'NGO',
    value: 'ngo',
    predicate: (org: Organization) => org.type === 'ngo',
  },
  {
    label: 'Other',
    value: 'other',
    predicate: (org: Organization) => org.type === 'other',
  },
];
