'use client';

import Greeter from '@/components/layout/greeter';
import { useCurrentUser } from '@/features/user/hooks';
import { Blend, CircleCheck, TrendingUp, UserCircle } from 'lucide-react';
import { CareerInsightsSkeleton } from './skeletons';

export const DashboardHero = () => {
  const { data, isLoading } = useCurrentUser();

  const user = data?.data;

  return (
    <Greeter
      action={{ title: 'Explore All', redirect: '/opportunities' }}
      message='Here are your AI-powered personalized recommendations.'
    >
      {/* AI Career Insights */}
      {isLoading ? (
        <CareerInsightsSkeleton />
      ) : (
        <div className='p-4 mt-5 bg-white rounded shadow-lg'>
          <div className='flex items-center mb-4'>
            <h2 className='text-lg font-semibold text-gray-900'>Career Insights</h2>
          </div>
          <p className='text-gray-600 leading-relaxed'>
            {user?.careerInsight?.summary || 'No career insights available yet.'}
          </p>
        </div>
      )}
    </Greeter>
  );
};
