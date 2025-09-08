'use client';

import Greeter from '@/components/layout/greeter';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Blend, CircleCheck, Sparkles, TrendingUp, UserCircle } from 'lucide-react';

export const DashboardHero = () => {
  return (
    <Greeter
      action={{ title: 'Explore All', redirect: '/opportunities' }}
      message='Here are your AI-powered personalized recommendations.'
    >
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='p-3 bg-[#E9E9E9]/50 border border-white rounded-lg mb-6 mt-8'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className='cursor-pointer'
            >
              <Card className='p-6 border rounded shadow-sm hover:shadow-md transition-shadow'>
                <CardContent className='p-0 flex items-center space-x-4'>
                  <div className={`w-12 h-12 ${stat.bgColor} flex items-center justify-center rounded-md`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <div className={`font-semibold ${stat.color}`}>{stat.value}</div>
                    <div className='text-sm text-gray-600'>{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Career Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='p-3 bg-[#E9E9E9]/50 border border-white rounded-lg mb-6'
      >
        <div className='p-3 bg-white rounded shadow-sm'>
          <div className='flex items-center mb-4'>
            <Sparkles className='w-5 h-5 text-cyan-500 mr-2' />
            <h2 className='text-lg font-semibold text-gray-900'>AI Career Insights</h2>
          </div>
          <p className='text-gray-600 leading-relaxed'>
            Based on your profile, you appear to be a well-rounded individual with strong interests in arts & design and
            excellent analytical thinking abilities. Your goal to explore career options shows you&apos;re proactive
            about your career development. Consider focusing on opportunities that combine your technical interests with
            your interpersonal skills. I recommend starting with skill-building courses in your areas of interest while
            networking with professionals in your target industries.
          </p>
        </div>
      </motion.div>
    </Greeter>
  );
};

const statsData = [
  {
    value: '65%',
    label: 'Profile Completion',
    icon: UserCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    value: '20',
    label: 'Matched Opportunities',
    icon: CircleCheck,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-500',
  },
  {
    value: '10',
    label: 'High Priority',
    icon: TrendingUp,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-500',
  },
  {
    value: '85%',
    label: 'Match Score',
    icon: Blend,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
];
