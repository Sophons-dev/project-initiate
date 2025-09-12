'use client';

import { OpportunityDto } from '../../dto';

/**
 * For course opportunities, the metadata should include:
 * {
 *   difficultyLevel: 'beginner' | 'intermediate' | 'advanced',
 *   duration: string,
 *   courseCategory: string,
 *   certification: boolean
 * }
 */

interface OpportunityTypeSpecificSidebarProps {
  opportunity: OpportunityDto;
}

export const OpportunityTypeSpecificSidebar = ({ opportunity }: OpportunityTypeSpecificSidebarProps) => {
  const isJob = opportunity.type === 'job';
  const isCourse = opportunity.type === 'course';

  return (
    <>
      {/* Job Details */}
      {isJob && (
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Job Details</h3>
          <div className='space-y-3'>
            {opportunity.type && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Type:</span>
                <span className='font-medium capitalize'>{opportunity.type}</span>
              </div>
            )}
            {opportunity.subtype && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Employment:</span>
                <span className='font-medium capitalize'>{opportunity.subtype.replace('_', ' ')}</span>
              </div>
            )}
            {opportunity.metadata?.employmentType && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Employment Type:</span>
                <span className='font-medium capitalize'>{opportunity.metadata.employmentType}</span>
              </div>
            )}
            {opportunity.metadata?.yearsOfExperience && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Experience:</span>
                <span className='font-medium capitalize'>{opportunity.metadata.yearsOfExperience}</span>
              </div>
            )}
            {opportunity.metadata?.jobCategory && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Category:</span>
                <span className='font-medium'>{opportunity.metadata.jobCategory}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course Details */}
      {isCourse && (
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Course Details</h3>
          <div className='space-y-3'>
            {opportunity.type && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Type:</span>
                <span className='font-medium capitalize'>{opportunity.type}</span>
              </div>
            )}
            {opportunity.subtype && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Format:</span>
                <span className='font-medium capitalize'>{opportunity.subtype.replace('_', ' ')}</span>
              </div>
            )}
            {(opportunity.metadata as any)?.difficultyLevel && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Difficulty:</span>
                <span className='font-medium capitalize'>{(opportunity.metadata as any).difficultyLevel}</span>
              </div>
            )}
            {(opportunity.metadata as any)?.duration && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Duration:</span>
                <span className='font-medium'>{(opportunity.metadata as any).duration}</span>
              </div>
            )}
            {(opportunity.metadata as any)?.courseCategory && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Category:</span>
                <span className='font-medium'>{(opportunity.metadata as any).courseCategory}</span>
              </div>
            )}
            {(opportunity.metadata as any)?.certification !== undefined && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Certification:</span>
                <span className='font-medium text-green-600'>
                  {(opportunity.metadata as any).certification ? 'Yes' : 'No'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
