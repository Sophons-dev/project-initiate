'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'For Students', href: '#students' },
  { label: 'For Professionals', href: '#professionals' },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

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
      className='h-25 flex items-center max-w-7xl mx-auto sticky top-0 backdrop-blur-md z-50'>
      <div className='relative container mx-auto flex items-center justify-between'>
        {/* Logo */}
        <motion.div
          className='flex items-center space-x-2'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <Link href='/'>
            <Image
              src='/project-initiate-logo.png'
              alt='Logo'
              width={80}
              height={80}
            />
          </Link>
        </motion.div>

        {/* Nav Links */}
        <nav className='absolute left-1/2 transform -translate-x-1/2 md:flex items-center space-x-1'>
          {navLinks.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}>
              <Link
                href={item.href}
                className={`relative group text-sm px-4 py-1.5 rounded-full font-medium transition-colors duration-200 ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-yellow-600 bg-[#FFF4DE]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}>
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
              className='hidden hover:bg-transparent md:inline-flex'>
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
