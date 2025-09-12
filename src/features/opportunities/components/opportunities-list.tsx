import { OpportunityDto, OpportunityRecommendationDto } from '../dto';
import { OpportunityCard } from './opportunity-card';

interface OpportunitiesListProps {
  opportunities: (OpportunityRecommendationDto | OpportunityDto)[];
  isLoading?: boolean;
  error?: Error;
}

export const OpportunitiesList = ({ opportunities, isLoading, error }: OpportunitiesListProps) => {
  // Loading state with skeleton cards
  if (isLoading) {
    return (
      <div className='grid [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))] gap-4 p-3.5 bg-slate-50 rounded'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`skeleton-${index}`} className='bg-white rounded-lg border p-4 animate-pulse'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex gap-2'>
                <div className='h-6 w-16 bg-gray-200 rounded'></div>
                <div className='h-6 w-20 bg-gray-200 rounded'></div>
              </div>
              <div className='h-4 w-20 bg-gray-200 rounded'></div>
            </div>
            <div className='h-6 w-3/4 bg-gray-200 rounded mb-3'></div>
            <div className='space-y-2 mb-4'>
              <div className='h-4 w-1/2 bg-gray-200 rounded'></div>
              <div className='h-4 w-2/3 bg-gray-200 rounded'></div>
            </div>
            <div className='h-4 w-full bg-gray-200 rounded mb-2'></div>
            <div className='h-4 w-3/4 bg-gray-200 rounded mb-4'></div>
            <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
              <div className='h-4 w-24 bg-gray-200 rounded'></div>
              <div className='h-8 w-20 bg-gray-200 rounded'></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state with retry option
  if (error) {
    return (
      <div className='grid [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))] gap-4 p-3.5 bg-slate-50 rounded'>
        <div className='col-span-full flex flex-col items-center justify-center py-12 text-center'>
          <div className='text-red-500 mb-4'>
            <svg className='w-12 h-12 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>Failed to load opportunities</h3>
          <p className='text-gray-600 mb-4 max-w-md'>
            {error.message || 'Something went wrong while loading opportunities. Please try again.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='grid [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))] gap-4 p-3.5 bg-slate-50 rounded'>
      {opportunities.length > 0 ? (
        opportunities.map((opportunity, index) => {
          // Get the actual opportunity data for key generation
          const opportunityData = 'opportunity' in opportunity ? opportunity.opportunity : opportunity;
          const key = opportunityData?.id || `opportunity-${index}`;

          return <OpportunityCard key={key} opportunity={opportunity} />;
        })
      ) : (
        <div className='col-span-full text-center py-10 text-gray-500'>No opportunities found</div>
      )}
    </div>
  );
};
