'use client';

import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface GreeterActionProps {
  title: string;
  redirect: string;
}

interface GreeterProps {
  children?: React.ReactNode;
  action?: GreeterActionProps;
  message?: string;
}

export default function Greeter({ children, action, message }: GreeterProps) {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className='hero-bg py-10 border-b border-neutral-200'>
      <div className='max-w-7xl mx-auto px-2 lg:px-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex flex-col gap-y-4 lg:gap-y-0 lg:flex-row items-center justify-between'
        >
          <div>
            <h1 className='text-2xl font-semibold text-gray-900 mb-1'>
              Welcome, {user?.firstName}!
            </h1>
            <p className='text-gray-600'>{message ?? ''}</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-full lg:w-auto'
          >
            <Button
              className='bg-cyan-500 w-full lg:w-auto hover:bg-cyan-600 text-white px-6 py-2 rounded-full'
              onClick={() => router.push(action?.redirect ?? '')}
            >
              {action?.title}
            </Button>
          </motion.div>
        </motion.div>
        {children}
      </div>
    </div>
  );
}
