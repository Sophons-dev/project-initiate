'use client';

import { TextPill } from '@/components/shared/text-pill';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/animation-variants';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Blend, ChevronDown, CircleCheck, CircleUserRound, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export const HeroSection = () => {
  const heroRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });

  const filterOptions = [
    { icon: CircleUserRound, value: '85%', label: 'Profile Completion', color: 'red' },
    { icon: CircleCheck, value: '34', label: 'Matched Opportunities', color: 'cyan' },
    { icon: TrendingUp, value: '10', label: 'High Priority Matches', color: 'yellow' },
    { icon: Blend, value: '95%', label: 'Match Score', color: 'purple' },
  ];
  return (
    <section
      id='home'
      ref={heroRef}
      className='relative pt-10 md:pt-20 hero-bg border border-neutral-100 rounded-4xl px-4 md:px-0 overflow-hidden md:max-w-[calc(100vw-10rem)] mx-auto'>
      <motion.div className='mx-auto text-center'>
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}>
          <TextPill
            icon={<Sparkles className='w-4 h-4' />}
            text='AI-Powered Opportunity Matching'
          />
          <motion.h1
            className='mb-6 text-4xl font-medium text-black lg:text-6xl'
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Find Your Perfect{' '}
            <motion.span
              className='relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}>
              Opportunity
              <motion.div
                className='absolute left-0 w-full h-1 rounded-full -bottom-2 bg-gradient-to-r from-cyan-300 to-cyan-500'
                initial={{ scaleX: 0 }}
                animate={heroInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Hero Description */}
        <motion.p
          className='max-w-3xl mx-auto mb-8 text-gray-600 text-normal'
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}>
          Whether you&apos;re a student seeking courses or a professional hunting for your next career move, our AI
          matches you with opportunities that align perfectly with your goals and profile.{' '}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          {/* Get Started Button */}
          <Button
            asChild
            className='relative py-5 mb-12 overflow-hidden border-4 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-600 border-neutral-100 hover:bg-cyan-600 group'>
            <Link href='/signin'>
              Start Journey
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowRight className='w-4 h-4' />
              </motion.div>
            </Link>
          </Button>
        </motion.div>

        {/* Hero section feature display */}
        <div className='relative pb-0 mx-auto rounded-t-2xl md:p-15 md:pb-0'>
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className='container max-w-7xl p-5 pb-0 rounded-bl-none rounded-br-none bg-[#E9E9E9]/40 border border-white mx-auto rounded-2xl'>
            <motion.div className='p-2 bg-white border-b-0 rounded-bl-none rounded-br-none max-w-7xl md:p-10 md:pb-2 rounded-2xl'>
              <motion.div
                className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:bg-[#E9E9E9]/30 p-2 md:p-3 rounded-md md:border-2 md:border-white gap-4 mb-2 md:mb-6'
                variants={staggerContainer}
                animate={heroInView ? 'animate' : 'initial'}>
                {filterOptions.map((filter, index) => {
                  const Icon = filter.icon;
                  const iconColor = {
                    red: 'bg-red-100 text-red-500',
                    cyan: 'bg-cyan-100 text-cyan-500',
                    yellow: 'bg-yellow-100 text-yellow-500',
                    purple: 'bg-purple-100 text-purple-500',
                  };

                  const textColor = {
                    red: 'text-red-500',
                    cyan: 'text-cyan-500',
                    yellow: 'text-yellow-500',
                    purple: 'text-purple-500',
                  };

                  return (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className={`bg-white border md:border-none rounded p-4 flex items-start space-x-3 cursor-pointer transition-all duration-300`}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}>
                      <motion.div
                        className={`w-8 h-8 md:w-11 md:h-11 rounded-lg flex items-center my-auto justify-center ${iconColor[filter.color as keyof typeof iconColor]}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}>
                        <Icon className='w-5 h-5' />
                      </motion.div>
                      <div className='flex flex-col items-start justify-center text-start'>
                        <p className={`font-medium text-md ${textColor[filter.color as keyof typeof textColor]}`}>
                          {filter.value}
                        </p>
                        <p className='text-xs md:text-sm'>{filter.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                className='rounded-md border-2 bg-[#E9E9E9]/30 p-3 border-white'
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.02 }}>
                <div className='p-4 pb-0 bg-white'>
                  <div className='flex items-start mb-2 space-x-2 md:mb-4'>
                    <Sparkles className='w-4 h-4 text-black md:w-5 md:h-5' />
                    <span className='text-sm font-medium text-black md:text-normal'>AI Career Insights</span>
                  </div>
                  <motion.p
                    className='text-sm md:text-normal text-start line-clamp-6'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}>
                    Based on your profile, you appear to be a well-rounded individual with strong interests in arts &
                    design and excellent analytical thinking abilities. Your goal to explore career options shows
                    you&apos;re proactive about your career development. Consider focusing on opportunities that combine
                    your technical interests with your interpersonal skills. I recommend starting with skill-building
                    courses in your areas of interest while networking with professionals in your target industries.
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero section background gradient for smooth page transition */}
          {/* <div className='absolute bottom-0 left-0 right-0 h-45 bg-gradient-to-b from-white/0 via-white/70 to-white' /> */}
        </div>
      </motion.div>

      {/* Floating scroll indicator */}
      <motion.div
        className='absolute transform -translate-x-1/2 bottom-5 left-1/2'
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}>
        <ChevronDown className='w-6 h-6 text-gray-400' />
      </motion.div>
    </section>
  );
};
