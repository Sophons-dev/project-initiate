'use client';

import { OpportunityDto } from '../../dto';

/**
 * For course opportunities, the metadata should include:
 * {
 *   tuition: {
 *     min: number,
 *     max: number,
 *     currency: string,
 *     isSpecified: boolean,
 *     range: string
 *   }
 * }
 */

interface OpportunityCompensationInfoProps {
  opportunity: OpportunityDto;
}

export const OpportunityCompensationInfo = ({ opportunity }: OpportunityCompensationInfoProps) => {
  const isJob = opportunity.type === 'job';
  const isCourse = opportunity.type === 'course';

  if (isJob) {
    return (
      <div className='bg-white p-6 rounded-lg border shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Salary Information</h3>
        <div className='space-y-3'>
          {opportunity.metadata?.salary?.isSpecified ? (
            <div>
              {opportunity.metadata.salary.min > 0 && opportunity.metadata.salary.max > 0 ? (
                <div className='text-center'>
                  <p className='text-2xl font-bold text-green-600'>
                    {opportunity.metadata.salary.currency} {opportunity.metadata.salary.min.toLocaleString()} -{' '}
                    {opportunity.metadata.salary.max.toLocaleString()}
                  </p>
                  <p className='text-sm text-gray-600'>Annual salary range</p>
                </div>
              ) : opportunity.metadata.salary.range ? (
                <div className='text-center'>
                  <p className='text-xl font-semibold text-gray-900'>{opportunity.metadata.salary.range}</p>
                  <p className='text-sm text-gray-600'>Salary information</p>
                </div>
              ) : null}
            </div>
          ) : (
            <div className='text-center text-gray-500'>
              <p className='text-sm'>Salary not specified</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isCourse) {
    return (
      <div className='bg-white p-6 rounded-lg border shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Tuition Information</h3>
        <div className='space-y-3'>
          {(opportunity.metadata as any)?.tuition?.isSpecified ? (
            <div>
              {(opportunity.metadata as any).tuition.min > 0 && (opportunity.metadata as any).tuition.max > 0 ? (
                <div className='text-center'>
                  <p className='text-2xl font-bold text-blue-600'>
                    {(opportunity.metadata as any).tuition.currency}{' '}
                    {(opportunity.metadata as any).tuition.min.toLocaleString()} -{' '}
                    {(opportunity.metadata as any).tuition.max.toLocaleString()}
                  </p>
                  <p className='text-sm text-gray-600'>Tuition range</p>
                </div>
              ) : (opportunity.metadata as any).tuition.range ? (
                <div className='text-center'>
                  <p className='text-xl font-semibold text-gray-900'>{(opportunity.metadata as any).tuition.range}</p>
                  <p className='text-sm text-gray-600'>Tuition information</p>
                </div>
              ) : null}
            </div>
          ) : (
            <div className='text-center text-gray-500'>
              <p className='text-sm'>Tuition not specified</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
