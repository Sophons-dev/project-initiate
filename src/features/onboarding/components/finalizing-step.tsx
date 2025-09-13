'use client';

import { motion } from 'framer-motion';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { useState, useEffect } from 'react';
import { loadingStates } from '../lib/constants';
import { useOnboarding } from '../contexts/onboarding-context';
import { useRouter } from 'next/navigation';
import { useGenerateAndSaveOpportunities } from '@/features/opportunities/hooks';
import { onboardUser } from '@/features/user/actions';

export function FinalizingStep() {
  const { data, clearOnboardingData, setIsFinalizing } = useOnboarding();
  const router = useRouter();
  const saveOpps = useGenerateAndSaveOpportunities();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

  // Execute the AI generation process
  useEffect(() => {
    if (hasStarted) return; // Prevent multiple executions

    const executeAIGenerationProcess = async () => {
      setHasStarted(true);
      try {
        // STEP 0 — Ensure user is onboarded and get database user ID
        setCurrentStep(0);
        const res = await onboardUser(data);
        if (!res.success || !res.data?.userId) {
          throw new Error(res.error || 'Onboarding failed');
        }

        // STEP 1 — real opportunity generation
        setCurrentStep(1);
        const opportunities = await saveOpps.mutateAsync({
          context: JSON.stringify(data),
          userId: res.data.userId,
        });

        // Only proceed if opportunity generation succeeds
        if (!opportunities || opportunities.length === 0) {
          throw new Error('No opportunities generated');
        }

        // STEP 2..N-2 — Additional processing steps (mock delays for UX)
        for (let i = 2; i < loadingStates.length - 1; i++) {
          setCurrentStep(i);
          await wait(loadingStates[i].duration || 1500);
        }

        // Clear onboarding data and redirect to dashboard
        clearOnboardingData();
        router.push('/dashboard');
      } catch (error) {
        console.error('Error during AI generation process:', error);
        setLoading(false);
        setIsFinalizing(false); // Reset finalizing state on error
        setHasStarted(false); // Allow retry
        // You could show an error message here and allow retry
        // For now, we'll just log the error
      }
    };

    executeAIGenerationProcess();
  }, [data, clearOnboardingData, router, saveOpps, setIsFinalizing, hasStarted]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='text-center xl:w-[500px]'
    >
      <MultiStepLoader loadingStates={loadingStates} loading={loading} value={currentStep} />

      {/* Loading Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='mt-8'
      >
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>Creating Your Personalized Experience</h2>
        <p className='text-gray-600 text-lg'>
          Our AI is analyzing your preferences and generating tailored opportunities just for you...
        </p>
      </motion.div>
    </motion.div>
  );
}
