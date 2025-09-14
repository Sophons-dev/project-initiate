import { OrganizationDto } from '../dto/organization.dto';
import { OrganizationCard } from './organization-card';
import { OrganizationsListSkeleton } from './skeletons';

interface OrganizationsListProps {
  organizations: OrganizationDto[];
  selectedOrgId: string;
  isLoading?: boolean;
  isFetching?: boolean;
  error?: Error;
  onSelect: (organization: OrganizationDto) => void;
}

export const OrganizationsList = ({
  organizations,
  selectedOrgId,
  isLoading,
  isFetching,
  error,
  onSelect,
}: OrganizationsListProps) => {
  if (isLoading && !organizations?.length) {
    return (
      <div className='w-100'>
        <div className='bg-slate-50 rounded p-4 mb-4'>
          <OrganizationsListSkeleton />
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
          {organizations
            .filter(org => org)
            .map(organization => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
                onClick={() => onSelect(organization)}
                selected={selectedOrgId === organization.id}
              />
            ))}
          {isFetching && organizations?.length > 0 && (
            <div className='pt-2'>
              <OrganizationsListSkeleton count={2} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
