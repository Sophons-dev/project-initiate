import { OpportunityDto as OpportunityDTO } from '@/features/opportunities/dto';
import { OpportunityRecommendationDto as OpportunityRecommendationDTO } from '@/features/opportunities/dto/opportunity-recommendation.dto';

export const filterColors = {
  job: 'bg-blue-500',
  course: 'bg-orange-500',
} as const;

export const opportunityTypeColors = {
  job: 'bg-blue-100 text-blue-800',
  course: 'bg-yellow-100 text-yellow-800',
  event: 'bg-green-100 text-green-800',
} as const;

export const opportunityFilters = [
  { label: 'All Opportunities', value: 'show_all', predicate: () => true },
  {
    label: 'Jobs',
    value: 'job',
    predicate: (op: OpportunityDTO | OpportunityRecommendationDTO) =>
      (op as OpportunityDTO).type === 'job' || (op as OpportunityRecommendationDTO).opportunity?.type === 'job',
  },
  {
    label: 'Courses',
    value: 'course',
    predicate: (op: OpportunityDTO | OpportunityRecommendationDTO) =>
      (op as OpportunityDTO).type === 'course' || (op as OpportunityRecommendationDTO).opportunity?.type === 'course',
  },
  {
    label: 'Events',
    value: 'event',
    predicate: (op: OpportunityDTO | OpportunityRecommendationDTO) =>
      (op as OpportunityDTO).type === 'event' || (op as OpportunityRecommendationDTO).opportunity?.type === 'event',
  },
];

export const organizationFilters = [
  { label: 'All Organizations', value: 'show_all', predicate: () => true },
  // {
  //   label: 'Company',
  //   value: 'company',
  //   predicate: (org: OrganizationDTO) => org.type === 'company',
  // },
  // {
  //   label: 'University',
  //   value: 'university',
  //   predicate: (org: OrganizationDTO) => org.type === 'university',
  // },
  // {
  //   label: 'Bootcamp',
  //   value: 'bootcamp',
  //   predicate: (org: OrganizationDTO) => org.type === 'bootcamp',
  // },
  // {
  //   label: 'Online Platform',
  //   value: 'online_platform',
  //   predicate: (org: OrganizationDTO) => org.type === 'online_platform',
  // },
  // {
  //   label: 'Government',
  //   value: 'government',
  //   predicate: (org: OrganizationDTO) => org.type === 'government',
  // },
  // {
  //   label: 'NGO',
  //   value: 'ngo',
  //   predicate: (org: OrganizationDTO) => org.type === 'ngo',
  // },
  // {
  //   label: 'Other',
  //   value: 'other',
  //   predicate: (org: OrganizationDTO) => org.type === 'other',
  // },
];
