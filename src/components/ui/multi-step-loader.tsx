'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={cn('w-6 h-6', className)}
  >
    <path d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
  </svg>
);

const CheckFilled = ({ className }: { className?: string }) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={cn('w-6 h-6', className)}>
    <path
      fillRule='evenodd'
      d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
      clipRule='evenodd'
    />
  </svg>
);

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-4 h-4 animate-spin', className)}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </svg>
);

type LoadingState = { text: string };

const LoaderCore = ({ loadingStates, value = 0 }: { loadingStates: LoadingState[]; value?: number }) => (
  <div className='flex relative justify-start max-w-xl mx-auto flex-col mt-40'>
    {loadingStates.map((loadingState, index) => {
      const isActive = index === value;
      const isCompleted = index < value;

      return (
        <motion.div
          key={index}
          className='text-left flex gap-2 mb-4'
          initial={{ opacity: 0, y: -value * 40 }}
          animate={{ opacity: index <= value ? 1 : 0.4, y: -value * 40 }}
          transition={{ duration: 0.4 }}
        >
          <div className='relative flex items-center justify-center w-6 h-6'>
            {isCompleted ? (
              <CheckFilled className='text-lime-500' />
            ) : isActive ? (
              <>
                <CheckFilled className='text-lime-500' />
                <div className='absolute top-0 right-0 w-3 h-3 flex items-center justify-center'>
                  <Spinner className='text-lime-500' />
                </div>
              </>
            ) : (
              <CheckIcon className='text-gray-400' />
            )}
          </div>
          <span className={cn(isActive && 'text-lime-500 font-semibold')}>{loadingState.text}</span>
        </motion.div>
      );
    })}
  </div>
);

export const MultiStepLoader = ({
  loadingStates,
  loading,
  value,
}: {
  loadingStates: LoadingState[];
  loading: boolean;
  value: number;
}) => (
  <AnimatePresence mode='wait'>
    {loading && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl'
      >
        <div className='h-96 relative'>
          <LoaderCore value={value} loadingStates={loadingStates} />
        </div>
        <div className='bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]' />
      </motion.div>
    )}
  </AnimatePresence>
);
