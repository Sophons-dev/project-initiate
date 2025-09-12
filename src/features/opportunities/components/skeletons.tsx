import { Skeleton } from '@/components/ui/skeleton';

export const OpportunitiesListSkeleton = () => (
  <div className='grid [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))] gap-4 p-3.5 bg-slate-50 rounded'>
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={`skeleton-${index}`} className='bg-white rounded-lg border p-4'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex gap-2'>
            <Skeleton className='h-6 w-16' />
            <Skeleton className='h-6 w-20' />
          </div>
          <Skeleton className='h-4 w-20' />
        </div>
        <Skeleton className='h-6 w-3/4 mb-3' />
        <div className='space-y-2 mb-4'>
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-4 w-2/3' />
        </div>
        <Skeleton className='h-4 w-full mb-2' />
        <Skeleton className='h-4 w-3/4 mb-4' />
        <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-8 w-20' />
        </div>
      </div>
    ))}
  </div>
);

export const OpportunityDetailsSkeleton = () => {
  return (
    <div className='max-w-7xl mx-auto py-10 px-2 lg:px-0'>
      <div>
        {/* Main Content Sections */}
        <div className='flex flex-col lg:flex-row gap-5'>
          {/* Main Content */}
          <div className='flex flex-col gap-8 flex-2'>
            {/* Header Skeleton */}
            <div className='bg-white p-6 rounded-lg border '>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-6 w-16' />
                  <Skeleton className='h-6 w-20' />
                </div>
                <Skeleton className='h-8 w-3/4' />
                <div className='flex items-center gap-4'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-2/3' />
              </div>
            </div>

            {/* Type-specific content skeleton */}
            <div className='bg-white p-6 rounded-lg border '>
              <Skeleton className='h-6 w-32 mb-4' />
              <div className='space-y-3'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/5' />
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg border '>
              <Skeleton className='h-6 w-40 mb-4' />
              <div className='space-y-2'>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-3/4' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className='flex flex-1 flex-col gap-3 lg:gap-6'>
            {/* Recommendation details skeleton */}
            <div className='bg-white p-6 rounded-lg border '>
              <Skeleton className='h-6 w-40 mb-4' />
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-12' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-8' />
                </div>
                <Skeleton className='h-16 w-full' />
              </div>
            </div>

            {/* Type-specific sidebar skeleton */}
            <div className='bg-white p-6 rounded-lg border '>
              <Skeleton className='h-6 w-32 mb-4' />
              <div className='space-y-3'>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className='flex justify-between'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-20' />
                  </div>
                ))}
              </div>
            </div>

            {/* Company info skeleton */}
            <div className='bg-white p-6 rounded-lg border '>
              <Skeleton className='h-6 w-36 mb-4' />
              <div className='space-y-3'>
                <Skeleton className='h-4 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
                <Skeleton className='h-4 w-2/3' />
              </div>
            </div>

            {/* Compensation info skeleton */}
            <div className='bg-white p-6 rounded-lg border '>
              <Skeleton className='h-6 w-40 mb-4' />
              <div className='text-center'>
                <Skeleton className='h-8 w-48 mx-auto mb-2' />
                <Skeleton className='h-4 w-32 mx-auto' />
              </div>
            </div>

            {/* Required skills skeleton */}
            <div className='bg-white p-6 rounded-lg border '>
              <Skeleton className='h-6 w-36 mb-4' />
              <div className='flex flex-wrap gap-2'>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className='h-6 w-20' />
                ))}
              </div>
            </div>

            {/* Actions skeleton */}
            <div className='bg-white p-6 rounded-lg border '>
              <div className='space-y-3'>
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
              </div>
            </div>
          </div>
        </div>

        <hr className='my-10' />

        {/* Related opportunities skeleton */}
        <div className='bg-white p-6 rounded-lg border '>
          <Skeleton className='h-6 w-48 mb-6' />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='border rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-3'>
                  <Skeleton className='h-5 w-16' />
                  <Skeleton className='h-5 w-20' />
                </div>
                <Skeleton className='h-6 w-3/4 mb-2' />
                <Skeleton className='h-4 w-full mb-1' />
                <Skeleton className='h-4 w-2/3 mb-3' />
                <div className='flex justify-between items-center'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-8 w-20' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
