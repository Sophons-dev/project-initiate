'use client';

import { OpportunityDetailsContent } from '@/features/opportunities/components/opportunity-details-content';
import { OpportunityDetailsHero } from '@/features/opportunities/components/opportunity-details-hero';
import { OpportunityDetailsProvider } from '@/features/opportunities/components/opportunity-details.provider';
import { useGetOpportunityById } from '@/features/opportunities/hooks';
import { useParams } from 'next/navigation';
import Loading from '../../../../loading';
import NotFound from './not-found';

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
