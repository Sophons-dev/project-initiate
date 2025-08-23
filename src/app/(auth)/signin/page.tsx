'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { SignInFormData, signInSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleSignInButton } from '@/components/shared/google-signin-button';
import { authApi } from '@/services/auth.api';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const signInMutation = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: data => {
      console.log('Sign in successful:', data);
      // Handle successful sign in (store token, redirect, etc.)
      router.push('/onboarding'); // Redirect to dashboard or home
    },
    onError: error => {
      console.error('Sign in failed:', error);
      // Handle error (show toast, etc.)
    },
  });

  const onSubmit = (data: SignInFormData) => {
    signInMutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
          Welcome to Initiate
        </h1>
        <p className='text-gray-600 text-sm'>
          Your journey to the perfect career starts here
        </p>
      </div>

      {/* Tab Navigation */}
      <div className='flex rounded-lg p-1 mb-8 bg-gray-200'>
        <div className='flex-1 py-2 px-4 rounded-md text-sm font-medium bg-cyan-500 text-white shadow-sm text-center'>
          Sign In
        </div>
        <Link
          href='/signup'
          className='flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 text-center transition-colors'
        >
          Sign Up
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Email Field */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Email Address
          </label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <Input
              type='email'
              placeholder='your.email@example.com'
              {...register('email')}
              className='pl-10 h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-cyan-500'
            />
          </div>
          {errors.email && (
            <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className='flex justify-between items-center mb-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <Link
              href='/forgot-password'
              className='text-sm text-gray-500 hover:text-cyan-500 transition-colors'
            >
              forgot password?
            </Link>
          </div>
          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              {...register('password')}
              className='pl-10 pr-10 h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-cyan-500'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              {showPassword ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </button>
          </div>
          {errors.password && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type='submit'
          disabled={signInMutation.isPending}
          className='w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg disabled:opacity-50'
        >
          {signInMutation.isPending ? 'Signing in...' : 'Sign In'}
        </Button>

        {/* Error Message */}
        {signInMutation.isError && (
          <div className='text-center text-sm text-red-600'>
            Sign in failed. Please check your credentials and try again.
          </div>
        )}

        {/* Divider */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-200' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-gray-50 text-gray-500'>or</span>
          </div>
        </div>

        {/* Google Sign In */}
        <GoogleSignInButton />
      </form>

      {/* Terms */}
      <p className='text-center text-xs text-gray-500 mt-8'>
        By continuing, you agree to our{' '}
        <Link href='/terms' className='text-cyan-500 hover:underline'>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href='/privacy' className='text-cyan-500 hover:underline'>
          Privacy Policy
        </Link>
      </p>
    </motion.div>
  );
}
