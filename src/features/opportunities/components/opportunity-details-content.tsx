'use client';

import { motion } from 'framer-motion';
import { useOpportunityDetailsContext } from './opportunity-details.provider';
import { useGetRecommendedOpportunitiesByTags } from '../hooks/queries';
import { OpportunityDto, OpportunityRecommendationDto } from '../dto';
import NotFound from '@/app/(authenticated)/(onboarded)/opportunities/[id]/not-found';
import {
  OpportunityHeader,
  OpportunityCompanyInfo,
  OpportunityRecommendationDetails,
  OpportunityRequiredSkills,
  OpportunityAdditionalMetadata,
  OpportunityRelatedOpportunities,
  OpportunityTypeSpecificContent,
  OpportunityTypeSpecificSidebar,
  OpportunityCompensationInfo,
  OpportunityTypeSpecificActions,
} from './opportunity-details';

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
          <div className='flex items-center justify-center py-20'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
              <p className='text-gray-600'>Loading opportunity details...</p>
            </div>
          </div>
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
        <div className='flex gap-5'>
          {/* Main Content */}
          <div className='flex flex-col gap-8 flex-2'>
            <OpportunityHeader opportunity={baseOpportunity} />
            <OpportunityTypeSpecificContent opportunity={baseOpportunity} />
          </div>

          {/* Sidebar */}
          <div className='flex flex-1 flex-col gap-6'>
            {recommendationDetails && (
              <OpportunityRecommendationDetails recommendationDetails={recommendationDetails} />
            )}

            <OpportunityTypeSpecificSidebar opportunity={baseOpportunity} />

            <OpportunityCompanyInfo opportunity={baseOpportunity} />

            <OpportunityCompensationInfo opportunity={baseOpportunity} />

            <OpportunityRequiredSkills opportunity={baseOpportunity} />

            {/* <OpportunityAdditionalMetadata opportunity={baseOpportunity} /> */}

            <OpportunityTypeSpecificActions opportunity={baseOpportunity} />
          </div>
        </div>

        <hr className='my-10' />

        <OpportunityRelatedOpportunities
          recommendedOpportunities={recommendedOpportunities}
          isLoading={isLoadingRecommendedOpportunities}
          error={errorRecommendedOpportunities}
        />
      </motion.div>
    </div>
  );
};
