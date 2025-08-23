import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bookmark, Building2, Calendar, MapPin, Sparkles } from 'lucide-react';

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

export const opportunityData: Opportunity[] = [
  {
    id: 1,
    type: 'COURSE',
    typeColor: 'bg-yellow-100 text-yellow-800',
    date: 'Starts Mar 5, 2025',
    title: 'Advanced React Development',
    organization: 'React Masters',
    location: 'Online',
    description:
      'Master React hooks, context API, and advanced state management patterns. Build complex applications with performance optimization techniques.',
    matchReason:
      'Matches your interest in frontend development and your experience with JavaScript frameworks.',
    dueDate: 'Enroll by Feb 28, 2025',
  },
  {
    id: 2,
    type: 'JOB',
    typeColor: 'bg-blue-100 text-blue-800',
    date: 'Posted Feb 1, 2025',
    title: 'Senior Frontend Developer',
    organization: 'TechNova Solutions',
    location: 'San Francisco, CA (Remote)',
    description:
      'Lead frontend development for our SaaS platform. Work with React, TypeScript, and modern web technologies in a fast-paced startup environment.',
    matchReason:
      '95% match with your skills in React, TypeScript, and UI/UX design experience.',
    dueDate: 'Apply by Feb 28, 2025',
  },
  {
    id: 3,
    type: 'EVENT',
    typeColor: 'bg-red-100 text-red-800',
    date: 'Apr 15-17, 2025',
    title: 'Web3 & Blockchain Summit',
    organization: 'Crypto Innovators',
    location: 'Austin, TX',
    description:
      'Annual gathering of blockchain developers, entrepreneurs, and industry leaders. Featuring workshops, keynotes, and networking opportunities.',
    matchReason:
      'Based on your interest in decentralized technologies and previous blockchain projects.',
    dueDate: 'Early bird ends Mar 1, 2025',
  },
  {
    id: 4,
    type: 'COURSE',
    typeColor: 'bg-yellow-100 text-yellow-800',
    date: 'Self-paced',
    title: 'Cloud Architecture with AWS',
    organization: 'Cloud Academy',
    location: 'Online',
    description:
      'Learn to design and deploy scalable, highly available, and fault-tolerant systems on AWS. Covers EC2, S3, RDS, Lambda, and more.',
    matchReason:
      'Complements your experience with cloud technologies and system design skills.',
    dueDate: 'Access for 1 year',
  },
  {
    id: 5,
    type: 'JOB',
    typeColor: 'bg-blue-100 text-blue-800',
    date: 'Posted Jan 28, 2025',
    title: 'UX/UI Designer',
    organization: 'DesignHub',
    location: 'New York, NY (Hybrid)',
    description:
      'Create beautiful, intuitive interfaces for our enterprise clients. Work closely with product managers and developers to deliver exceptional user experiences.',
    matchReason:
      'Matches your design portfolio and experience with Figma and user research.',
    dueDate: 'Apply by Mar 15, 2025',
  },
  {
    id: 6,
    type: 'EVENT',
    typeColor: 'bg-red-100 text-red-800',
    date: 'May 5-7, 2025',
    title: 'AI & Machine Learning Conference',
    organization: 'AI Collective',
    location: 'Boston, MA',
    description:
      'Explore the latest advancements in AI and machine learning. Hands-on workshops, research presentations, and networking with industry leaders.',
    matchReason:
      'Based on your interest in AI applications and previous data science projects.',
    dueDate: 'Early bird ends Apr 1, 2025',
  },
  {
    id: 7,
    type: 'COURSE',
    typeColor: 'bg-yellow-100 text-yellow-800',
    date: 'Starts Apr 10, 2025',
    title: 'DevOps Engineering Bootcamp',
    organization: 'CodeCraft Academy',
    location: 'Online',
    description:
      'Intensive 12-week program covering Docker, Kubernetes, CI/CD pipelines, and infrastructure as code with Terraform.',
    matchReason:
      'Aligns with your goal to expand your DevOps skills and work with cloud infrastructure.',
    dueDate: 'Apply by Mar 31, 2025',
  },
  {
    id: 8,
    type: 'JOB',
    typeColor: 'bg-blue-100 text-blue-800',
    date: 'Posted Feb 5, 2025',
    title: 'Full Stack Developer',
    organization: 'Digital Innovations',
    location: 'Remote (Global)',
    description:
      'Work on cutting-edge web applications using React, Node.js, and modern cloud technologies. Full-time remote position with flexible hours.',
    matchReason:
      '92% match with your full-stack development experience and remote work preference.',
    dueDate: 'Apply by Mar 15, 2025',
  },
  {
    id: 9,
    type: 'EVENT',
    typeColor: 'bg-red-100 text-red-800',
    date: 'Jun 20-22, 2025',
    title: 'Tech Leadership Summit',
    organization: 'LeadDev',
    location: 'Chicago, IL',
    description:
      'For engineering leaders looking to grow their leadership skills. Topics include team management, technical strategy, and career growth.',
    matchReason:
      'Based on your recent promotion to team lead and interest in leadership development.',
    dueDate: 'Early bird ends May 1, 2025',
  },
  {
    id: 10,
    type: 'COURSE',
    typeColor: 'bg-yellow-100 text-yellow-800',
    date: 'Self-paced',
    title: 'Advanced TypeScript Patterns',
    organization: 'TypeScript Masters',
    location: 'Online',
    description:
      'Master advanced TypeScript features including decorators, generics, type inference, and functional programming patterns.',
    matchReason:
      'Complements your TypeScript skills and will help with your current project at work.',
    dueDate: 'Lifetime access',
  },
  {
    id: 11,
    type: 'JOB',
    typeColor: 'bg-blue-100 text-blue-800',
    date: 'Posted Jan 30, 2025',
    title: 'Mobile Developer (React Native)',
    organization: 'AppVenture',
    location: 'Seattle, WA',
    description:
      'Build cross-platform mobile applications using React Native. Work with a talented team on consumer-facing apps with millions of users.',
    matchReason:
      'Matches your React experience and interest in mobile development.',
    dueDate: 'Apply by Mar 1, 2025',
  },
  {
    id: 12,
    type: 'EVENT',
    typeColor: 'bg-red-100 text-red-800',
    date: 'Jul 10-12, 2025',
    title: 'International JavaScript Conference',
    organization: 'JS Foundation',
    location: 'Berlin, Germany',
    description:
      'The largest JavaScript conference in Europe. Featuring talks from industry experts, workshops, and networking opportunities.',
    matchReason:
      'Perfect opportunity to stay updated with the latest in JavaScript and network with other developers.',
    dueDate: 'Early bird ends May 15, 2025',
  },
];
