'use client';

import Greeter from '@/components/layout/greeter';
import { useOpportunityDetailsContext } from './opportunity-details.provider';
import { OpportunityDTO, OpportunityRecommendationDTO } from '../dto';
import { motion } from 'framer-motion';

const isOpportunityRecommendation = (
  opportunity: OpportunityDTO | OpportunityRecommendationDTO
): opportunity is OpportunityRecommendationDTO => {
  return (opportunity as OpportunityRecommendationDTO).userId !== undefined;
};

export const OpportunityDetailsHero = () => {
  const { opportunity, isLoading, error } = useOpportunityDetailsContext();

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          Loading...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          Error: {error.message}
        </motion.div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          No opportunity found
        </motion.div>
      </div>
    );
  }

  const baseOpportunity: OpportunityDTO = isOpportunityRecommendation(opportunity)
    ? ((opportunity as OpportunityRecommendationDTO).opportunity as OpportunityDTO)
    : (opportunity as OpportunityDTO);

  return (
    <Greeter
      action={{ title: 'View Recommendations', redirect: '/dashboard' }}
      message='Here are the list of opportunities that are available for you.'
    />
  );
};
