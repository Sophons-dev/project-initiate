import {
  Opportunity,
  RecommendedOpportunityCard,
} from '@/components/shared/cards/recommended-opportunity-card';

interface OpportunitiesListProps {
  opportunities: Opportunity[];
}

export const OpportunitiesList = ({
  opportunities,
}: OpportunitiesListProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3.5 bg-[#E9E9E9]/50 rounded'>
      {opportunities.length > 0 ? (
        opportunities.map(opportunity => (
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
  );
};
