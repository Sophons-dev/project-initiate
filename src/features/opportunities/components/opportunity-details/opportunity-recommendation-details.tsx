'use client';

interface RecommendationDetails {
  score?: number | null;
  rank?: number | null;
  reasoning?: string | null;
  tagsMatched: string[];
}

interface OpportunityRecommendationDetailsProps {
  recommendationDetails: RecommendationDetails;
}

export const OpportunityRecommendationDetails = ({ recommendationDetails }: OpportunityRecommendationDetailsProps) => {
  return (
    <div className='bg-white p-6 rounded-lg border shadow-sm'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>Recommendation Details</h3>
      <div className='space-y-4'>
        {recommendationDetails.reasoning && (
          <div>
            <h4 className='font-medium text-gray-900 mb-2'>Why this matches you:</h4>
            <p className='text-sm text-gray-700 leading-relaxed'>{recommendationDetails.reasoning}</p>
          </div>
        )}
        <div className='grid grid-cols-2 gap-4'>
          {recommendationDetails.score && (
            <div className='text-center p-3 bg-blue-50 rounded-lg'>
              <p className='text-2xl font-bold text-blue-600'>{recommendationDetails.score.toFixed(1)}</p>
              <p className='text-xs text-gray-600'>Match Score</p>
            </div>
          )}
          {recommendationDetails.rank && (
            <div className='text-center p-3 bg-green-50 rounded-lg'>
              <p className='text-2xl font-bold text-green-600'>#{recommendationDetails.rank}</p>
              <p className='text-xs text-gray-600'>Rank</p>
            </div>
          )}
        </div>
        {recommendationDetails.tagsMatched && recommendationDetails.tagsMatched.length > 0 && (
          <div>
            <h4 className='font-medium text-gray-900 mb-2'>Matched Skills:</h4>
            <div className='flex flex-wrap gap-1'>
              {recommendationDetails.tagsMatched.map((tag, index) => (
                <span key={index} className='px-2 py-1 bg-green-100 text-green-800 rounded text-xs'>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
