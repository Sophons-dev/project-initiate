'use client';

import { OpportunityDto } from '../../dto';

interface OpportunityTypeSpecificContentProps {
  opportunity: OpportunityDto;
}

export const OpportunityTypeSpecificContent = ({ opportunity }: OpportunityTypeSpecificContentProps) => {
  const isJob = opportunity.type === 'job';
  const isCourse = opportunity.type === 'course';

  return (
    <>
      {/* Job-specific content */}
      {isJob && (
        <>
          {/* About  */}
          {opportunity.description && (
            <div>
              <h2 className='text-base font-semibold text-gray-900 mb-2'>Job Description</h2>
              <p className='text-gray-700 leading-relaxed'>{opportunity.description}</p>
            </div>
          )}

          {/* Job Description */}
          {opportunity.jobDescription && (
            <div>
              <h2 className='text-base font-semibold text-gray-900 mb-2'>Job Description</h2>
              <p className='text-gray-700 leading-relaxed'>{opportunity.jobDescription}</p>
            </div>
          )}

          {/* Responsibilities */}
          {opportunity.responsibilities && opportunity.responsibilities.length > 0 && (
            <div>
              <h2 className='text-xl font-semibold text-gray-900 mb-2'>Key Responsibilities</h2>
              <ul className='space-y-2 list-disc list-inside'>
                {opportunity.responsibilities.map((responsibility, index) => (
                  <li key={index} className='text-gray-700'>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {opportunity.requirements && opportunity.requirements.length > 0 && (
            <div>
              <h2 className='text-xl font-semibold text-gray-900 mb-2'>Requirements</h2>
              <ul className='space-y-2'>
                {opportunity.requirements.map((requirement, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-green-500'>✓</span>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {opportunity.benefits && opportunity.benefits.length > 0 && (
            <div>
              <h2 className='text-xl font-semibold text-gray-900 mb-2'>Benefits</h2>
              <ul className='space-y-2'>
                {opportunity.benefits.map((benefit, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-purple-500'>★</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Course-specific content */}
      {isCourse && (
        <>
          {/* Course Description - using jobDescription field for now */}
          {opportunity.jobDescription && (
            <div className='bg-white p-6 rounded-lg border shadow-sm'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>Course Description</h2>
              <p className='text-gray-700 leading-relaxed'>{opportunity.jobDescription}</p>
            </div>
          )}

          {/* Curriculum - using responsibilities field */}
          {opportunity.responsibilities && opportunity.responsibilities.length > 0 && (
            <div className='bg-white p-6 rounded-lg border shadow-sm'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>Curriculum</h2>
              <ul className='space-y-2'>
                {opportunity.responsibilities.map((curriculum, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-blue-500 mt-1'>📚</span>
                    <span>{curriculum}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites - using requirements field */}
          {opportunity.requirements && opportunity.requirements.length > 0 && (
            <div className='bg-white p-6 rounded-lg border shadow-sm'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>Prerequisites</h2>
              <ul className='space-y-2'>
                {opportunity.requirements.map((prerequisite, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-orange-500 mt-1'>📋</span>
                    <span>{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Learning Outcomes - using benefits field */}
          {opportunity.benefits && opportunity.benefits.length > 0 && (
            <div className='bg-white p-6 rounded-lg border shadow-sm'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>Learning Outcomes</h2>
              <ul className='space-y-2'>
                {opportunity.benefits.map((outcome, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-green-500 mt-1'>🎯</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};
