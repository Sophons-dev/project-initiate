import { Skeleton } from '@/components/ui/skeleton';

export const SignInSkeleton = () => {
  return (
    <div className='w-[350px] h-[450px] rounded-2xl border bg-neutral-200 p-6 space-y-6'>
      {/* Title */}
      <Skeleton className='h-6 w-2/3 mx-auto' />

      {/* Input fields */}
      <div className='space-y-3'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-3 w-1/2' />
        <Skeleton className='h-3 w-1/4' />
        <Skeleton className='h-3 w-1/8' />
      </div>

      {/* Button */}
      <Skeleton className='h-10 w-full' />
    </div>
  );
};
