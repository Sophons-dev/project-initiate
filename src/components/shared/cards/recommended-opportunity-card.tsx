import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bookmark, Building2, Calendar, MapPin, Sparkles } from 'lucide-react';

// TODO: Move this type to separate file
export interface Opportunity {
  id: number;
  type: 'JOB' | 'COURSE' | 'EVENT';
  typeColor: string;
  date: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  matchReason: string;
  dueDate: string;
}

export const RecommendedOpportunityCard = ({
  opportunity,
}: {
  opportunity: Opportunity;
}) => {
  return (
    <>
      <motion.div
        key={opportunity.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className='cursor-pointer'
      >
        <Card className='h-full rounded border hover:shadow transition-all duration-300'>
          <CardContent className=''>
            {/* Header */}
            <div className='flex items-center justify-between mb-4'>
              <span
                className={`px-3 py-1 rounded text-xs font-medium ${opportunity.typeColor}`}
              >
                {opportunity.type}
              </span>
              <span className='text-sm text-gray-500'>{opportunity.date}</span>
            </div>

            {/* Title */}
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              {opportunity.title}
            </h3>

            {/* Organization & Location */}
            <div className='space-y-2 mb-4'>
              <div className='flex items-center text-sm text-gray-600'>
                <Building2 className='w-4 h-4 mr-2' />
                {opportunity.organization}
              </div>
              <div className='flex items-center text-sm text-gray-600'>
                <MapPin className='w-4 h-4 mr-2' />
                {opportunity.location}
              </div>
            </div>

            {/* Description */}
            <p className='text-sm text-gray-600 mb-4 line-clamp-3'>
              {opportunity.description}
            </p>

            {/* Match Reason */}
            <div className='bg-yellow-50 border-l-3 rounded-l-none border-l-yellow-500 rounded-lg p-3 mb-4'>
              <div className='flex items-start'>
                <Sparkles className='w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0' />
                <div>
                  <p className='text-xs font-medium text-yellow-800 mb-1'>
                    Why this matches you:
                  </p>
                  <p className='text-xs text-yellow-700 leading-relaxed'>
                    {opportunity.matchReason}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center text-xs text-gray-500'>
                <Calendar className='w-3 h-3 mr-1' />
                {opportunity.dueDate}
              </div>
              <div className='flex items-center space-x-2'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='p-1 hover:bg-gray-100 rounded'
                >
                  <Bookmark className='w-4 h-4 text-gray-400' />
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size='sm'
                    className='bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-4 py-1 rounded'
                  >
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
