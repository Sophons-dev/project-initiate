'use client';

import { Separator } from '@/components/ui/separator';
import { OpportunityDto } from '../../dto';

interface OpportunityRequiredSkillsProps {
  opportunity: OpportunityDto;
}

export const OpportunityRequiredSkills = ({ opportunity }: OpportunityRequiredSkillsProps) => {
  if (!opportunity.metadata?.requiredSkills || opportunity.metadata.requiredSkills.length === 0) {
    return null;
  }

  return (
    <div className='bg-white p-6 rounded-lg border shadow-sm'>
      <h3 className='text-base font-semibold text-gray-900 '>Required Skills</h3>

      <Separator className='my-4' />

      <div className='flex flex-wrap gap-2'>
        {opportunity.metadata.requiredSkills.map((skill, index) => (
          <span key={index} className='px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm'>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
