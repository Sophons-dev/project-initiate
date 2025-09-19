'use client';

import { TextPill } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/animation-variants';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, GraduationCap, Sparkles, Target, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export const HowItWorksSection = () => {
  const howItWorksRef = useRef(null);

  const howItWorksInView = useInView(howItWorksRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <section id='how-it-works' ref={howItWorksRef} className='py-16 mb-16 how-it-works-bg'>
      <div className='container max-w-7xl mx-auto px-4'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 50 }}
          animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-3xl lg:text-4xl text-black mb-4'>How It Works</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Getting started is simple. Follow these four steps to unlock your perfect opportunities
          </p>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'
          variants={staggerContainer}
          initial='initial'
          animate={howItWorksInView ? 'animate' : 'initial'}
        >
          {[
            {
              icon: <UserPlus className='w-4 h-4' />,
              step: '#1 SIGN UP',
              title: 'Create Your Profile',
              description:
                'Tell us about your background, skills, interests, and goals. The more we know, the better we can match you.',
            },
            {
              icon: <Sparkles className='w-4 h-4' />,
              step: '#2 ANALYSIS',
              title: 'Algorithmic Smart Analysis',
              description:
                'Our algorithm analyzes your profile and provides personalized recommendations for opportunities that fit your profile.',
            },
            {
              icon: <Target className='w-4 h-4' />,
              step: '#3 RECOMMENDATIONS',
              title: 'Get Matched',
              description:
                'Receive personalized recommendations for opportunities opportunities that fit your profile.',
            },
            {
              icon: <GraduationCap className='w-4 h-4' />,
              step: '#4 TAKE ACTION',
              title: 'Succeed',
              description:
                "Based on the generated recommendations, you'll be able to take action and pursue opportunities that align with your interests and goals.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className='text-start group bg-[#E9E9E9]/40 p-5 rounded-lg'
              whileHover={{ y: -10 }}
            >
              <TextPill className='mx-0 mb-8 mt-0 !text-xs' icon={item.icon} text={item.step} />

              <div className='flex flex-col'>
                <motion.h3 className='text-black mb-2' whileHover={{ color: '#06b6d4' }}>
                  {item.title}
                </motion.h3>
                <p className='text-gray-600 text-sm group-hover:text-gray-800 transition-colors'>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='text-center mt-12'
        >
          {/* Get Started Button */}
          {/* TODO: Add gradient from top to bottom */}
          <Button
            asChild
            size={'lg'}
            className='relative py-5 mb-12 overflow-hidden border-4 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-600 border-neutral-100 hover:bg-cyan-600 group'
          >
            <Link href='/auth/login'>
              <span className='relative z-10 flex items-center gap-2'>
                Start Journey
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ArrowRight className='w-4 h-4' />
                </motion.div>
              </span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
