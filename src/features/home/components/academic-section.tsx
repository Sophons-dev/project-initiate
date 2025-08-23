'use client';

import { Button } from '@/components/ui/button';
import { slideInLeft, staggerContainer } from '@/lib/animation-variants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Check, GraduationCap } from 'lucide-react';
import { TextPill } from '@/components/shared/text-pill';
import Link from 'next/link';

export const AcademicSection = () => {
  return (
    <section id='students' className='py-16 px-4 lg:px-6'>
      <div className='container max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <TextPill
                className='mx-0 mb-8 mt-0 !text-xs'
                icon={<GraduationCap className='w-4 h-4' />}
                text='For Students'
              />
            </motion.div>
            <h2 className='text-3xl lg:text-4xl text-black mb-6'>
              Launch Your Academic Journey with{' '}
              <motion.span
                className='text-cyan-500'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Confidence
              </motion.span>
            </h2>

            <p className='mb-6 text-sm md:text-base'>
              From finding the perfect courses to building your network, we help
              students discover opportunities that accelerate their learning and
              career prospects.
            </p>

            <motion.div
              className='space-y-4 mb-8'
              variants={staggerContainer}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true }}
            >
              {[
                'Access to exclusive student discounts and scholarships',
                'Personalized learning path recommendations',
                'Early access to internship and job opportunities',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={slideInLeft}
                  className='flex items-center space-x-3 group cursor-pointer'
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className='w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center'
                    whileHover={{ scale: 2 }}
                  >
                    <Check className='w-4 h-4 text-white' />
                  </motion.div>

                  <span className='group-hover:text-cyan-600 transition-colors text-sm md:text-base'>
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className='bg-cyan-600 hover:bg-cyan-500'>
                <Link href='/signin'>Explore Student Opportunities</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className='relative'
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src='/landing-page/for-students.png'
                alt='Students collaborating'
                width={600}
                height={600}
                className='rounded-2xl'
              />
            </motion.div>
            <motion.div
              className='md:absolute md:left-1/2 md:-translate-x-1/2 md:-bottom-10 w-full mt-5 md:mt-0'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className='flex flex-col md:flex-row justify-between mx-auto md:w-lg w-full md:gap-4 gap-2 rounded-xl'
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className='bg-white md:w-1/2 w-full flex flex-row md:items-center space-x-3 p-3 rounded-xl shadow-lg'>
                  <motion.div
                    className='w-10 md:w-12 h-10 md:h-12 flex items-center justify-center bg-cyan-50 rounded md:rounded-xl'
                    whileHover={{ scale: 1.1 }}
                  >
                    <BookOpen className='w-5 h-5 md:w-6 md:h-6 text-cyan-500' />
                  </motion.div>
                  <div>
                    <p className='font-medium text-sm text-black'>
                      Course Discovery
                    </p>
                    <p className='text-xs text-gray-500'>
                      Find courses from top universities
                    </p>
                  </div>
                </div>
                <div className='bg-white md:w-1/2 w-full flex items-center space-x-3 p-3 rounded-xl shadow-lg'>
                  <motion.div
                    className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-cyan-50 rounded md:rounded-xl'
                    whileHover={{ scale: 1.1 }}
                  >
                    <GraduationCap className='w-5 h-5 md:w-6 md:h-6 text-cyan-500' />
                  </motion.div>
                  <div>
                    <p className='font-medium text-sm text-black'>
                      Career Guidance
                    </p>
                    <p className='text-xs text-gray-500'>
                      Get personalized career advice
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
