'use client';

import { Button } from '@/components/ui/button';
import { OpportunityDto } from '../../dto';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

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
          <Button asChild className='w-full bg-cyan-500 hover:bg-cyan-600 transition-colors'>
            <Link target='_blank' rel='noopener noreferrer' href={opportunity.url}>
              {getActionDescription()}
            </Link>
          </Button>
        ) : (
          <Button
            disabled
            className='w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-medium text-center cursor-not-allowed'
          >
            {isJob ? 'Application Link Not Available' : 'Enrollment Link Not Available'}
          </Button>
        )}
        {/* <Button className='w-full bg-white hover:bg-gray-100 border text-black transition-colors'>
          <Bookmark />
          {isJob ? 'Save Job' : 'Save Course'}
        </Button> */}
      </div>
    </div>
  );
};
