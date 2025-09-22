'use client';

import { TextPill } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, Check, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const AcademicSection = () => {
  return (
    <section id='students' className='py-16 px-4 lg:px-6'>
      <div className='container max-w-7xl mx-auto'>
        <div className='flex flex-col-reverse md:flex-row-reverse gap-6 lg:gap-12 items-center'>
          <motion.div className='relative md:w-1/2'>
            <Image
              src='/landing-page/for-students.png'
              alt='Students collaborating'
              width={600}
              height={600}
              className='rounded-2xl'
            />
            <motion.div className='md:absolute md:left-1/2 md:-translate-x-1/2 md:-bottom-10 w-full mt-5 md:mt-0'>
              <div className='flex flex-col md:flex-row justify-between mx-auto md:w-lg w-full md:gap-4 gap-2 rounded-xl'>
                <div className='bg-white md:w-1/2 w-full flex flex-row md:items-center space-x-3 p-3 rounded-xl shadow-lg'>
                  <div className='w-10 md:w-12 h-10 md:h-12 flex items-center justify-center bg-cyan-50 rounded md:rounded-xl'>
                    <BookOpen className='w-5 h-5 md:w-6 md:h-6 text-cyan-500' />
                  </div>
                  <div>
                    <p className='font-medium text-sm text-black'>Course Discovery</p>
                    <p className='text-xs text-gray-500'>Find courses from top universities</p>
                  </div>
                </div>
                <div className='bg-white md:w-1/2 w-full flex items-center space-x-3 p-3 rounded-xl shadow-lg'>
                  <div className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-cyan-50 rounded md:rounded-xl'>
                    <GraduationCap className='w-5 h-5 md:w-6 md:h-6 text-cyan-500' />
                  </div>
                  <div>
                    <p className='font-medium text-sm text-black'>Career Guidance</p>
                    <p className='text-xs text-gray-500'>Get personalized career advice</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className='md:w-1/2'>
            <TextPill
              className='mx-0 mb-8 mt-0 !text-xs text-cyan-500'
              icon={<GraduationCap className='w-4 h-4' />}
              text='For Students'
            />

            <h2 className='text-3xl lg:text-4xl md:max-w-md text-black mb-6'>
              Launch Your <span className='text-cyan-500'>Academic Journey</span> with Confidence
            </h2>

            <div className='space-y-4 mb-8'>
              {[
                'Access to exclusive student discounts and scholarships',
                'Personalized learning path recommendations',
                'Early access to internship and job opportunities',
              ].map((item, index) => (
                <div key={index} className='flex items-center space-x-3'>
                  <div className='w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center'>
                    <Check className='w-4 h-4 text-white' />
                  </div>
                  <span className='text-sm md:text-base'>{item}</span>
                </div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className='bg-cyan-600 hover:bg-cyan-500'>
                <Link href='/signin'>Explore Student Opportunities</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
