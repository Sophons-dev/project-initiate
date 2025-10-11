import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bookmark, Building2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { OpportunityDto, OpportunityRecommendationDto } from '../dto';
import { opportunityTypeColors } from '@/lib/constants';

type OpportunityCardProps = {
  opportunity: OpportunityDto | OpportunityRecommendationDto;
  showReasoning?: boolean;
};

// Type guard to check if the object is an OpportunityRecommendationDto
const isOpportunityRecommendation = (
  item: OpportunityDto | OpportunityRecommendationDto
): item is OpportunityRecommendationDto => {
  return 'opportunity' in item && item.opportunity !== undefined;
};

export const OpportunityCard = ({ opportunity, showReasoning = true }: OpportunityCardProps) => {
  const router = useRouter();

  // Normalize the data structure
  const opportunityData = isOpportunityRecommendation(opportunity) ? opportunity.opportunity : opportunity;
  const reasoning = isOpportunityRecommendation(opportunity) ? opportunity.reasoning : null;

  // Early return if no opportunity data
  if (!opportunityData) return null;

  // Get safe values with fallbacks
  const type = opportunityData.type || 'other';
  const locationType = opportunityData.location?.type || 'remote';
  const city = opportunityData.location?.city || undefined;
  const country = opportunityData.location?.country || 'Unknown';
  const organizationName = opportunityData.organization?.name || 'Unknown Organization';
  const title = opportunityData.title || 'Untitled Opportunity';
  const shortDescription = opportunityData.shortDescription || 'No description available';
  const postedDate = opportunityData.postedDate || opportunityData.createdAt?.toLocaleDateString() || 'Unknown date';
  const applicationDeadline = opportunityData.applicationDeadline || 'No deadline specified';

  return (
    <motion.div
      key={opportunityData.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.005 }}
      className='cursor-pointer'
      onClick={() => router.push(`/opportunities/${opportunityData.id}`)}
    >
      <Card className='h-full rounded border hover:shadow transition-all duration-300 flex flex-col'>
        <CardContent className='flex-1 flex flex-col'>
          <div className='flex-1'>
            {/* Header */}
            <div className='flex items-center justify-between mb-4'>
              <div className='flex gap-2'>
                <span
                  className={`px-3 py-1 rounded text-xs font-medium ${opportunityTypeColors[type as keyof typeof opportunityTypeColors] || 'bg-gray-100 text-gray-800'}`}
                >
                  {type}
                </span>
                <span className={`px-3 py-1 rounded text-xs font-medium bg-cyan-100 text-cyan-700`}>
                  {locationType}
                </span>
              </div>
              <span className='text-sm text-gray-500'>{postedDate}</span>
            </div>

            {/* Title */}
            <h2 className='text-base font-semibold text-gray-900 mb-3'>{title}</h2>

            {/* Organization & Location */}
            <div className='space-y-2 mb-4'>
              <div className='flex items-center text-sm text-gray-600 min-w-0'>
                <Building2 className='w-4 h-4 mr-2 flex-shrink-0' />
                <span className='truncate'>{organizationName}</span>
              </div>
              <div className='flex items-center text-sm text-gray-600 min-w-0'>
                <MapPin className='w-4 h-4 mr-2 flex-shrink-0' />
                <span className='truncate'>
                  {city ? `${city},` : ``} {country}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className='text-sm text-gray-600 mb-4 line-clamp-2'>{shortDescription}</p>
            {/* Match Reason - Only show for recommendations and if showReasoning is true */}
            {showReasoning && reasoning && (
              <div className='bg-yellow-50 border-l-3 rounded-l-none border-l-yellow-500 rounded-lg p-3 mb-4'>
                <div className='flex items-start'>
                  <Sparkles className='w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0' />
                  <div>
                    <p className='text-xs font-medium text-yellow-800 mb-1'>Why this matches you:</p>
                    <p className='text-xs text-yellow-700 leading-normal'>{reasoning}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className='mt-auto pt-4 border-t border-gray-100'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center text-xs text-gray-500'>
                <Calendar className='w-3 h-3 mr-1' />
                {applicationDeadline}
              </div>
              <div className='flex items-center'>
                {/* <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='p-1 hover:bg-gray-100 rounded'
                >
                  <Bookmark className='w-4 h-4 text-gray-400' />
                </motion.button> */}

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size='sm' className='bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-4 py-1 rounded'>
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
