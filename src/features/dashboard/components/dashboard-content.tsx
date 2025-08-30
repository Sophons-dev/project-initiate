'use client';

import { motion } from 'framer-motion';
import { OpportunitiesList } from '@/features/opportunities/components/opportunities-list';
import { Opportunity } from '@/components/shared/cards/recommended-opportunity-card';
import { useFilter } from '@/hooks/useFilter';
import { FilterTabs } from '@/components/shared/filter-tabs';
import { SearchInput } from '@/components/shared/search';
import { filterColors } from '@/lib/constants';
import { useOpportunities } from '@/features/opportunities/hooks/useOpportunities';

export const OpportunitiesContent = () => {
  const { data: opportunityData, isLoading, error } = useOpportunities();

  const filters = [
    { label: 'Show All', predicate: () => true },
    { label: 'Jobs', predicate: (op: Opportunity) => op.type === 'JOB' },
    { label: 'Courses', predicate: (op: Opportunity) => op.type === 'COURSE' },
    { label: 'Events', predicate: (op: Opportunity) => op.type === 'EVENT' },
  ];

  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredData,
  } = useFilter(opportunityData ?? [], filters);

  return (
    <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
      {/* Recommended Opportunities */}
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
              Here are your AI-powered personalized recommendations.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className='text-cyan-500 hover:text-cyan-600 font-medium'
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
          <FilterTabs
            filters={filters.map(f => f.label)}
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
