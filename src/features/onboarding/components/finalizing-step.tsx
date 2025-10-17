'use client';

import { motion } from 'framer-motion';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { useState, useEffect } from 'react';
import { loadingStates } from '../lib/constants';
import { useOnboarding } from '../contexts/onboarding-context';
import { useRouter } from 'next/navigation';
import { useGenerateAndSaveOpportunities } from '@/features/opportunities/hooks';
import { onboardUser } from '@/features/user/actions';
import { useAuth } from '@clerk/nextjs';
import { useGetUserByClerkId } from '@/features/user/hooks/useUser';
import { getRecommendationsByUserId } from '@/features/opportunities/actions';

export function FinalizingStep() {
  const { data, clearOnboardingData, setIsFinalizing } = useOnboarding();
  const router = useRouter();
  const saveOpps = useGenerateAndSaveOpportunities();
  const { userId } = useAuth();
  const { data: userData } = useGetUserByClerkId(userId || '');
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [showRetryPrompt, setShowRetryPrompt] = useState(false);
  const [warningTimeoutRef, setWarningTimeoutRef] = useState<NodeJS.Timeout | null>(null);
  const [retryTimeoutRef, setRetryTimeoutRef] = useState<NodeJS.Timeout | null>(null);

  // Check localStorage for ongoing process
  const scopedId = userData?.data?.id || userId || 'pending';
  const processKey = `onboarding-process-${scopedId}`;
  const stepKey = `${processKey}-step`;

  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

  // Check if user is already onboarded and has opportunities
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (userData?.data?.onboardingCompleted && userData.data.id) {
        setIsCheckingStatus(true);
        // User is onboarded, but we need to check if they have opportunities
        try {
          const opportunities = await getRecommendationsByUserId(userData.data.id, { page: 1, limit: 1 });

          if (opportunities.data.length > 0) {
            // User has opportunities, safe to redirect
            console.log('User already onboarded with opportunities, redirecting to dashboard');
            clearOnboardingData();
            router.push('/dashboard');
            return;
          } else {
            // User is onboarded but has no opportunities, continue with generation
            console.log('User onboarded but no opportunities found, continuing generation');
          }
        } catch (error) {
          console.error('Error checking opportunities:', error);
          // If we can't check opportunities, continue with generation to be safe
        } finally {
          setIsCheckingStatus(false);
        }
      }
    };

    checkOnboardingStatus();
  }, [userData, clearOnboardingData, router]);

  // Resume UI if a process is already running (e.g., after refresh), and poll until recommendations exist
  useEffect(() => {
    if (!userData || !userData.data || !userData.data.id) return;
    const ongoingProcess = typeof window !== 'undefined' ? localStorage.getItem(processKey) : null;
    if (!ongoingProcess || hasStarted || isCompleted || error || isCheckingStatus) return;

    setHasStarted(true);
    setLoading(true);

    const savedStep = Number(localStorage.getItem(stepKey) || '1');
    const resumeStep = Number.isFinite(savedStep) ? Math.min(Math.max(savedStep, 1), loadingStates.length - 1) : 1;
    setCurrentStep(resumeStep);

    let isCancelled = false;

    const pollForRecommendations = async () => {
      try {
        const opportunities = await getRecommendationsByUserId(userData.data!.id, { page: 1, limit: 1 });
        if (opportunities.data.length > 0) {
          console.log('Found opportunities during polling, completing process');
          // Continue remaining steps
          for (let i = 2; i < loadingStates.length - 1; i++) {
            if (isCancelled) return;
            setCurrentStep(i);
            localStorage.setItem(stepKey, String(i));
            await wait(loadingStates[i].duration || 1500);
          }

          if (isCancelled) return;
          setIsCompleted(true);
          setLoading(false);
          localStorage.removeItem(processKey);
          localStorage.removeItem(stepKey);
          clearOnboardingData();
          router.push('/dashboard');
          return true;
        }
      } catch (e) {
        console.warn('Error polling for recommendations:', e);
        // swallow and retry
      }
      return false;
    };

    let intervalId: number | undefined;
    let timeoutId: number | undefined;
    const startPolling = () => {
      // Immediate attempt, then interval
      void pollForRecommendations();
      intervalId = window.setInterval(() => {
        void pollForRecommendations();
      }, 3000);

      // Failsafe: if nothing appears after 2min, clear the running flag and allow a fresh start
      timeoutId = window.setTimeout(() => {
        if (!isCancelled) {
          console.warn('Polling timeout reached, clearing process state');
          localStorage.removeItem(processKey);
          localStorage.removeItem(stepKey);
          setHasStarted(false);
          setError('The opportunity generation process timed out. Please try again.');
          setLoading(false);
        }
      }, 120000); // Reduced to 2 minutes
    };

    startPolling();

    return () => {
      isCancelled = true;
      if (intervalId) window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [userData, hasStarted, isCompleted, error, isCheckingStatus, processKey, stepKey, clearOnboardingData, router]);

  // Execute the AI generation process
  useEffect(() => {
    // Prevent multiple executions
    if (!userId && !userData?.data?.id) return; // wait until we know the user
    if (hasStarted || isCompleted || error || isCheckingStatus) return;

    // Check if process is already running in localStorage
    const ongoingProcess = localStorage.getItem(processKey);
    if (ongoingProcess) {
      console.log('Onboarding process already running, skipping');
      return;
    }

    const executeAIGenerationProcess = async () => {
      setHasStarted(true);
      setError(null);

      // Mark process as started in localStorage
      localStorage.setItem(processKey, 'running');

      try {
        let userId: string;

        // STEP 0 — Ensure user is onboarded and get database user ID
        setCurrentStep(0);
        localStorage.setItem(stepKey, '0');

        if (userData?.data?.onboardingCompleted && userData.data.id) {
          // User is already onboarded, use existing user ID
          userId = userData.data.id;
          console.log('Using existing onboarded user ID:', userId);
        } else {
          // User needs to be onboarded
          const res = await onboardUser(data);

          if (!res.success) {
            throw new Error(`failed to onboard user with data: ${JSON.stringify(data)}: ${res.error}`);
          }
          if (!res.data?.userId) {
            throw new Error(
              `failed to onboard user with data: ${JSON.stringify(data)}: ${res.error} no user id in response`
            );
          }

          userId = res.data.userId;
        }

        // STEP 1 — real opportunity generation with timeout and retry logic
        setCurrentStep(1);
        localStorage.setItem(stepKey, '1');

        // Add timeout to prevent infinite hanging
        const generationPromise = saveOpps.mutateAsync({
          context: JSON.stringify(data),
          userId: userId,
        });

        // Set up warning and retry prompts
        const warningTimeout = setTimeout(() => {
          setShowTimeoutWarning(true);
        }, 60000); // 60 seconds
        setWarningTimeoutRef(warningTimeout);

        const retryTimeout = setTimeout(() => {
          setShowRetryPrompt(true);
        }, 360000); // 6 minutes
        setRetryTimeoutRef(retryTimeout);

        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Opportunity generation timed out after 120 seconds')), 120000);
        });

        const opportunities = await Promise.race([generationPromise, timeoutPromise]);

        // Clear timeouts if generation succeeds
        clearTimeout(warningTimeout);
        clearTimeout(retryTimeout);
        setWarningTimeoutRef(null);
        setRetryTimeoutRef(null);

        // Only proceed if opportunity generation succeeds
        if (!opportunities || opportunities.length === 0) {
          throw new Error(
            'No opportunities generated - the AI was unable to find suitable opportunities for your profile'
          );
        }

        console.log(`Successfully generated ${opportunities.length} opportunities`);

        // STEP 2..N-2 — Additional processing steps (mock delays for UX)
        for (let i = 2; i < loadingStates.length - 1; i++) {
          setCurrentStep(i);
          localStorage.setItem(stepKey, String(i));
          await wait(loadingStates[i].duration || 1500);
        }

        // Mark as completed and redirect
        setIsCompleted(true);
        setLoading(false);
        localStorage.removeItem(processKey); // Clear localStorage
        localStorage.removeItem(stepKey);
        clearOnboardingData();
        router.push('/dashboard');
      } catch (error) {
        console.error('Error during AI generation process:', error);

        // Clear any pending timeouts
        if (warningTimeoutRef) {
          clearTimeout(warningTimeoutRef);
          setWarningTimeoutRef(null);
        }
        if (retryTimeoutRef) {
          clearTimeout(retryTimeoutRef);
          setRetryTimeoutRef(null);
        }

        // Provide more specific error messages
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
          if (error.message.includes('User not found')) {
            errorMessage = 'User account not found. Please try signing in again.';
          } else if (error.message.includes('User not authenticated')) {
            errorMessage = 'Authentication expired. Please sign in again.';
          } else if (error.message.includes('No opportunities generated')) {
            errorMessage = 'Failed to generate opportunities. Please try again.';
          } else if (error.message.includes('timed out')) {
            errorMessage = 'The opportunity generation is taking longer than expected. Please try again.';
          } else if (error.message.includes('Unable to find suitable opportunities')) {
            errorMessage = "We couldn't find opportunities matching your profile. Please try again or contact support.";
          } else {
            errorMessage = error.message;
          }
        }

        setError(errorMessage);
        setLoading(false);
        setIsFinalizing(false); // Reset finalizing state on error
        setHasStarted(false); // Allow retry
        setShowTimeoutWarning(false); // Hide any warning popups
        setShowRetryPrompt(false);
        localStorage.removeItem(processKey); // Clear localStorage on error
        localStorage.removeItem(stepKey);
      }
    };

    executeAIGenerationProcess();
  }, [
    data,
    clearOnboardingData,
    router,
    saveOpps,
    setIsFinalizing,
    hasStarted,
    isCompleted,
    error,
    userData,
    processKey,
    isCheckingStatus,
  ]);

  // Handle retry
  const handleRetry = () => {
    setError(null);
    setHasStarted(false);
    setIsCompleted(false);
    setCurrentStep(0);
    setLoading(true);
    setShowTimeoutWarning(false);
    setShowRetryPrompt(false);

    // Clear any pending timeouts
    if (warningTimeoutRef) {
      clearTimeout(warningTimeoutRef);
      setWarningTimeoutRef(null);
    }
    if (retryTimeoutRef) {
      clearTimeout(retryTimeoutRef);
      setRetryTimeoutRef(null);
    }

    localStorage.removeItem(processKey); // Clear localStorage for retry
  };

  // Show error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='text-center xl:w-[500px]'
      >
        <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
          <div className='text-red-600 text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-red-800 mb-4'>Something went wrong</h2>
          <p className='text-red-700 mb-6'>{error}</p>
          <button
            onClick={handleRetry}
            className='bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors'
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Timeout Warning Popup */}
      {showTimeoutWarning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl'
          >
            <div className='text-center'>
              <div className='text-yellow-500 text-4xl mb-4'>⏰</div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>Taking Longer Than Expected</h3>
              <p className='text-gray-600 mb-4'>
                The opportunity generation is taking longer than usual. This can happen when our AI is searching for the
                best matches for your profile.
              </p>
              <button
                onClick={() => setShowTimeoutWarning(false)}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
              >
                Continue Waiting
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Retry Prompt Popup */}
      {showRetryPrompt && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl'
          >
            <div className='text-center'>
              <div className='text-red-500 text-4xl mb-4'>⚠️</div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>Process Taking Too Long</h3>
              <p className='text-gray-600 mb-4'>
                The opportunity generation has been running for 6 minutes. This might indicate a temporary issue. Would
                you like to try again?
              </p>
              <div className='flex gap-3 justify-center'>
                <button
                  onClick={() => setShowRetryPrompt(false)}
                  className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors'
                >
                  Keep Waiting
                </button>
                <button
                  onClick={handleRetry}
                  className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'
                >
                  Try Again
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

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
            {isCheckingStatus
              ? 'Checking your onboarding status...'
              : 'Our AI is analyzing your preferences and generating tailored opportunities just for you...'}
          </p>
          {hasStarted && (
            <p className='text-sm text-gray-500 mt-2'>Please don&apos;t refresh the page during this process.</p>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
