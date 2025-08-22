'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useUser } from '@auth0/nextjs-auth0';

/**
 * Main Navbar component
 * @description Used in the main pages such as Dashboard, Careers, Profile, etc.
 */
export const MainNavbar = () => {
  const { user } = useUser();
  const headerRef = useRef<HTMLElement | null>(null);

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
          <DropdownMenuTrigger
            className='border border-red-500'
            asChild>
            <Button
              variant='ghost'
              className='hidden lg:flex relative h-8 w-8 p-0 rounded-full'>
              <span className='sr-only'>Open main menu</span>
              <Avatar className='h-9 w-9'>
                <AvatarImage
                  src={user?.picture ?? ''}
                  alt={user?.name ?? 'User'}
                />
                <AvatarFallback>{(user?.name ?? 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
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
                <Link href='/auth/logout'>Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};
