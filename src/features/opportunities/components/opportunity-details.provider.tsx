'use client';

import { OpportunityDTO, OpportunityRecommendationDTO } from '../dto';
import { createContext, useContext } from 'react';
import { useGetOpportunityById, useGetRecommendedOpportunityById } from '@/features/opportunities/hooks/queries';

interface OpportunityDetailsContextType {
  opportunity: OpportunityDTO | OpportunityRecommendationDTO | undefined;
  isLoading: boolean;
  error: Error | null;
}

const OpportunityDetailsContext = createContext<OpportunityDetailsContextType | undefined>(undefined);

export const OpportunityDetailsProvider = ({
  children,
  opportunityId,
}: {
  children: React.ReactNode;
  opportunityId: string;
}) => {
  // TODO: get user id from auth context once backend is ready
  const userId = 'user1';

  const {
    data: opportunity,
    isLoading: isLoadingOpportunity,
    error: errorOpportunity,
  } = useGetOpportunityById(opportunityId);

  const {
    data: recommendedOpportunity,
    isLoading: isLoadingRecommendedOpportunity,
    error: errorRecommendedOpportunity,
  } = useGetRecommendedOpportunityById(opportunityId, userId);

  return (
    <OpportunityDetailsContext.Provider
      value={{
        opportunity: recommendedOpportunity ?? opportunity ?? undefined,
        isLoading: isLoadingOpportunity || isLoadingRecommendedOpportunity,
        error: recommendedOpportunity ? errorRecommendedOpportunity : errorOpportunity,
      }}
    >
      {children}
    </OpportunityDetailsContext.Provider>
  );
};

export const useOpportunityDetailsContext = () => {
  const context = useContext(OpportunityDetailsContext);
  if (context === undefined) {
    throw new Error('useOpportunityDetailsContext must be used within a OpportunityDetailsProvider');
  }
  return context;
};
