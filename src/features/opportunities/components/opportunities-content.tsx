import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { OpportunitiesList } from '@/features/opportunities/components';
import { TabFilter, SearchInput, Pagination } from '@/components/shared';
import { opportunityFilters } from '@/lib/constants';
import { useFilter } from '@/hooks/useFilter';
import { useDebounce } from '@/hooks/useDebounce';
import { filterColors } from '@/lib/constants';
import { useGetAllOpportunities } from '@/features/opportunities/hooks';
import { PaginationParams } from '@/features/opportunities/types/pagination';

export const OpportunitiesContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    limit: 9,
  });

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Update pagination params when search changes
  useEffect(() => {
    setPaginationParams(prev => ({
      ...prev,
      page: 1, // Reset to first page when searching
      search: debouncedSearchQuery || undefined,
    }));
  }, [debouncedSearchQuery]);

  const { data: opportunityResponse, isLoading, error } = useGetAllOpportunities(paginationParams);
  const { activeFilter, setActiveFilter, filteredData } = useFilter(
    opportunityResponse?.data ?? [],
    opportunityFilters
  );

  const handlePageChange = (page: number) => {
    setPaginationParams(prev => ({ ...prev, page }));
  };

  return (
    <div className='min-h-screen max-w-7xl mx-auto py-10 px-2 lg:px-0'>
      {/* Recommended Opportunities */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-1'>All Opportunities</h2>
            <p className='text-gray-600'>Here is the list all of the available opportunities.</p>
          </div>
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

        <OpportunitiesList opportunities={filteredData} isLoading={isLoading} error={error ?? undefined} />

        {/* Pagination */}
        {opportunityResponse?.meta && (
          <div className='mt-8'>
            <Pagination meta={opportunityResponse.meta} onPageChange={handlePageChange} />
          </div>
        )}
      </motion.div>
    </div>
  );
};
