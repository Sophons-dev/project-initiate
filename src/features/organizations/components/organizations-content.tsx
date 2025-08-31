import { SearchInput } from '@/components/shared';
import { useOrganizations } from '../hooks/useOrganizations';
import { OrganizationDetails } from './organization-details';
import { OrganizationsList } from './organizations-list';
import { motion } from 'framer-motion';
import { useFilter } from '@/hooks/useFilter';
import { DropdownFilter } from '@/components/shared/dropdown-filter';
import { organizationFilters } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { Organization } from '../types';

export const OrganizationsContent = () => {
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const { data: organizationData, isLoading, error } = useOrganizations();
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredData,
  } = useFilter(organizationData ?? [], organizationFilters);

  useEffect(() => {
    if (selectedOrganization) return;
    setSelectedOrganization(filteredData[0]);
  }, [filteredData]);

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
              Recommended Opportunities
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
            selectedOrgId={selectedOrganization?.id ?? ''}
            isLoading={isLoading}
            error={error ?? undefined}
            onSelect={setSelectedOrganization}
          />
          <OrganizationDetails
            organization={selectedOrganization ?? filteredData[0]}
            isLoading={isLoading}
            error={error ?? undefined}
          />
        </div>
      </motion.div>
    </div>
  );
};
