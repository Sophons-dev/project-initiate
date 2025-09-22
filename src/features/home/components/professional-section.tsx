'use client';

import { TextPill } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, Check, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const ProfessionalSection = () => {
  return (
    <section id='professionals' className='py-16 px-4 lg:px-6'>
      <div className='container max-w-7xl mx-auto'>
        {/* Reverse grid */}
        <div className='flex flex-col-reverse md:flex-row gap-6 lg:gap-12 items-center'>
          <motion.div className='relative md:w-1/2'>
            <motion.div whileHover={{ scale: 1.02, rotate: 1 }} transition={{ duration: 0.3 }}>
              <Image
                src='/landing-page/for-professionals.png'
                alt='Students collaborating'
                width={600}
                height={600}
                className='rounded-2xl'
              />
            </motion.div>
            <motion.div className='md:absolute md:left-1/2 md:-translate-x-1/2 md:-bottom-10 w-full mt-5 md:mt-0'>
              <div className='flex flex-col md:flex-row justify-between mx-auto md:w-lg w-full md:gap-4 gap-2 rounded-xl'>
                <div className='bg-white md:w-1/2 w-full flex flex-row md:items-center space-x-3 p-3 rounded-xl shadow-lg'>
                  <div className='w-10 md:w-12 h-10 md:h-12 flex items-center justify-center bg-orange-50 rounded md:rounded-xl'>
                    <BookOpen className='w-5 h-5 md:w-6 md:h-6 text-orange-500' />
                  </div>
                  <div>
                    <p className='font-medium text-sm text-black'>Job Opportunities</p>
                    <p className='text-xs text-gray-500'>Discover exclusive job openings</p>
                  </div>
                </div>
                <div className='bg-white md:w-1/2 w-full flex items-center space-x-3 p-3 rounded-xl shadow-lg'>
                  <div className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-orange-50 rounded md:rounded-xl'>
                    <GraduationCap className='w-5 h-5 md:w-6 md:h-6 text-orange-500' />
                  </div>
                  <div>
                    <p className='font-medium text-sm text-black'>Industry Events</p>
                    <p className='text-xs text-gray-500'>Connect with industry leaders</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className='md:w-1/2 border border-red-500'>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <TextPill
                className='mx-0 mb-8 mt-0 !text-xs text-orange-500 b'
                icon={<GraduationCap className='w-4 h-4' />}
                text='For Professionals'
              />
            </motion.div>

            <h2 className='text-3xl lg:text-4xl md:max-w-md text-black mb-6'>
              Accelerate your{' '}
              <motion.span className='text-orange-500' whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                Career Growth
              </motion.span>{' '}
              with AI
            </h2>

            <div className='space-y-4 mb-8'>
              {[
                'Confidential job search with privacy controls',
                'Salary insights and other important details',
                'Executive coaching and leadership development',
              ].map((item, index) => (
                <div key={index} className='flex items-center space-x-3 '>
                  <div className='w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center'>
                    <Check className='w-4 h-4 text-white' />
                  </div>

                  <span className=' text-sm md:text-base'>{item}</span>
                </div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className='bg-orange-600 hover:bg-orange-600'>
                <Link href='/signin'>Explore Professional Opportunities</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
