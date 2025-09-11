'use client';

import { motion } from 'framer-motion';
import { useOpportunityDetailsContext } from './opportunity-details.provider';
import { MetadataRenderer } from './opportunity-details-metadata';
import { formatKey } from '@/lib/utils';
import { OpportunitiesList } from './opportunities-list';
import { useGetRecommendedOpportunitiesByTags } from '../hooks/queries';
import { OpportunityDto, OpportunityRecommendationDto } from '../dto';
import NotFound from '@/app/(authenticated)/(onboarded)/opportunities/[id]/not-found';

const isOpportunityRecommendation = (
  opportunity: OpportunityDto | OpportunityRecommendationDto | undefined
): opportunity is OpportunityRecommendationDto => {
  return (opportunity as OpportunityRecommendationDto)?.userId !== undefined;
};

export const OpportunityDetailsContent = () => {
  const { opportunity, isLoading, error } = useOpportunityDetailsContext();

  console.log('opportunity', opportunity);

  const baseOpportunity: OpportunityDto = isOpportunityRecommendation(opportunity)
    ? ((opportunity as OpportunityRecommendationDto).opportunity as OpportunityDto)
    : (opportunity as OpportunityDto);

  const {
    data: recommendedOpportunities,
    isLoading: isLoadingRecommendedOpportunities,
    error: errorRecommendedOpportunities,
  } = useGetRecommendedOpportunitiesByTags(baseOpportunity?.id ?? '', baseOpportunity?.tags ?? []);

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!opportunity && !isLoading) {
    return <NotFound />;
  }

  const recommendationDetails: {
    score?: number | null;
    rank?: number | null;
    reasoning?: string | null;
    tagsMatched: string[];
  } | null = isOpportunityRecommendation(opportunity)
    ? {
        score: (opportunity as OpportunityRecommendationDto).score,
        rank: (opportunity as OpportunityRecommendationDto).rank,
        reasoning: (opportunity as OpportunityRecommendationDto).reasoning,
        tagsMatched: (opportunity as OpportunityRecommendationDto).tagsMatched,
      }
    : null;

  return (
    <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        {/* Main Content Sections */}
        <div className='flex gap-10'>
          {/* About Section */}

          {/* TODO: improve UI */}
          <div className='flex flex-col gap-2 flex-3'>
            <h2 className='text-lg font-medium text-gray-900'>About</h2>
            <p>{baseOpportunity.description}</p>
            <p>
              {baseOpportunity.location.city}, {baseOpportunity.location.country}
            </p>
            <p>{baseOpportunity.applicationDeadline || baseOpportunity.postedDate}</p>
            <p>{baseOpportunity.organization?.name}</p>
            <p>{baseOpportunity.createdAt?.toLocaleDateString()}</p>
            <p>{baseOpportunity.updatedAt?.toLocaleDateString()}</p>
            <p>{baseOpportunity.type}</p>
            <p>{baseOpportunity.subtype}</p>
            <p>{baseOpportunity.location.type}</p>
            <p>Posted: {baseOpportunity.postedDate}</p>
            <p>Days ago: {baseOpportunity.daysAgoPosted}</p>
          </div>

          {/* Metadata Section */}
          <div className='flex flex-1 flex-col gap-2'>
            <div className='p-2 bg-slate-50 rounded gap-2 flex flex-col'>
              {recommendationDetails && (
                <div className='bg-white p-6 rounded border shadow'>
                  <span>
                    <p className='font-medium'>Reasoning:</p> {recommendationDetails.reasoning}
                  </span>
                </div>
              )}
              {recommendationDetails && (
                <div className='bg-white rounded border shadow'>
                  <div className='flex flex-col gap-2 flex-3 p-6'>
                    <h2 className='text-md font-medium text-gray-900'>Recommendation Details</h2>
                    {recommendationDetails.score && (
                      <span>
                        <p className='font-medium'>Score:</p> {recommendationDetails.score.toFixed(2)}
                      </span>
                    )}
                    {recommendationDetails.rank && (
                      <span>
                        <p className='font-medium'>Rank:</p> {recommendationDetails.rank}
                      </span>
                    )}
                    {recommendationDetails.tagsMatched && (
                      <span>
                        <p className='font-medium'>Tags Matched:</p> {recommendationDetails.tagsMatched.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div className='bg-white p-6 pb-2 rounded border shadow'>
                {baseOpportunity.metadata &&
                  Object.entries(baseOpportunity.metadata as Record<string, unknown>).map(([key, value]) => (
                    <div key={key} className='mb-4'>
                      <h3 className='font-medium'>{formatKey(key)}:</h3>
                      <MetadataRenderer data={value} inline={true} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <hr className='my-10' />

        {/* Related Opportunities Section */}
        <div className='flex gap-10 mb-10'>
          <div className='flex flex-col gap-2 flex-3'>
            <h2 className='text-lg font-medium text-gray-900 mb-5'>Related Opportunities</h2>
            {isLoadingRecommendedOpportunities ? (
              <div>Loading...</div>
            ) : errorRecommendedOpportunities ? (
              <div>Error: {errorRecommendedOpportunities.message}</div>
            ) : (
              <OpportunitiesList opportunities={recommendedOpportunities ?? []} />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
