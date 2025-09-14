'use client';

import { TextPill } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUp, staggerContainer } from '@/lib/animation-variants';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Bookmark, Building, CircleUser, MapPin, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export const FeatureSection = () => {
  const featuresRef = useRef(null);

  const { scrollYProgress } = useScroll();

  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: '-200px',
  });
  const yFeatures = useTransform(scrollYProgress, [0.2, 0.6], [0, -30]);

  return (
    <section ref={featuresRef} className='mx-auto py-30 px-4 md:mx-0'>
      <motion.div style={{ y: yFeatures }} className='container max-w-7xl mx-auto'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <TextPill icon={<Sparkles className='w-4 h-4' />} text='What we offer' />
          <h2 className='text-2xl lg:text-3xl text-black mb-4'>Powerful Features for Your Success</h2>
          <p className='max-w-2xl mx-auto'>
            Discover how our platform uses cutting-edge technology to connect you with the right opportunities at the
            right time.
          </p>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
          variants={staggerContainer}
          initial='initial'
          animate={featuresInView ? 'animate' : 'initial'}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className='p-6 h-full hover:shadow-xl transition-all border duration-300 group bg-[#F9F8FC]'>
                <CardContent className='p-0 flex flex-col gap-y-6'>
                  <motion.div
                    className='w-full rounded-lg mb-4 relative overflow-hidden'
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    {feature.content}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className='mb-2'
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                      className='text-gray-600 text-sm'
                    >
                      {feature.description}
                    </motion.p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const features = [
  {
    title: 'AI-Powered Matching',
    description:
      'Our advanced AI analyzes your profile, skills, and preferences to find the most relevant opportunities that are aligned with your interests.',
    content: (
      <div className='w-full h-[280px] flex flex-col gap-y-10 items-center justify-center  relative'>
        <div className='z-20 relative'>
          <div className='p-4 mx-auto border-10 shadow-sm border-white bg-orange-50 rounded-lg w-fit'>
            <CircleUser className='text-orange-600' />
          </div>

          <div className='absolute text-xs bg-cyan-500 text-white min-w-fit -bottom-1 -left-4 -translate-x-1/2 p-2 rounded'>
            USER PROFILE
          </div>
        </div>

        {/* Center dash line vertical */}
        <div className='w-1 h-[100px] border-l-3 border-dashed border-neutral-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>

        <div className='h-fit shadow-sm z-20 bg-neutral-200/50 p-3 border border-white rounded-2xl'>
          <div className='bg-white flex flex-col gap-y-2 p-3 rounded-xl'>
            <p className='text-xs flex items-center gap-2 text-cyan-500'>
              <Sparkles className='w-4 h-4' />
              Why this matches you:
            </p>
            <p className='text-xs text-gray-600 line-clamp-3 xl:line-clamp-5'>
              Based on your design portfolio, this workshop will enhance your UX research skills and expand your design
              thinking methodology.
            </p>
          </div>
        </div>
        <div className='absolute h-20 z-20 bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-[#F9F8FC]/50 to-[#F9F8FC]'></div>
      </div>
    ),
  },
  {
    title: 'Personalized Recommendations',
    description:
      'We provide tailored suggestions based on your career goals, interests, and current skill level ensuring that they matches you.',
    content: (
      <div className='w-full h-[280px] flex flex-col gap-y-10 items-center justify-end relative'>
        <div className='h-fit w-[90%] shadow-sm z-20 bg-neutral-200/50 p-3 border border-white rounded-2xl'>
          <div className='bg-white relative p-3 rounded-xl flex flex-col gap-y-3'>
            <div className='absolute text-xs py-1.5 bg-orange-600 uppercase px-5 text-white min-w-fit top-1 -left-5 p-2 rounded'>
              EVENT
            </div>

            <div className='absolute top-3 right-3'>
              <Bookmark className='w-5 h-5 text-gray-600' />
            </div>

            <div className='flex flex-col mt-8 items-start gap-y-0.5'>
              <p className='text-xs'>UX Design Workshop</p>
              <p className='text-xs text-gray-600 flex items-center gap-1'>
                <Building className='w-4 h-4' />
                Design Academy
              </p>
              <p className='text-xs text-gray-600 flex items-center gap-1'>
                <MapPin className='w-4 h-4' />
                New York, NY
              </p>
            </div>

            <p className='text-xs text-gray-600 line-clamp-3 xl:line-clamp-3'>
              A comprehensive 3-day workshop covering user research, wireframing, prototyping, and usability testing.
              Perfect for designers looking to enhance their design skills.
            </p>

            <div className='p-2 bg-[#F8F9FA] rounded-xl'>
              <p className='text-xs flex items-center gap-2 text-cyan-500'>
                <Sparkles className='w-3 h-3' />
                Why this matches you:
              </p>
              <p className='text-xs text-gray-600 line-clamp-3 xl:line-clamp-2'>
                Based on your design portfolio, this workshop will enhance your UX research skills and expand your
                design thinking methodology.
              </p>
            </div>
          </div>
        </div>

        {/* Gradient */}
        <div className='absolute h-20 z-20 bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-[#F9F8FC]/50 to-[#F9F8FC]'></div>
      </div>
    ),
  },
  {
    title: 'Verified Organizations',
    description:
      'Most of the opportunities come from partnered and verified, reputable organizations and institutions.',
    content: (
      <div className='w-full h-[280px] flex flex-col gap-y-10 items-center justify-end relative'>
        {/* Top */}
        <div className='absolute -top-45 left-0 h-fit w-[80%] shadow-sm z-20 bg-neutral-200/50 p-3 border border-white rounded-2xl'>
          <div className='bg-white relative p-3 rounded-xl flex flex-col gap-y-3'>
            <div className='absolute py-1.5 bg-orange-600 uppercase px-5 text-white min-w-fit top-1 -left-5 p-2 rounded'>
              EVENT
            </div>

            <div className='absolute top-3 right-3'>
              <Bookmark className='w-5 h-5 text-gray-600' />
            </div>

            <div className='flex flex-col mt-8 items-start gap-y-0.5'>
              <p className='text-xs'>UX Design Workshop</p>
              <p className='text-xs text-gray-600 flex items-center gap-1'>
                <Building className='w-4 h-4' />
                Design Academy
              </p>
              <p className='text-xs text-gray-600 flex items-center gap-1'>
                <MapPin className='w-4 h-4' />
                New York, NY
              </p>
            </div>

            <p className='text-xs text-gray-600 line-clamp-3 xl:line-clamp-3'>
              A comprehensive 3-day workshop covering user research, wireframing, prototyping, and usability testing.
              Perfect for designers looking to enhance their design skills.
            </p>

            <div className='p-2 bg-[#F8F9FA] rounded-xl'>
              <p className='text-xs flex items-center gap-2 text-cyan-500'>
                <Sparkles className='w-3 h-3' />
                Why this matches you:
              </p>
              <p className='text-xs text-gray-600 line-clamp-3 xl:line-clamp-2'>
                Based on your design portfolio, this workshop will enhance your UX research skills and expand your
                design thinking methodology.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='absolute -bottom-25 right-0 h-fit w-[80%] shadow-sm z-20 bg-neutral-200/50 p-3 border border-white rounded-2xl'>
          <div className='bg-white relative p-3 rounded-xl flex flex-col gap-y-3'>
            <div className='absolute text-xs py-1.5 bg-yellow-500 uppercase px-5 text-white min-w-fit top-1 -left-5 p-2 rounded'>
              SCHOOL
            </div>

            <div className='absolute top-3 right-3'>
              <Bookmark className='w-5 h-5 text-gray-600' />
            </div>

            <div className='flex flex-col mt-8 items-start gap-y-0.5'>
              <p className='text-xs'>University of the Philippines</p>
              <p className='text-xs text-gray-600 flex items-center gap-1'>
                <MapPin className='w-4 h-4' />
                Manila, Philippines
              </p>
            </div>

            <p className='text-xs text-gray-600 line-clamp-3 xl:line-clamp-3'>
              A comprehensive 3-day workshop covering user research, wireframing, prototyping, and usability testing.
              Perfect for designers looking to enhance their design skills.
            </p>

            <div className='p-2 bg-[#F8F9FA] rounded-xl'>
              <p className='text-xs flex items-center gap-2 text-cyan-500'>
                <Sparkles className='w-3 h-3' />
                Why this matches you:
              </p>
              <p className='text-xs text-gray-600 line-clamp-3 xl:line-clamp-2'>
                Based on your design portfolio, this workshop will enhance your UX research skills and expand your
                design thinking methodology.
              </p>
            </div>
          </div>
        </div>

        {/* Gradient */}
        <div className='absolute h-20 z-20 top-0 left-0 w-full bg-gradient-to-b from-[#F9F8FC] via-[#F9F8FC]/50 to-transparent'></div>
        <div className='absolute h-20 z-20 bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-[#F9F8FC]/50 to-[#F9F8FC]'></div>
      </div>
    ),
  },
];
