import { Badge } from '@/components/ui/badge';
import { OpportunitiesList } from '@/features/opportunities/components';
import { Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetOpportunitiesByOrganizationId } from '@/features/opportunities/hooks';
import { OrganizationDto } from '../dto/organization.dto';

interface OrganizationDetailsProps {
  organization: OrganizationDto;
}

export const OrganizationDetails = ({ organization }: OrganizationDetailsProps) => {
  const {
    data: opportunities,
    isLoading: opportunitiesLoading,
    error: opportunitiesError,
  } = useGetOpportunitiesByOrganizationId(organization.id);

  if (opportunitiesLoading) {
    return <div>Loading opportunities...</div>;
  }

  if (opportunitiesError) {
    return <div>Error loading opportunities: {opportunitiesError.message}</div>;
  }

  return (
    <div className='flex-1'>
      <div className='sticky top-20'>
        <div className='bg-white rounded-xl border border-gray-200/50 h-[calc(100vh-4rem)] flex flex-col overflow-hidden'>
          <div className='flex-1 p-6 overflow-y-auto'>
            <div className='max-w-4xl'>
              <ProfileHeader organization={organization} />
              <div className='mt-8 space-y-8'>
                <AboutSection organization={organization} />
                <ContactsSection organization={organization} />
                <div className='flex justify-between items-center'>
                  <h2 className='text-lg font-medium text-gray-900'>Opportunities Offered</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className='text-cyan-500 hover:text-cyan-600 font-medium cursor-pointer'
                  >
                    View All →
                  </motion.button>
                </div>
                <OpportunitiesList opportunities={opportunities ?? []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ProfileHeader({ organization }: { organization: OrganizationDto }) {
  return (
    <div className='flex items-center gap-4'>
      {/* Logo */}
      <div className='w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm'>
        <div className='w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center'>
          <div className='w-6 h-6 bg-red-600 rounded-full flex items-center justify-center'>
            <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className='flex-1'>
        <div className='flex items-center gap-3 mb-1'>
          <h1 className='text-2xl font-semibold text-gray-900'>{organization.name}</h1>
          <Badge variant='secondary' className='bg-pink-100 text-pink-700 hover:bg-pink-100'>
            PARTNER
          </Badge>
        </div>
        <p className='text-gray-500'>{organization.location}</p>
      </div>
    </div>
  );
}

function AboutSection({ organization }: { organization: OrganizationDto }) {
  return (
    <div>
      <h2 className='text-lg font-medium text-gray-900 mb-4'>About</h2>
      <p className='text-gray-600 leading-relaxed text-sm'>{organization.description}</p>
    </div>
  );
}

export function ContactsSection({ organization }: { organization: OrganizationDto }) {
  return (
    <div>
      <h2 className='text-lg font-medium text-gray-900 mb-4'>Contacts</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Phone */}
        <div className='flex items-center gap-3 p-4 bg-orange-50 rounded-lg'>
          <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
            <Phone className='w-5 h-5 text-orange-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500 uppercase tracking-wide'>PHONE</p>
            <p className='font-medium text-gray-900'>+639123456789</p>
          </div>
        </div>

        {/* Email */}
        <div className='flex items-center gap-3 p-4 bg-blue-50 rounded-lg'>
          <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
            <Mail className='w-5 h-5 text-blue-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500 uppercase tracking-wide'>EMAIL</p>
            <p className='font-medium text-gray-900'>university@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
