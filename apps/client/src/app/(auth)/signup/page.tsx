'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { signUpSchema, type SignUpFormData } from '../../../lib/validations/auth';
import { GoogleSignInButton } from '@/components/shared/google-signin-button';
import { authApi } from '@/services/auth.api';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpFormData) =>
      authApi.signUp({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      }),
    onSuccess: (data) => {
      console.log('Sign up successful:', data);
      // Handle successful sign up (store token, redirect, etc.)
      router.push('/onboarding'); // Redirect to dashboard or onboarding
    },
    onError: (error) => {
      console.error('Sign up failed:', error);
      // Handle error (show toast, etc.)
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    signUpMutation.mutate(data);
    router.push('/onboarding');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-2'>Create an Account</h1>
        <p className='text-gray-600 text-sm'>Fill-up the fields below to start your journey</p>
      </div>

      {/* Tab Navigation */}
      <div className='flex bg-gray-100 rounded-lg p-1 mb-8'>
        <Link
          href='/signin'
          className='flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 text-center transition-colors'>
          Sign In
        </Link>
        <div className='flex-1 py-2 px-4 rounded-md text-sm font-medium bg-cyan-500 text-white shadow-sm text-center'>
          Sign Up
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6'>
        {/* Full Name Field */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
          <div className='relative'>
            <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <Input
              type='text'
              placeholder='John Doe'
              {...register('fullName')}
              className='pl-10 h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-cyan-500'
            />
          </div>
          {errors.fullName && <p className='mt-1 text-sm text-red-600'>{errors.fullName.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <Input
              type='email'
              placeholder='Enter your email'
              {...register('email')}
              className='pl-10 h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-cyan-500'
            />
          </div>
          {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Create Password</label>
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
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
              {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
            </button>
          </div>
          {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Confirm Password</label>
          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm your password'
              {...register('confirmPassword')}
              className='pl-10 pr-10 h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-cyan-500'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
              {showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
            </button>
          </div>
          {errors.confirmPassword && <p className='mt-1 text-sm text-red-600'>{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type='submit'
          disabled={signUpMutation.isPending}
          className='w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg disabled:opacity-50'>
          {signUpMutation.isPending ? 'Creating account...' : 'Sign Up'}
        </Button>

        {/* Error Message */}
        {signUpMutation.isError && (
          <div className='text-center text-sm text-red-600'>Sign up failed. Please try again.</div>
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
        <Link
          href='/terms'
          className='text-cyan-500 hover:underline'>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href='/privacy'
          className='text-cyan-500 hover:underline'>
          Privacy Policy
        </Link>
      </p>
    </motion.div>
  );
}
