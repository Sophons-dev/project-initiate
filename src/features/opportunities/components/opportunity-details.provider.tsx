'use client';

import { createContext, useContext } from 'react';
import { Opportunity } from '@/features/opportunities/components/opportunity-card';
import { useGetOpportunityById } from '@/features/opportunities/hooks/queries';

interface OpportunityDetailsContextType {
  opportunity: Opportunity | undefined;
  isLoading: boolean;
  error: Error | null;
}

const OpportunityDetailsContext = createContext<
  OpportunityDetailsContextType | undefined
>(undefined);

export const OpportunityDetailsProvider = ({
  children,
  opportunityId,
}: {
  children: React.ReactNode;
  opportunityId: string;
}) => {
  const {
    data: opportunity,
    isLoading,
    error,
  } = useGetOpportunityById(opportunityId);

  return (
    <OpportunityDetailsContext.Provider
      value={{
        opportunity: opportunity ?? undefined,
        isLoading,
        error,
      }}
    >
      {children}
    </OpportunityDetailsContext.Provider>
  );
};

export const useOpportunityDetailsContext = () => {
  const context = useContext(OpportunityDetailsContext);
  if (context === undefined) {
    throw new Error(
      'useOpportunityDetailsContext must be used within a OpportunityDetailsProvider'
    );
  }
  return context;
};
