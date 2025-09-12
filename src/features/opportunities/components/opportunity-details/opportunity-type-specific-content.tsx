'use client';

import { OpportunityDto } from '../../dto';

interface OpportunityTypeSpecificContentProps {
  opportunity: OpportunityDto;
}

export const OpportunityTypeSpecificContent = ({ opportunity }: OpportunityTypeSpecificContentProps) => {
  const isJob = opportunity.type === 'job';
  const isCourse = opportunity.type === 'course';
  const isEvent = opportunity.type === 'event';

  return (
    <>
      {/* Job-specific content */}
      {isJob && (
        <>
          {/* Job Description */}
          {opportunity.longDescription && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>Job Description</h2>
              <p className='text-gray-700 leading-relaxed'>{opportunity.longDescription}</p>
            </div>
          )}

          {/* Key Highlights */}
          {opportunity.highlights && opportunity.highlights.length > 0 && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>Key Highlights</h2>
              <ul className='space-y-2'>
                {opportunity.highlights.map((highlight, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-blue-500'>★</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites */}
          {opportunity.prerequisites && opportunity.prerequisites.length > 0 && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>Requirements</h2>
              <ul className='space-y-2'>
                {opportunity.prerequisites.map((prerequisite, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-green-500'>✓</span>
                    <span>{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expected Outcomes */}
          {opportunity.outcomes && opportunity.outcomes.length > 0 && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>What You&apos;ll Gain</h2>
              <ul className='space-y-2'>
                {opportunity.outcomes.map((outcome, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-purple-500'>🎯</span>
                    <span>{outcome}</span>
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
          {/* Course Description */}
          {opportunity.longDescription && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>Course Description</h2>
              <p className='text-gray-700 leading-relaxed'>{opportunity.longDescription}</p>
            </div>
          )}

          {/* Curriculum */}
          {opportunity.highlights && opportunity.highlights.length > 0 && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>What You&apos;ll Learn</h2>
              <ul className='space-y-2'>
                {opportunity.highlights.map((highlight, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-blue-500 '>📚</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites */}
          {opportunity.prerequisites && opportunity.prerequisites.length > 0 && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>Prerequisites</h2>
              <ul className='space-y-2'>
                {opportunity.prerequisites.map((prerequisite, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-orange-500 '>📋</span>
                    <span>{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Learning Outcomes */}
          {opportunity.outcomes && opportunity.outcomes.length > 0 && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>Learning Outcomes</h2>
              <ul className='space-y-2'>
                {opportunity.outcomes.map((outcome, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-green-500 '>🎯</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Event-specific content */}
      {isEvent && (
        <>
          {/* Event Description */}
          {opportunity.longDescription && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>Event Description</h2>
              <p className='text-gray-700 leading-relaxed'>{opportunity.longDescription}</p>
            </div>
          )}

          {/* Event Highlights */}
          {opportunity.highlights && opportunity.highlights.length > 0 && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>Event Highlights</h2>
              <ul className='space-y-2'>
                {opportunity.highlights.map((highlight, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-green-500 '>⭐</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites */}
          {opportunity.prerequisites && opportunity.prerequisites.length > 0 && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>Requirements</h2>
              <ul className='space-y-2'>
                {opportunity.prerequisites.map((prerequisite, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-orange-500 '>📋</span>
                    <span>{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expected Outcomes */}
          {opportunity.outcomes && opportunity.outcomes.length > 0 && (
            <div>
              <h2 className=' font-semibold text-gray-900 mb-2'>What You&apos;ll Gain</h2>
              <ul className='space-y-2'>
                {opportunity.outcomes.map((outcome, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-purple-500 '>🎯</span>
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
