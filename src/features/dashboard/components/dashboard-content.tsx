'use client';

import { motion } from 'framer-motion';
import { OpportunitiesList } from '@/features/opportunities/components';
import { TabFilter, SearchInput } from '@/components/shared';
import { useFilter } from '@/hooks/useFilter';
import { filterColors } from '@/lib/constants';
import { useGetRecommendedOpportunities } from '@/features/opportunities/hooks';
import { opportunityFilters } from '@/lib/constants';

export const DashboardContent = () => {
  const userId = 'user1'; // TODO: get user id from auth context once backend is ready
  const {
    data: opportunityData,
    isLoading,
    error,
  } = useGetRecommendedOpportunities(userId);
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredData,
  } = useFilter(opportunityData ?? [], opportunityFilters);

  return (
    <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
      {/* Recommended Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-center justify-between mb-6'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-1'>
              Recommended Opportunities
            </h2>
            <p className='text-gray-600'>
              Here are your AI-powered personalized recommendations.
            </p>
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
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder='Search opportunities'
          />

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

        <OpportunitiesList
          opportunities={filteredData}
          isLoading={isLoading}
          error={error ?? undefined}
        />
      </motion.div>
    </div>
  );
};
