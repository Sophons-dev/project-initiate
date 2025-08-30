import { Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface OrganizationCardProp extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  location: string;
  description: string;
  tags: string[];
  hasBookmark?: boolean;
  selected?: boolean;
}

export function OrganizationCard({
  title,
  location,
  description,
  tags,
  hasBookmark,
  selected,
  ...props
}: OrganizationCardProp) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className='cursor-pointer'
      onClick={props.onClick}
    >
      <Card
        className={`h-full rounded hover:shadow transition-all duration-300 ${selected && 'border-l-yellow-500  border-1'}`}
      >
        <CardContent className=''>
          {/* Header */}
          <div className='flex items-start justify-between mb-3'>
            <div className='flex items-start gap-3'>
              <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                <div className='w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center'>
                  <div className='w-2 h-2 bg-red-600 rounded-full'></div>
                </div>
              </div>
              <div className='min-w-0 flex-1'>
                <h3 className='font-medium text-gray-900 leading-tight mb-1 truncate'>
                  {title}
                </h3>
                <p className='text-xs text-gray-500'>{location}</p>
              </div>
            </div>
            {hasBookmark && (
              <button className='text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0'>
                <Bookmark className='w-4 h-4' />
              </button>
            )}
          </div>

          {/* Description */}
          <p className='text-sm text-gray-600 mb-3 leading-relaxed line-clamp-4'>
            {description}
          </p>

          {/* Tags */}
          <div className='flex gap-1.5'>
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs transition-colors ${tag === 'SCHOOL' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-pink-50 text-pink-600 border border-pink-100'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
