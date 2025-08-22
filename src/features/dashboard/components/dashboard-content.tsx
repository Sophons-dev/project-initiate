'use client';

import { opportunityData, RecommendedOpportunityCard } from '@/components/shared/cards/recommended-opportunity-card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export const DashboardContent = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Show All');
  const [searchQuery, setSearchQuery] = useState('');
  const filters = ['Show All', 'Jobs', 'Courses', 'Events'];

  // Filter and search logic
  const filteredOpportunities = useMemo(() => {
    return opportunityData.filter((opportunity) => {
      // Filter by type
      const matchesFilter =
        activeFilter === 'Show All' ||
        (activeFilter === 'Jobs' && opportunity.type === 'JOB') ||
        (activeFilter === 'Courses' && opportunity.type === 'COURSE') ||
        (activeFilter === 'Events' && opportunity.type === 'EVENT');

      // Search in title, organization, and description
      const matchesSearch =
        searchQuery === '' ||
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='max-w-7xl mx-auto py-10 px-4 md:px-0'>
      {/* Recommended Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-1'>Recommended Opportunities</h2>
            <p className='text-gray-600'>Here are your AI-powered personalized recommendations.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className='text-cyan-500 hover:text-cyan-600 font-medium'>
            View All →
          </motion.button>
        </div>

        <div className='flex items-center justify-between mb-6'>
          {/* Search */}
          <motion.div
            className='flex-1 relative max-w-md'
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              placeholder='Search opportunities'
              className='pl-10 w-full h-[40px] border border-gray-200 bg-[#E9E9E9]/50'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </motion.div>

          {/* Filter Tabs */}
          <div className='p-1.5 bg-[#E9E9E9]/50 rounded'>
            <div className='flex items-center space-x-6'>
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-2 rounded border-b-2 transition-colors ${
                    activeFilter === filter
                      ? 'bg-white font-medium'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}>
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Opportunities Grid */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3.5 bg-[#E9E9E9]/50 rounded'>
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
              <RecommendedOpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))
          ) : (
            <div className='col-span-3 text-center py-10 text-gray-500'>
              No opportunities found matching your criteria.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
