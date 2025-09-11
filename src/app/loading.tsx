import Image from 'next/image';

export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='text-center space-y-8'>
        {/* Logo */}
        <div className='relative'>
          <Image
            src='/project-initiate-logo.png'
            alt='Project Initiate'
            width={120}
            height={120}
            className='mx-auto animate-pulse'
            priority
          />
        </div>

        {/* Main Spinner */}
        <div className='flex justify-center'>
          <div className='relative'>
            {/* Outer ring */}
            <div className='w-16 h-16 border-4 border-cyan-200 rounded-full animate-spin border-t-cyan-500'></div>
            {/* Inner ring */}
            <div
              className='absolute top-2 left-2 w-12 h-12 border-4 border-transparent rounded-full animate-spin border-t-cyan-300'
              style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
            ></div>
            {/* Center dot */}
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full animate-pulse'></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className='space-y-2'>
          <h2 className='text-2xl font-semibold text-gray-700'>Loading...</h2>
          <p className='text-gray-500'>Please wait while we prepare your experience</p>
        </div>

        {/* Animated Dots */}
        <div className='flex justify-center space-x-2'>
          <div className='w-2 h-2 bg-cyan-500 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
          <div className='w-2 h-2 bg-cyan-500 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
          <div className='w-2 h-2 bg-cyan-500 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
