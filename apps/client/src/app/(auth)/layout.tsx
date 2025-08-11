import { Footer } from '@/components/shared/footer';
import { CustomQueryClientProvider } from '@/providers/query-client-provider';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomQueryClientProvider>
      <div className='min-h-screen bg-gray-50 flex flex-col'>
        {/* Header */}
        <div className='lg:p-10 p-4'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-neutral-700 font-semibold transition-colors text-sm md:text-base'>
            <ArrowLeft className='w-4 h-4' />
            Back to Home
          </Link>
        </div>

        {/* Main Content */}
        <div className='flex-1 flex items-center justify-center px-4 mt-16'>
          <div className='w-full max-w-md'>
            {/* Logo */}
            <div className='text-center mb-8'>
              <Image
                src='/project-initiate-logo.png'
                alt='Initiate Logo'
                width={120}
                height={120}
                className='mx-auto mb-6'
              />
            </div>

            {children}
          </div>
        </div>
      </div>

      <Footer />
    </CustomQueryClientProvider>
  );
}
