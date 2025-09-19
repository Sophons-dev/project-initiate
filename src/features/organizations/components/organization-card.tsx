import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { OrganizationDto } from '../dto/organization.dto';

interface OrganizationCardProp extends React.HTMLAttributes<HTMLDivElement> {
  organization: OrganizationDto;
  selected?: boolean;
}

export function OrganizationCard({ organization, selected, ...props }: OrganizationCardProp) {
  // Safety check to prevent runtime errors
  if (!organization) {
    return null;
  }

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
              <div className='min-w-0 flex-1'>
                <h3 className='font-medium text-gray-900 leading-tight mb-1 line-clamp-1'>{organization.name}</h3>
                <p className='text-xs text-gray-500'>{organization.location}</p>
              </div>
            </div>
            {/* {hasBookmark && (
              <button className='text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0'>
                <Bookmark className='w-4 h-4' />
              </button>
            )} */}
          </div>

          {/* Description */}
          <p className='text-sm text-gray-600 mb-3 leading-relaxed line-clamp-4'>{organization.aboutTheCompany}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
