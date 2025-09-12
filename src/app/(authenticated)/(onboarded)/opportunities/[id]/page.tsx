'use client';

import { OpportunityDetailsContent } from '@/features/opportunities/components/opportunity-details-content';
import { OpportunityDetailsProvider } from '@/features/opportunities/components/opportunity-details.provider';
import { useParams } from 'next/navigation';

export default function OpportunitiesDetailsPage() {
  const params = useParams();
  const opportunityId = params.id as string;

  return (
    <OpportunityDetailsProvider opportunityId={opportunityId}>
      <div className='min-h-screen'>
        <main>
          {/* <OpportunityDetailsHero /> */}
          <OpportunityDetailsContent />
        </main>
      </div>
    </OpportunityDetailsProvider>
  );
}
