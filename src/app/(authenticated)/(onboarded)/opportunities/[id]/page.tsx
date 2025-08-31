import { OpportunityDetailsContent } from '@/features/opportunities/components/opportunity-details-content';
import { OpportunityDetailsHero } from '@/features/opportunities/components/opportunity-details-hero';
import { OpportunityDetailsProvider } from '@/features/opportunities/components/opportunity-details.provider';

export default async function OpportunitiesDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: opportunityId } = await params;

  return (
    <OpportunityDetailsProvider opportunityId={opportunityId}>
      <div className='min-h-screen'>
        <main>
          <OpportunityDetailsHero />
          <OpportunityDetailsContent />
        </main>
      </div>
    </OpportunityDetailsProvider>
  );
}
