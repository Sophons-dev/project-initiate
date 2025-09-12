import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';

export const CareerInsightsSkeleton = () => (
  <div className='p-3 bg-[#E9E9E9]/50 border border-white rounded-lg mb-6'>
    <div className='p-3 bg-white rounded shadow-sm'>
      <div className='flex items-center mb-4'>
        <Sparkles className='w-5 h-5 text-cyan-500 mr-2' />
        <h2 className='text-lg font-semibold text-gray-900'>AI Career Insights</h2>
      </div>
      <div className='space-y-3'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-5/6' />
        <Skeleton className='h-4 w-4/5' />
        <Skeleton className='h-4 w-3/4' />
      </div>
    </div>
  </div>
);
