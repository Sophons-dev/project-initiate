'use client';

import { motion } from 'framer-motion';
import { useOpportunityDetailsContext } from './opportunity-details.provider';

export const OpportunityDetailsContent = () => {
  const { opportunity, isLoading, error } = useOpportunityDetailsContext();

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Error: {error.message}
        </motion.div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          No opportunity found
        </motion.div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1>{opportunity.title}</h1>
        <p>{opportunity.description}</p>
        <p>{opportunity.location}</p>
        <p>{opportunity.type}</p>
        <p>{opportunity.dueDate}</p>
        <p>{opportunity.matchReason}</p>
        <p>{opportunity.date}</p>
      </motion.div>
    </div>
  );
};
