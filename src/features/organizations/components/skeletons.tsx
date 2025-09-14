'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function OrganizationCardSkeleton() {
  return (
    <div className='rounded border bg-white'>
      <div className='p-4'>
        <div className='flex items-start gap-3 mb-3'>
          <Skeleton className='w-8 h-8 rounded-full' />
          <div className='min-w-0 flex-1'>
            <Skeleton className='h-4 w-2/3 mb-2' />
            <Skeleton className='h-3 w-1/3' />
          </div>
        </div>
        <Skeleton className='h-3 w-full mb-2' />
        <Skeleton className='h-3 w-5/6 mb-2' />
        <Skeleton className='h-3 w-4/6' />
      </div>
    </div>
  );
}

export function OrganizationsListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className='space-y-3'>
      {Array.from({ length: count }).map((_, idx) => (
        <OrganizationCardSkeleton key={idx} />
      ))}
    </div>
  );
}

export function OrganizationDetailsSkeleton() {
  return (
    <div className='flex-1'>
      <div className='sticky top-20'>
        <div className='bg-white rounded-xl border border-gray-200/50 h-[calc(100vh-4rem)] flex flex-col overflow-hidden'>
          <div className='flex-1 p-6 overflow-y-auto'>
            <div className='max-w-4xl'>
              <div className='flex items-center gap-4 mb-8'>
                <Skeleton className='w-16 h-16 rounded-xl' />
                <div className='flex-1'>
                  <Skeleton className='h-6 w-1/2 mb-2' />
                  <Skeleton className='h-4 w-1/4' />
                </div>
              </div>
              <div className='space-y-6'>
                <div>
                  <Skeleton className='h-5 w-24 mb-4' />
                  <Skeleton className='h-3 w-full mb-2' />
                  <Skeleton className='h-3 w-5/6 mb-2' />
                  <Skeleton className='h-3 w-4/6' />
                </div>
                <div>
                  <Skeleton className='h-5 w-24 mb-4' />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Skeleton className='h-20 w-full rounded-lg' />
                    <Skeleton className='h-20 w-full rounded-lg' />
                  </div>
                </div>
                <div>
                  <div className='flex justify-between items-center mb-4'>
                    <Skeleton className='h-5 w-36' />
                    <Skeleton className='h-5 w-20' />
                  </div>
                  <div className='space-y-3'>
                    <Skeleton className='h-24 w-full rounded-md' />
                    <Skeleton className='h-24 w-full rounded-md' />
                    <Skeleton className='h-24 w-full rounded-md' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
