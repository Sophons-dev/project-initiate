'use client';

import { motion } from 'framer-motion';
import { OpportunitiesList } from '@/features/opportunities/components';
import { TabFilter, SearchInput, Pagination } from '@/components/shared';
import { useFilter } from '@/hooks/useFilter';
import { filterColors } from '@/lib/constants';
import { opportunityFilters } from '@/lib/constants';
import { useAuth } from '@clerk/nextjs';
import { useGetUserByClerkId } from '@/features/user/hooks/useUser';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetUserOpportunitiesPaginated } from '@/features/opportunities/hooks';
import { PaginationParams } from '@/features/opportunities/types/pagination';

export const DashboardContent = () => {
  const { userId } = useAuth();
  const { data } = useGetUserByClerkId(userId || '');
  const user = data?.data;

  const [searchQuery, setSearchQuery] = useState('');
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    limit: 9,
  });
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Update pagination params when search changes
  useEffect(() => {
    setPaginationParams(prev => ({
      ...prev,
      page: 1, // Reset to first page when searching
      search: debouncedSearchQuery || undefined,
    }));
  }, [debouncedSearchQuery]);

  const { opportunities, isLoading, error } = useGetUserOpportunitiesPaginated(user?.id || '', paginationParams);

  // Apply tab filtering
  const {
    activeFilter,
    setActiveFilter,
    filteredData: filteredOpportunities,
  } = useFilter(opportunities?.data ?? [], opportunityFilters);

  const handlePageChange = (page: number) => {
    setPaginationParams(prev => ({ ...prev, page }));
  };

  return (
    <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
      {/* Recommended Opportunities */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 1 }} transition={{ delay: 0.3 }}>
        <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-center justify-between mb-6'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-1'>Recommended Opportunities</h2>
            <p className='text-gray-600'>Here are your AI-powered personalized recommendations.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className='text-cyan-500 hidden lg:block hover:text-cyan-600 font-medium'
          >
            View All →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className='lg:hidden bg-cyan-500 w-full hover:bg-cyan-600 text-white px-6 py-2 rounded-full'
          >
            View All →
          </motion.button>
        </div>

        <div className='flex flex-col md:flex-row gap-3 items-center justify-between mb-6'>
          {/* Search */}
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder='Search opportunities' />

          {/* Filter Tabs */}
          <TabFilter
            filters={opportunityFilters.map(f => {
              return {
                label: f.label,
                value: f.value,
              };
            })}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filterColors={filterColors}
          />
        </div>

        <OpportunitiesList opportunities={filteredOpportunities} isLoading={isLoading} error={error ?? undefined} />

        {/* Pagination */}
        {opportunities?.meta && (
          <div className='mt-8'>
            <Pagination meta={opportunities.meta} onPageChange={handlePageChange} />
          </div>
        )}
      </motion.div>
    </div>
  );
};
