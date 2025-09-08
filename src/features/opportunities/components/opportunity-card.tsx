import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bookmark, Building2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { OpportunityDto, OpportunityRecommendationDto } from '../dto';
import { opportunityTypeColors } from '@/lib/constants';

// const isOpportunityRecommendation = (
//   opp: OpportunityDto | OpportunityRecommendationDto
// ): opp is OpportunityRecommendationDto => {
//   return 'reasoning' in opp;
// };
// export const OpportunitySchema = z.object({
//   type: z.string(),
//   subtype: z.string().optional().nullable(),
//   tags: z.array(z.string()).optional().nullable(),
//   date: z.string(),
//   title: z.string(),
//   organization: z.object({
//     name: z.string(),
//     url: z.string().optional(),
//   }),
//   organizationId: z.string().optional().nullable(),
//   startDate: z.string().optional().nullable(),
//   endDate: z.string().optional().nullable(),
//   metadata: z
//     .object({
//       salary: z.object({
//         min: z.number(),
//         max: z.number(),
//         currency: z.string(),
//       }),
//       experienceLevel: z.string(),
//       requiredSkills: z.array(z.string()),
//       benefits: z.array(z.string()),
//     })
//     .optional()
//     .nullable(),
//   location: z.string(),
//   description: z.string(),
//   matchReason: z.string(),
//   dueDate: z.string(),
//   deadline: z.string().optional().nullable(),
// });

// export type Opportunity = z.infer<typeof OpportunitySchema>;

export const OpportunityCard = ({ recommendation }: { recommendation: any }) => {
  const router = useRouter();

  return (
    <>
      <motion.div
        key={recommendation.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className='cursor-pointer'
        onClick={() => router.push(`/opportunities/${recommendation.opportunity.id}`)}
      >
        <Card className='h-full rounded border hover:shadow transition-all duration-300'>
          <CardContent className=''>
            {/* Header */}
            <div className='flex items-center justify-between mb-4'>
              <span
                className={`px-3 py-1 rounded text-xs font-medium ${opportunityTypeColors[recommendation.opportunity.type as keyof typeof opportunityTypeColors]}`}
              >
                {recommendation.opportunity.type}
              </span>
              <span className='text-sm text-gray-500'>
                {recommendation.opportunity.createdAt?.toLocaleDateString()}
              </span>
            </div>

            {/* Title */}
            <h2 className='text-lg font-semibold text-gray-900 mb-3'>{recommendation.opportunity.title}</h2>

            {/* Organization & Location */}
            <div className='space-y-2 mb-4'>
              <div className='flex items-center text-sm text-gray-600'>
                <Building2 className='w-4 h-4 mr-2' />
                {recommendation.opportunity.organization?.name}
              </div>
              <div className='flex items-center text-sm text-gray-600'>
                <MapPin className='w-4 h-4 mr-2' />
                {recommendation.opportunity.location}
              </div>
            </div>

            {/* Description */}
            <p className='text-sm text-gray-600 mb-4 line-clamp-3'>{recommendation.opportunity.description}</p>

            {/* Match Reason */}
            {recommendation.reasoning && (
              <div className='bg-yellow-50 border-l-3 rounded-l-none border-l-yellow-500 rounded-lg p-3 mb-4'>
                <div className='flex items-start'>
                  <Sparkles className='w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0' />
                  <div>
                    <p className='text-xs font-medium text-yellow-800 mb-1'>Why this matches you:</p>
                    <p className='text-xs text-yellow-700 leading-relaxed'>{recommendation.reasoning}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center text-xs text-gray-500'>
                <Calendar className='w-3 h-3 mr-1' />
                {recommendation.opportunity.deadline?.toLocaleDateString()}
              </div>
              <div className='flex items-center space-x-2'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='p-1 hover:bg-gray-100 rounded'
                >
                  <Bookmark className='w-4 h-4 text-gray-400' />
                </motion.button>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size='sm' className='bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-4 py-1 rounded'>
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};
