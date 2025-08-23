'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import {
  forgotPasswordEmailSchema,
  verificationCodeSchema,
  resetPasswordSchema,
  type ForgotPasswordEmailData,
  type VerificationCodeData,
  type ResetPasswordData,
} from '@/lib/validations/auth';
import { authApi } from '@/services/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ForgotPasswordStep = 'email' | 'verification' | 'reset' | 'success';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  // Email form
  const emailForm = useForm<ForgotPasswordEmailData>({
    resolver: zodResolver(forgotPasswordEmailSchema),
  });

  // Verification form
  const verificationForm = useForm<VerificationCodeData>({
    resolver: zodResolver(verificationCodeSchema),
  });

  // Reset password form
  const resetForm = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Mutations
  const sendCodeMutation = useMutation({
    mutationFn: authApi.sendResetCode,
    onSuccess: () => {
      setStep('verification');
    },
    onError: error => {
      console.error('Failed to send reset code:', error);
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      authApi.verifyResetCode(email, code),
    onSuccess: data => {
      setResetToken(data.resetToken);
      setStep('reset');
    },
    onError: error => {
      console.error('Failed to verify code:', error);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({
      resetToken,
      newPassword,
    }: {
      resetToken: string;
      newPassword: string;
    }) => authApi.resetPassword(resetToken, newPassword),
    onSuccess: () => {
      setStep('success');
    },
    onError: error => {
      console.error('Failed to reset password:', error);
    },
  });

  const onEmailSubmit = (data: ForgotPasswordEmailData) => {
    setEmail(data.email);
    sendCodeMutation.mutate(data.email);
  };

  const onVerificationSubmit = (data: VerificationCodeData) => {
    verifyCodeMutation.mutate({ email, code: data.code });
  };

  const onResetSubmit = (data: ResetPasswordData) => {
    resetPasswordMutation.mutate({ resetToken, newPassword: data.newPassword });
  };

  const renderStepContent = () => {
    switch (step) {
      case 'email':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className='text-center mb-8'>
              <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                Forgot Password?
              </h1>
              <p className='text-gray-600 text-sm'>
                Enter your email address and we&apos;ll send you a verification
                code to reset your password.
              </p>
            </div>

            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className='space-y-6'
            >
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email Address
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <Input
                    type='email'
                    placeholder='Enter your email address'
                    {...emailForm.register('email')}
                    className='pl-10 h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-cyan-500'
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <p className='mt-1 text-sm text-red-600'>
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                disabled={sendCodeMutation.isPending}
                className='w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg disabled:opacity-50'
              >
                {sendCodeMutation.isPending
                  ? 'Sending...'
                  : 'Send Verification Code'}
              </Button>

              {sendCodeMutation.isError && (
                <div className='text-center text-sm text-red-600'>
                  Failed to send verification code. Please try again.
                </div>
              )}
            </form>
          </motion.div>
        );

      case 'verification':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className='text-center mb-8'>
              <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                Check Your Email
              </h1>
              <p className='text-gray-600 text-sm'>
                We&apos;ve sent a 6-character verification code to{' '}
                <span className='font-medium text-gray-900'>{email}</span>
              </p>
            </div>

            <form
              onSubmit={verificationForm.handleSubmit(onVerificationSubmit)}
              className='space-y-6'
            >
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Verification Code
                </label>
                <Input
                  type='text'
                  placeholder='Enter 6-character code'
                  {...verificationForm.register('code')}
                  className='h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-cyan-500 text-center text-lg font-mono tracking-widest uppercase'
                  maxLength={6}
                />
                {verificationForm.formState.errors.code && (
                  <p className='mt-1 text-sm text-red-600'>
                    {verificationForm.formState.errors.code.message}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                disabled={verifyCodeMutation.isPending}
                className='w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg disabled:opacity-50'
              >
                {verifyCodeMutation.isPending ? 'Verifying...' : 'Verify Code'}
              </Button>

              {verifyCodeMutation.isError && (
                <div className='text-center text-sm text-red-600'>
                  Invalid verification code. Please try again.
                </div>
              )}

              <div className='text-center'>
                <button
                  type='button'
                  onClick={() => setStep('email')}
                  className='text-sm text-gray-500 hover:text-cyan-500 transition-colors'
                >
                  Didn&apos;t receive the code? Try again
                </button>
              </div>
            </form>
          </motion.div>
        );

      case 'reset':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className='text-center mb-8'>
              <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                Reset Your Password
              </h1>
              <p className='text-gray-600 text-sm'>
                Create a new password for your account.
              </p>
            </div>

            <form
              onSubmit={resetForm.handleSubmit(onResetSubmit)}
              className='space-y-6'
            >
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  New Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder='Enter new password'
                    {...resetForm.register('newPassword')}
                    className='pl-10 pr-10 h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-cyan-500'
                  />
                  <button
                    type='button'
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showNewPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
                {resetForm.formState.errors.newPassword && (
                  <p className='mt-1 text-sm text-red-600'>
                    {resetForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Confirm New Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm new password'
                    {...resetForm.register('confirmPassword')}
                    className='pl-10 pr-10 h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-cyan-500'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
                {resetForm.formState.errors.confirmPassword && (
                  <p className='mt-1 text-sm text-red-600'>
                    {resetForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                disabled={resetPasswordMutation.isPending}
                className='w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg disabled:opacity-50'
              >
                {resetPasswordMutation.isPending
                  ? 'Resetting...'
                  : 'Reset Password'}
              </Button>

              {resetPasswordMutation.isError && (
                <div className='text-center text-sm text-red-600'>
                  Failed to reset password. Please try again.
                </div>
              )}
            </form>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className='text-center'
          >
            <div className='mb-8'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <CheckCircle className='w-8 h-8 text-green-500' />
              </div>
              <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                Password Reset Successful!
              </h1>
              <p className='text-gray-600 text-sm'>
                Your password has been successfully reset. You can now sign in
                with your new password.
              </p>
            </div>

            <Button
              onClick={() => router.push('/signin')}
              className='w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg'
            >
              Back to Sign In
            </Button>
          </motion.div>
        );
    }
  };

  return <AnimatePresence mode='wait'>{renderStepContent()}</AnimatePresence>;
}
