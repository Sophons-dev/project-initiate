'use client';

import { fadeInUp, staggerContainer } from '@/lib/animation-variants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const SponsorSection = () => {
  const sponsors = [
    { name: 'ecop', url: 'www.ecop.org.ph' },
    { name: 'create8', url: 'https://www.creat8stories.org/' },
    { name: 'dole2', url: 'https://www.foi.gov.ph/agencies/dole/' },
  ];

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
          We&apos;re grateful for the support of our sponsors who help make our mission possible.
        </motion.p>
        <motion.div
          className='flex items-center gap-5 max-w-3xl mx-auto pb-4 overflow-x-auto md:flex-wrap md:justify-between md:overflow-visible'
          variants={staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className='flex-shrink-0 text-2xl font-bold transition-opacity cursor-pointer opacity-60 hover:opacity-100'
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={sponsor.url} target='_blank' rel='noopener noreferrer'>
                <Image src={`/sponsors/${sponsor.name}.png`} alt={sponsor.name} width={160} height={160} className='' />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
