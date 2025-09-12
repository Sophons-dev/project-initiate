'use client';

import { OpportunityDto } from '../../dto';
import { MetadataRenderer } from '../opportunity-details-metadata';
import { formatKey } from '@/lib/utils';

interface OpportunityAdditionalMetadataProps {
  opportunity: OpportunityDto;
}

export const OpportunityAdditionalMetadata = ({ opportunity }: OpportunityAdditionalMetadataProps) => {
  if (!opportunity.metadata) return null;

  const filteredMetadata = Object.entries(opportunity.metadata as Record<string, unknown>).filter(
    ([key, value]) =>
      ![
        'salary',
        'requiredSkills',
        'employmentType',
        'yearsOfExperience',
        'jobCategory',
        'jobSubCategory',
        'matchScore',
        'employerQuestions',
      ].includes(key) &&
      value !== null &&
      value !== undefined &&
      value !== ''
  );

  if (filteredMetadata.length === 0) return null;

  return (
    <div className='bg-white p-6 rounded-lg border shadow-sm'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>Additional Details</h3>
      <div className='space-y-3'>
        {filteredMetadata.map(([key, value]) => (
          <div key={key} className='flex flex-col gap-1'>
            <h4 className='font-medium text-gray-900'>{formatKey(key)}:</h4>
            <div className='text-sm text-gray-700'>
              <MetadataRenderer data={value} inline={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
