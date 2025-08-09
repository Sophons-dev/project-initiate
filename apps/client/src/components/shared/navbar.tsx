'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'For Students', href: '#students' },
  { label: 'For Professionals', href: '#professionals' },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      for (const link of navLinks) {
        const section = document.querySelector(link.href);
        if (section) {
          const top = (section as HTMLElement).offsetTop - 100;
          const bottom = top + (section as HTMLElement).offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            setActiveSection(link.href.replace('#', ''));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow h-16' : 'h-24',
      )}>
      <div className='relative container max-w-7xl mx-auto flex items-center justify-between px-4 h-full'>
        {/* Logo */}
        <motion.div
          className='flex items-center space-x-2'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <Link href='/'>
            <Image
              src='/project-initiate-logo.png'
              alt='Logo'
              width={60}
              height={60}
              className='transition-all duration-300'
            />
          </Link>
        </motion.div>

        {/* Nav Links */}
        <nav className='absolute hidden md:flex left-1/2 transform -translate-x-1/2 items-center space-x-1'>
          {navLinks.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}>
              <Link
                href={item.href}
                className={cn(
                  'relative group text-sm px-4 py-1.5 rounded-full font-medium transition-all duration-200',
                  activeSection === item.href.replace('#', '')
                    ? 'text-yellow-600 bg-[#FFF4DE]'
                    : 'text-gray-600 hover:text-gray-900',
                )}>
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Buttons */}
        <motion.div
          className='flex items-center space-x-4'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Button
              variant='ghost'
              className='hidden md:inline-flex hover:bg-transparent'>
              Sign In
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Button className='bg-yellow-400 hover:bg-yellow-400 relative rounded-full overflow-hidden group'>
              <motion.div className='absolute inset-0 bg-opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              <span className='relative z-10'>Get Started</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};
