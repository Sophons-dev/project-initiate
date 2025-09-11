import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='min-h-screen'>
      <main>
        {/* Hero Section Skeleton */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
          <div className='container mx-auto px-4 py-16'>
            <div className='max-w-4xl mx-auto'>
              <Skeleton className='h-8 w-3/4 mb-4 bg-white/20' />
              <Skeleton className='h-6 w-1/2 mb-6 bg-white/20' />
              <div className='flex flex-wrap gap-2 mb-6'>
                <Skeleton className='h-6 w-20 bg-white/20' />
                <Skeleton className='h-6 w-24 bg-white/20' />
                <Skeleton className='h-6 w-16 bg-white/20' />
              </div>
              <Skeleton className='h-10 w-32 bg-white/20' />
            </div>
          </div>
        </div>

        {/* Content Section Skeleton */}
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-4xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Main Content */}
              <div className='lg:col-span-2 space-y-6'>
                <div>
                  <Skeleton className='h-6 w-32 mb-4' />
                  <Skeleton className='h-4 w-full mb-2' />
                  <Skeleton className='h-4 w-full mb-2' />
                  <Skeleton className='h-4 w-3/4 mb-2' />
                  <Skeleton className='h-4 w-1/2' />
                </div>

                <div>
                  <Skeleton className='h-6 w-40 mb-4' />
                  <Skeleton className='h-4 w-full mb-2' />
                  <Skeleton className='h-4 w-full mb-2' />
                  <Skeleton className='h-4 w-2/3' />
                </div>

                <div>
                  <Skeleton className='h-6 w-36 mb-4' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-4/5' />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className='space-y-6'>
                <div className='bg-white rounded-lg border p-6'>
                  <Skeleton className='h-6 w-24 mb-4' />
                  <Skeleton className='h-4 w-full mb-2' />
                  <Skeleton className='h-4 w-3/4 mb-2' />
                  <Skeleton className='h-4 w-1/2' />
                </div>

                <div className='bg-white rounded-lg border p-6'>
                  <Skeleton className='h-6 w-32 mb-4' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-5/6' />
                    <Skeleton className='h-4 w-4/5' />
                  </div>
                </div>

                <div className='bg-white rounded-lg border p-6'>
                  <Skeleton className='h-6 w-28 mb-4' />
                  <Skeleton className='h-10 w-full' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
