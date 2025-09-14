import { Pagination, SearchInput } from '@/components/shared';
import { OrganizationDetails } from './organization-details';
import { OrganizationsList } from './organizations-list';
import { OrganizationDetailsSkeleton, OrganizationsListSkeleton } from './skeletons';
import { motion } from 'framer-motion';
import { useFilter } from '@/hooks/useFilter';
import { DropdownFilter } from '@/components/shared/dropdown-filter';
import { organizationFilters } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { OrganizationDto } from '../dto/organization.dto';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetOrganizations } from '../hooks/useOrganizations';

export const OrganizationsContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationDto | null>(null);
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    limit: 10,
    search: searchQuery || undefined,
  });

  // Debounece search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Update pagination params when search changes
  useEffect(() => {
    setPaginationParams(prev => ({
      ...prev,
      page: 1, // Reset to first page when searching
      search: debouncedSearchQuery || undefined,
    }));
  }, [debouncedSearchQuery]);

  const { organizations, isLoading, error } = useGetOrganizations(paginationParams);
  const hasData = (organizations?.data?.length ?? 0) > 0;
  const isInitialLoad = isLoading && !hasData;
  const { activeFilter, setActiveFilter, filteredData } = useFilter(organizations?.data ?? [], organizationFilters);

  useEffect(() => {
    if (!selectedOrganization && filteredData.length > 0) {
      setSelectedOrganization(filteredData[0]);
    }
  }, [filteredData, selectedOrganization]);

  if (error) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <div>Error: {error.message}</div>
      </div>
    );
  }

  const currentSelectedOrganization = selectedOrganization || filteredData[0];

  const handlePageChange = (page: number) => {
    setPaginationParams(prev => ({ ...prev, page }));
  };

  return (
    <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-1'>All Organizations</h2>
            <p className='text-gray-600'>Here is the list all of the available opportunities.</p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-3 items-center justify-between mb-6'>
          {/* Search */}
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder='Search organizations' />

          {/* Filter Tabs */}
          <div className='relative rounded-lg h-fit p-1.5 bg-slate-50'>
            <div className='flex space-x-1'>
              <DropdownFilter
                filters={organizationFilters.map(f => {
                  return {
                    label: f.label,
                    value: f.value,
                  };
                })}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
            </div>
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='flex-[0.55]'>
            {isInitialLoad ? (
              <div className='bg-slate-50 rounded p-4 mb-4'>
                <OrganizationsListSkeleton />
              </div>
            ) : (
              <OrganizationsList
                organizations={filteredData}
                selectedOrgId={currentSelectedOrganization?.id ?? ''}
                isLoading={isLoading}
                onSelect={setSelectedOrganization}
              />
            )}
          </div>
          {isInitialLoad ? (
            <OrganizationDetailsSkeleton />
          ) : (
            currentSelectedOrganization && <OrganizationDetails organization={currentSelectedOrganization} />
          )}
        </div>

        {/* Pagination */}
        {organizations?.meta && (
          <div className='mt-8'>
            <Pagination meta={organizations.meta} onPageChange={handlePageChange} />
          </div>
        )}
      </motion.div>
    </div>
  );
};
