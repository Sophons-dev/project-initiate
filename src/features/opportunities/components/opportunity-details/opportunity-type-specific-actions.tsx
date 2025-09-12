'use client';

import { OpportunityDto } from '../../dto';

interface OpportunityTypeSpecificActionsProps {
  opportunity: OpportunityDto;
}

export const OpportunityTypeSpecificActions = ({ opportunity }: OpportunityTypeSpecificActionsProps) => {
  const isJob = opportunity.type === 'job';
  const isCourse = opportunity.type === 'course';

  const getActionText = () => {
    if (isJob) return 'Apply for Job';
    if (isCourse) return 'Enroll in Course';
    return 'Apply';
  };

  const getActionDescription = () => {
    if (isJob) return 'Apply on Company Website';
    if (isCourse) return 'Enroll on Course Platform';
    return 'Apply on Website';
  };

  return (
    <div className='bg-white p-6 rounded-lg border shadow-sm'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>{getActionText()}</h3>
      <div className='space-y-3'>
        {opportunity.url ? (
          <a
            href={opportunity.url}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium text-center block hover:bg-blue-700 transition-colors'
          >
            {getActionDescription()}
          </a>
        ) : (
          <button
            disabled
            className='w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-medium text-center cursor-not-allowed'
          >
            {isJob ? 'Application Link Not Available' : 'Enrollment Link Not Available'}
          </button>
        )}
        <button className='w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors'>
          {isJob ? 'Save Job' : 'Save Course'}
        </button>
      </div>
    </div>
  );
};
