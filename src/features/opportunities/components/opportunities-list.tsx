import { OpportunityDTO, OpportunityRecommendationDTO } from '../dto';
import { OpportunityCard } from './opportunity-card';

interface OpportunitiesListProps {
  opportunities: OpportunityDTO[] | OpportunityRecommendationDTO[];
  isLoading?: boolean;
  error?: Error;
}

export const OpportunitiesList = ({ opportunities, isLoading, error }: OpportunitiesListProps) => {
  // TODO: add proper loading like skeleton or loader
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3.5 bg-[#E9E9E9]/50 rounded'>
        <div>Loading...</div>
      </div>
    );
  }

  // TODO: add proper error UI
  if (error) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3.5 bg-[#E9E9E9]/50 rounded'>
        <div>Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className='grid [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))] gap-4 p-3.5 bg-slate-50 rounded'>
      {opportunities.length > 0 ? (
        opportunities.map((opportunity, index) => (
          <OpportunityCard key={opportunity.id || `opportunity-${index}`} opportunity={opportunity} />
        ))
      ) : (
        <div className='col-span-full text-center py-10 text-gray-500'>No opportunities found</div>
      )}
    </div>
  );
};
