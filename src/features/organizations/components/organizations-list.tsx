import { OrganizationCard } from './organization-card';
import { Organization } from '../types';

interface OrganizationsListProps {
  organizations: Organization[];
  selectedOrgId: string;
  isLoading?: boolean;
  error?: Error;
  onSelect: (organization: Organization) => void;
}

export const OrganizationsList = ({
  organizations,
  selectedOrgId,
  isLoading,
  error,
  onSelect,
}: OrganizationsListProps) => {
  if (isLoading) {
    return (
      <div className='w-100'>
        <div className='bg-slate-50 rounded p-4 mb-4'>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  // TODO: add proper error UI
  if (error) {
    return (
      <div className='w-100'>
        <div className='bg-slate-50 rounded p-4 mb-4'>
          <div>Error: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-100'>
      <div className='bg-slate-50 rounded p-4 mb-4'>
        <div className='space-y-3'>
          {organizations.map(organization => (
            <OrganizationCard
              key={organization.id}
              title={organization.name}
              location={organization.location}
              description={organization.description}
              tags={['SCHOOL']}
              hasBookmark={true}
              onClick={() => onSelect(organization)}
              selected={selectedOrgId === organization.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
