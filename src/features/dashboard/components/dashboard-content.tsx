'use client';

import { motion } from 'framer-motion';
import { OpportunitiesList } from '@/features/opportunities/components';
import { TabFilter, SearchInput } from '@/components/shared';
import { useFilter } from '@/hooks/useFilter';
import { filterColors } from '@/lib/constants';
import { useOpportunities } from '@/features/opportunities/hooks';
import { opportunityFilters } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const DashboardContent = () => {
  // TODO: Refactor, uses hacky solution for context, uses onboardingData defined in completion step
  const [context, setContext] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') ?? '';

  const {
    data: opportunityData,
    isLoading,
    error,
  } = useOpportunities({ context: context ?? '', userId });

  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredData,
  } = useFilter(opportunityData ?? [], opportunityFilters);

  useEffect(() => {
    const context = window.localStorage.getItem('onboardingData');
    if (context) {
      setContext(context);
    }
  }, []);

  return (
    <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
      {/* Recommended Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 1 }}
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
