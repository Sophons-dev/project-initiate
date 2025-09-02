import { SearchInput } from '@/components/shared';
import { useGetAllOrganizations } from '../hooks';
import { OrganizationDetails } from './organization-details';
import { OrganizationsList } from './organizations-list';
import { motion } from 'framer-motion';
import { useFilter } from '@/hooks/useFilter';
import { DropdownFilter } from '@/components/shared/dropdown-filter';
import { organizationFilters } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { OrganizationDTO } from '../types';

export const OrganizationsContent = () => {
  const [selectedOrganization, setSelectedOrganization] =
    useState<OrganizationDTO | null>(null);

  const { data: organizationData, isLoading, error } = useGetAllOrganizations();
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredData,
  } = useFilter(organizationData ?? [], organizationFilters);

  useEffect(() => {
    if (!selectedOrganization && filteredData.length > 0) {
      setSelectedOrganization(filteredData[0]);
    }
  }, [filteredData, selectedOrganization]);

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <div>Loading organizations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <div>Error: {error.message}</div>
      </div>
    );
  }

  if (!organizationData || organizationData.length === 0) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <div>No organizations found.</div>
      </div>
    );
  }

  const currentSelectedOrganization = selectedOrganization || filteredData[0];

  return (
    <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-1'>
              All Organizations
            </h2>
            <p className='text-gray-600'>
              Here is the list all of the available opportunities.
            </p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-3 items-center justify-between mb-6'>
          {/* Search */}
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder='Search organizations'
          />

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
          <OrganizationsList
            organizations={filteredData}
            selectedOrgId={currentSelectedOrganization?.id ?? ''}
            onSelect={setSelectedOrganization}
          />
          {currentSelectedOrganization && (
            <OrganizationDetails organization={currentSelectedOrganization} />
          )}
        </div>
      </motion.div>
    </div>
  );
};
