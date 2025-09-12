'use client';

import { Building2 } from 'lucide-react';
import { OpportunityDto } from '../../dto';

interface OpportunityHeaderProps {
  opportunity: OpportunityDto;
}

export const OpportunityHeader = ({ opportunity }: OpportunityHeaderProps) => {
  return (
    <div className='p-6 rounded-lg border shadow-sm mb-3'>
      <div className='flex items-start justify-between mb-4'>
        <div>
          <h3 className='text-xl font-bold text-gray-900 mb-2'>{opportunity.title}</h3>
          <div className='flex items-center gap-4 text-sm text-gray-600'>
            {opportunity.organization?.name && (
              <span className='font-medium flex items-center gap-1'>
                <Building2 className='w-4 h-4' />
                {opportunity.organization.name}
              </span>
            )}
            {opportunity.location.city && opportunity.location.country && (
              <span>
                📍 {opportunity.location.city}, {opportunity.location.country}
              </span>
            )}
            {opportunity.location.type && (
              <span className='px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs'>
                {opportunity.location.type}
              </span>
            )}
          </div>
        </div>
        <div className='text-right text-sm text-gray-500'>
          {opportunity.daysAgoPosted && <p>Posted {opportunity.daysAgoPosted} days ago</p>}
          {opportunity.applicationDeadline && (
            <p className='text-red-600 font-medium'>Deadline: {opportunity.applicationDeadline}</p>
          )}
        </div>
      </div>

      {/* Tags */}
      {opportunity.tags && opportunity.tags.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {opportunity.tags.map((tag, index) => (
            <span key={index} className='px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm'>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
