'use client';

import { OpportunitiesList } from '../opportunities-list';
import { OpportunityDto } from '../../dto';

interface OpportunityRelatedOpportunitiesProps {
  recommendedOpportunities: OpportunityDto[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const OpportunityRelatedOpportunities = ({
  recommendedOpportunities,
  isLoading,
  error,
}: OpportunityRelatedOpportunitiesProps) => {
  return (
    <div className='mb-10'>
      <div className='bg-white p-6 rounded-lg border shadow-sm'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6'>Related Opportunities</h2>
        {isLoading ? (
          <div className='flex items-center justify-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            <span className='ml-3 text-gray-600'>Loading related opportunities...</span>
          </div>
        ) : error ? (
          <div className='text-center py-8'>
            <div className='text-red-600 mb-2'>⚠️ Unable to load related opportunities</div>
            <p className='text-gray-600 text-sm'>{error.message}</p>
          </div>
        ) : recommendedOpportunities && recommendedOpportunities.length > 0 ? (
          <OpportunitiesList opportunities={recommendedOpportunities} />
        ) : (
          <div className='text-center py-8 text-gray-500'>
            <p>No related opportunities found at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};
