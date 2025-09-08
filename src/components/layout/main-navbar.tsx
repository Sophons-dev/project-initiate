'use client';

import { AnimatePresence, motion } from 'framer-motion';
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
import { SignOutButton, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'Organizations', href: '/organizations' },
];

export const MainNavbar = () => {
  const { user } = useUser();
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('fixed w-full top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md shadow h-16')}
    >
      <div className='relative container max-w-7xl mx-auto flex items-center justify-between px-4 h-full'>
        {/* Logo */}
        <motion.div className='flex items-center space-x-2' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

        <nav
          className={cn(
            'absolute hidden left-1/2 transform -translate-x-1/2 items-center space-x-1',
            pathname === '/' ? 'hidden' : 'lg:flex'
          )}
        >
          {navLinks.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link
                href={item.href}
                onClick={e => {
                  e.preventDefault();
                  router.push(item.href);
                }}
                className={cn(
                  'relative group text-sm px-4 py-1.5 rounded-full font-medium transition-colors duration-200',
                  pathname === item.href ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {/* Active animated pill (desktop) */}
                <AnimatePresence>
                  {pathname === item.href && (
                    <motion.span
                      layoutId='nav-active-pill'
                      className='absolute inset-0 rounded-full bg-[#FFF4DE]'
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 50,
                      }}
                    />
                  )}
                </AnimatePresence>
                <span className='relative z-10'>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Breadcrumbs and User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className='border border-red-500' asChild>
            <Button variant='ghost' className='relative h-8 w-8 p-0 rounded-full'>
              <span className='sr-only'>Open main menu</span>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={user?.imageUrl} alt={user?.firstName ?? 'User'} />
                <AvatarFallback>{(user?.fullName ?? 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end'>
            <DropdownMenuLabel>
              <div className='flex flex-col'>
                <span className='font-medium truncate'>{user?.firstName}</span>
                <span className='text-xs text-muted-foreground truncate'>{user?.emailAddresses[0].emailAddress}</span>
              </div>
            </DropdownMenuLabel>
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
              <DropdownMenuItem asChild className='w-full cursor-pointer'>
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};
