'use client';

import { Separator } from '@radix-ui/react-separator';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { fadeInUp } from '@/lib/animation-variants';
import Image from 'next/image';
import { Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'How it Works', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'API', href: '#' },
      ],
    },
    {
      title: 'For',
      links: [
        { label: 'Students', href: '#' },
        { label: 'Professionals', href: '#' },
        { label: 'Organizations', href: '#' },
        { label: 'Partners', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Status', href: '#' },
      ],
    },
  ] as const;

  const Socials = [
    { icon: <Twitter />, href: '#' },
    { icon: <Linkedin />, href: '#' },
  ] as const;
  return (
    <footer className='border-t bg-[#1C1C1C] mt-10 px-4 lg:px-0'>
      <div className='container max-w-7xl mx-auto py-10 text-white'>
        <motion.div
          className='mx-auto max-w-xl text-center'
          variants={fadeInUp}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.3 }}
        >
          <div>Stay updated with new opportunities</div>
          <div className='text-sm text-muted-foreground my-3'>
            Get notified about the latest courses, jobs, and events that match your profile
          </div>
          <div className='mt-3 flex items-center gap-2'>
            <Input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='h-9 border border-neutral-600'
            />
            <Button className='h-9 rounded-md bg-teal-600 text-white hover:bg-teal-700'>Subscribe</Button>
          </div>
          <p className='mt-2 text-[11px] text-muted-foreground'>We respect your inbox. Unsubscribe anytime.</p>
        </motion.div>

        <Separator className='my-8' />

        <div className='grid gap-8 text-sm md:grid-cols-6 border-t border-b border-neutral-600 py-10'>
          <motion.div
            className='space-y-2 col-span-2 max-w-[15rem]'
            variants={fadeInUp}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
          >
            <div className='flex items-center gap-2'>
              <Image src='/project-initiate-logo.png' alt='Logo' width={90} height={90} />
            </div>
            <p className='text-sm text-muted-foreground'>
              Connecting ambitious individuals with life-changing opportunities through AI-powered matching.
            </p>
          </motion.div>

          {footerSections.map(section => (
            <motion.div
              key={section.title}
              variants={fadeInUp}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
            >
              <div className='mb-2 font-semibold'>{section.title}</div>
              <ul className='space-y-1 text-sm text-muted-foreground'>
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className='hover:text-yellow-600'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Separator className='my-8' />

        <div className='flex flex-col items-center justify-between gap-4 pb-8 text-[11px] text-muted-foreground md:flex-row'>
          <p>© {new Date().getFullYear()} Initiate. All rights reserved.</p>
          <div className='flex items-center gap-4'>
            {Socials.map((link, index) => (
              <Link key={index} href={link.href} className='hover:text-yellow-600'>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
