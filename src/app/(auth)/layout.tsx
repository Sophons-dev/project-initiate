import { Footer } from '@/components/layout/footer';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      {/* Header */}
      <div className='absolute lg:p-10 p-4'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-neutral-600 font-semibold transition-colors text-sm md:text-sm'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center px-4 min-h-screen'>
        <div className='w-full max-w-md'>
          {/* Logo */}
          <div className='text-center mb-2'>
            <Image
              src='/project-initiate-logo.png'
              alt='Initiate Logo'
              width={500}
              height={500}
              className='mx-auto h-7 w-auto'
            />
          </div>

          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
