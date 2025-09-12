'use client';

import { Separator } from '@/components/ui/separator';
import { OpportunityDto } from '../../dto';

interface OpportunityCompanyInfoProps {
  opportunity: OpportunityDto;
}

export const OpportunityCompanyInfo = ({ opportunity }: OpportunityCompanyInfoProps) => {
  if (!opportunity.organization) return null;

  return (
    <div className='bg-white p-6 rounded-lg border shadow-sm'>
      <h2 className='text-base font-semibold text-gray-900'>About the Company</h2>

      <Separator className='my-2' />
      <div className='space-y-3'>
        {opportunity.organization.aboutTheCompany ? (
          <p className='text-gray-700 leading-relaxed'>{opportunity.organization.aboutTheCompany}</p>
        ) : (
          <p className='text-gray-500 '>No company description available.</p>
        )}
        <div className='flex flex-col gap-4 text-sm'>
          {opportunity.organization.type && (
            <div>
              <span className='font-medium text-gray-900'>Type:</span>
              <span className='ml-2 text-gray-700'>{opportunity.organization.type}</span>
            </div>
          )}

          {opportunity.organization.industry && (
            <>
              <div>
                <span className='font-medium text-gray-900'>Industry:</span>
                <span className='ml-2 text-gray-700'>{opportunity.organization.industry}</span>
              </div>

              <Separator className='my-2 md:hidden' />
            </>
          )}
          {opportunity.organization.employmentSize && (
            <div>
              <span className='font-medium text-gray-900'>Company Size:</span>
              <span className='ml-2 text-gray-700'>{opportunity.organization.employmentSize}</span>
            </div>
          )}
          {opportunity.organization.location && (
            <div>
              <span className='font-medium text-gray-900'>Location:</span>
              <span className='ml-2 text-gray-700'>{opportunity.organization.location}</span>
            </div>
          )}
          {opportunity.organization.website && (
            <div>
              <span className='font-medium text-gray-900'>Website:</span>
              <a
                href={opportunity.organization.website}
                target='_blank'
                rel='noopener noreferrer'
                className='ml-2 text-blue-600 hover:text-blue-800'
              >
                {opportunity.organization.website}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
