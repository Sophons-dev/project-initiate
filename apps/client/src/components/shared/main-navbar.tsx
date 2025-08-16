'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'For Students', href: '#students' },
  { label: 'For Professionals', href: '#professionals' },
];

/**
 * Main Navbar component
 * @description Used in the main pages such as Dashboard, Careers, Profile, etc.
 */
export const MainNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (hash: string) => {
    if (!hash.startsWith('#')) return;
    const target = document.querySelector(hash) as HTMLElement | null;
    if (!target) return;
    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8; // small spacer
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('fixed w-full top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md shadow h-16')}>
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

        {/* Breadcrumbs and User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='hidden lg:flex relative h-8 w-8 p-0 rounded-full'>
              <span className='sr-only'>Open main menu</span>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-56'
            align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href='/profile'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/settings'>Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href='/signout'>Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};
