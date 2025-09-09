'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '../contexts/onboarding-context';
import { useRouter } from 'next/navigation';
import { CheckCircle, Sparkles, Target, Users } from 'lucide-react';
import { onboardUser } from '@/features/user/actions';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { useState } from 'react';
import { loadingStates } from '../lib/constants';
import { useGenerateAndSaveOpportunities } from '@/features/opportunities/hooks';

export function CompletionStep() {
  const { data } = useOnboarding();
  const router = useRouter();
  const saveOpps = useGenerateAndSaveOpportunities();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

  // Handle onboarding process and navigate to dashboard
  const handleGoToDashboard = async () => {
    setLoading(true);
    setCurrentStep(0); // Start loader at step 0

    try {
      // STEP 0 — onboardUser (while loader shows "Packing your details...")
      const res = await onboardUser(data);
      if (!res.success || !res.data?.userId) {
        throw new Error(res.error || 'Onboarding failed');
      }

      // STEP 1..N-2 — mock delays
      for (let i = 1; i < loadingStates.length - 1; i++) {
        setCurrentStep(i);
        await wait(loadingStates[i].duration || 1500);
      }

      // STEP N — real opportunity generation
      setCurrentStep(loadingStates.length - 1);
      try {
        await saveOpps.mutateAsync({
          context: JSON.stringify(data),
          userId: res.data.userId,
        });
        // Only redirect if opportunity generation succeeds
        router.push('/dashboard');
      } catch (e) {
        console.error('Failed generating opportunities:', e);
        // Don't redirect on error - let user retry or handle the error
        setLoading(false);
        // You could show an error message to the user here
        throw new Error('Failed to generate opportunities. Please try again.');
      }
    } catch (err) {
      console.error('Onboarding error:', err);
      setLoading(false); // stop loader if failure
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='text-center xl:w-[500px]'
    >
      <MultiStepLoader loadingStates={loadingStates} loading={loading} value={currentStep} />

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'
      >
        <CheckCircle className='w-10 h-10 text-green-600' />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='text-3xl font-bold text-gray-900 mb-4'
      >
        Welcome to Initiate! 🎉
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='text-gray-600 text-lg mb-8'
      >
        Your profile is now complete and we&apos;re ready to find amazing opportunities for you!
      </motion.p>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className='grid grid-cols-1 xl:grid-cols-4 gap-3 mb-3'
      >
        <div className='bg-blue-100 border-blue-300 border p-4 xl:col-span-2 rounded-lg'>
          <Target className='w-5 h-5 text-blue-600 mx-auto mb-2' />
          <h3 className='font-semibold text-blue-900 mb-1'>Personalized Matches</h3>
          <p className='text-sm text-blue-700'>Get opportunities tailored to your profile</p>
        </div>

        <div className='bg-purple-100 border-purple-300 border p-4 xl:col-span-2 rounded-lg'>
          <Sparkles className='w-5 h-5 text-purple-600 mx-auto mb-2' />
          <h3 className='font-semibold text-purple-900 mb-1'>AI-Powered</h3>
          <p className='text-sm text-purple-700'>Smart matching based on your preferences</p>
        </div>

        <div className='bg-green-100 border-green-300 border p-4 xl:col-span-4 rounded-lg'>
          <Users className='w-5 h-5 text-green-600 mx-auto mb-2' />
          <h3 className='font-semibold text-green-900 mb-1'>Community</h3>
          <p className='text-sm text-green-700'>Connect with like-minded individuals</p>
        </div>
      </motion.div>

      {/* Profile Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-left'
      >
        <h3 className='font-semibold text-gray-900 mb-4'>Your Profile Summary:</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
          <div>
            <span className='font-medium text-gray-700'>User Type:</span>{' '}
            <span className='text-gray-600 capitalize'>{data.userType}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>Location:</span>{' '}
            <span className='text-gray-600'>{data.location}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>Age:</span> {/* Get age from date of birth */}
            <span className='text-gray-600'>
              {data.dateOfBirth ? new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear() : ''}
            </span>
          </div>
          {data.school && (
            <div>
              <span className='font-medium text-gray-700'>{data.userType === 'student' ? 'School:' : 'Company:'}</span>{' '}
              <span className='text-gray-600'>{data.school}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Button
          onClick={handleGoToDashboard}
          disabled={loading}
          aria-busy={loading}
          className='bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-3 rounded-full'
        >
          Continue to Dashboard
        </Button>
      </motion.div>
    </motion.div>
  );
}
