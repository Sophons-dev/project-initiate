import type React from 'react';
import Image from 'next/image';
import { OnboardingProvider } from '@/features/onboarding/contexts/onboarding-context';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='relative grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-gradient-to-br from-orange-100 via-white to-blue-100'>
      {/* Left Side - Branding */}
      <div className='relative hidden lg:flex lg:col-span-5 hero-bg flex-col justify-center p-20 border-r'>
        <div className='absolute top-20 left-20 mb-8'>
          <Image
            src='/project-initiate-logo.png'
            alt='Initiate Logo'
            height={1080}
            width={1920}
            className='w-auto h-6'
          />
        </div>
        <div className='mb-8'>
          <h1 className='text-4xl font-semibold text-gray-900 mb-6 leading-tight'>
            A few clicks away from finding the opportunities that are right for you.
          </h1>
          <p className='text-lg text-gray-600'>Help us personalize your experience with a few questions</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className='w-full lg:col-span-7 flex items-center justify-center mx-auto py-8 px-4'>
        <div className='w-full max-w-md'>
          {/* Mobile Logo */}
          <div className='lg:hidden mb-8 text-center'>
            <Image
              src='/project-initiate-logo.png'
              alt='Initiate Logo'
              width={80}
              height={80}
              className='mx-auto'
            />
          </div>

          <OnboardingProvider>{children}</OnboardingProvider>
        </div>
      </div>
    </main>
  );
}
