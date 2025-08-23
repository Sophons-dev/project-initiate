'use client';

import { fadeInUp, staggerContainer } from '@/lib/animation-variants';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const SponsorSection = () => {
  return (
    <motion.section
      className='px-4 py-12 lg:px-4'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className='container max-w-6xl mx-auto text-center'>
        <motion.p
          className='mb-2 text-2xl text-yellow-500'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Thanks to our sponsors
        </motion.p>
        <motion.p
          className='mb-8 text-gray-600'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          We&apos;re grateful for the support of our sponsors who help make our
          mission possible.
        </motion.p>
        <motion.div
          className='flex items-center gap-8 pb-4 overflow-x-auto md:flex-wrap md:justify-between md:overflow-visible'
          variants={staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
        >
          {['amazon', 'dribbble', 'hubspot', 'notion', 'netflix', 'zoom'].map(
            (sponsor, index) => (
              <motion.span
                key={index}
                variants={fadeInUp}
                className='flex-shrink-0 text-2xl font-bold transition-opacity cursor-pointer opacity-60 hover:opacity-100'
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={`/sponsors/${sponsor}.png`}
                  alt={sponsor}
                  width={100}
                  height={100}
                  className='mix-blend-luminosity'
                />
              </motion.span>
            )
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};
