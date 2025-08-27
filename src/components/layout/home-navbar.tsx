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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SignOutButton, useAuth, useUser } from '@clerk/nextjs';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'For Students', href: '#students' },
  { label: 'For Professionals', href: '#professionals' },
];

export const Navbar = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      for (const link of navLinks) {
        const section = document.querySelector(link.href);
        if (section) {
          const top = (section as HTMLElement).offsetTop - 150;
          const bottom = top + (section as HTMLElement).offsetHeight;
          if (scrollY >= top && scrollY <= bottom) {
            setActiveSection(link.href.replace('#', ''));
          }
        }
      }
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
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerHeight - 8; // small spacer
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300',
        isScrolled || isMenuOpen
          ? 'bg-white/80 backdrop-blur-md shadow h-16'
          : 'h-24',
        pathname === '/' ? '' : 'h-15 border-b shadow'
      )}
    >
      <div className='relative container max-w-7xl mx-auto flex items-center justify-between px-4 h-full'>
        {/* Logo */}
        <motion.div
          className='flex items-center space-x-2'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
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

        {/* Nav Links - NOT visible in dashboard */}
        <nav
          className={cn(
            'absolute hidden left-1/2 transform -translate-x-1/2 items-center space-x-1',
            pathname === '/dashboard' ? 'hidden' : 'lg:flex'
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
                  scrollToSection(item.href);
                }}
                className={cn(
                  'relative group text-sm px-4 py-1.5 rounded-full font-medium transition-colors duration-200',
                  activeSection === item.href.replace('#', '')
                    ? 'text-yellow-600'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {/* Active animated pill (desktop) */}
                <AnimatePresence>
                  {activeSection === item.href.replace('#', '') && (
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

        {/* Buttons - NOT visible in dashboard */}
        <motion.div
          className={cn('flex items-center space-x-4')}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {user && isLoaded && isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='hidden cursor-pointer lg:flex items-center gap-2 rounded-full outline-none focus:ring-2 focus:ring-cyan-500'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage
                      src={user.imageUrl ?? ''}
                      alt={user.firstName ?? 'User'}
                    />
                    <AvatarFallback>
                      {(user.firstName ?? 'U').slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel>
                  <div className='flex flex-col'>
                    <span className='font-medium truncate'>
                      {user.firstName}
                    </span>
                    <span className='text-xs text-muted-foreground truncate'>
                      {user.emailAddresses[0].emailAddress}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href='/dashboard'>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href='/profile'>Profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className='w-full'>
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className={cn('items-center space-x-4 hidden lg:flex')}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant='ghost'
                  className='hidden md:inline-flex hover:bg-transparent'
                >
                  <Link href='/sign-in'>Sign In</Link>
                  {/* <SignInButton /> */}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className='bg-yellow-400 hover:bg-yellow-400 relative rounded-full overflow-hidden group'
                >
                  <Link href='/sign-up'>Get Started</Link>
                </Button>
              </motion.div>
            </span>
          )}

          {/* Hamburger */}
          <button
            type='button'
            aria-label='Toggle navigation'
            aria-controls='mobile-nav'
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(v => !v)}
            className={cn(
              'lg:hidden p-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors',
              isMenuOpen && 'bg-gray-50'
            )}
          >
            <span className='sr-only'>Open main menu</span>
            <div className='relative w-6 h-6'>
              <span
                className={cn(
                  'absolute left-0 top-[5px] h-0.5 w-6 bg-gray-800 transition-transform',
                  isMenuOpen ? 'translate-y-1.5 rotate-45' : ''
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-6 bg-gray-800 transition-opacity',
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 bottom-[5px] h-0.5 w-6 bg-gray-800 transition-transform',
                  isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
                )}
              />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Mobile drop-down sheet */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id='mobile-nav'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='lg:hidden absolute inset-x-0 top-full bg-white border-t shadow-md overflow-hidden'
          >
            <ul className='flex flex-col p-4 space-y-1'>
              {navLinks.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={e => {
                      e.preventDefault();
                      scrollToSection(item.href);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      'relative block w-full px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      activeSection === item.href.replace('#', '')
                        ? 'text-yellow-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {/* Active animated background (mobile) */}
                    <AnimatePresence>
                      {activeSection === item.href.replace('#', '') && (
                        <motion.span
                          layoutId='mobile-nav-active'
                          className='absolute inset-0 rounded-md bg-[#FFF4DE]'
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 35,
                          }}
                        />
                      )}
                    </AnimatePresence>
                    <span className='relative z-10'>{item.label}</span>
                  </Link>
                </li>
              ))}

              {/* Mobile: Sign In link */}
              <li className='w-full'>
                {!user ? (
                  <div
                    onClick={() => setIsMenuOpen(false)}
                    className='block w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'
                  >
                    <Link href={'/sign-in'}>Sign In</Link>
                  </div>
                ) : (
                  <div
                    onClick={() => setIsMenuOpen(false)}
                    className='block w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'
                  >
                    <SignOutButton />
                  </div>
                )}
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
