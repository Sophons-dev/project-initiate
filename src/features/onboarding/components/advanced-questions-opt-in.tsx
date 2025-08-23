'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '../contexts/onboarding-context';
import { ArrowLeft, ArrowRight, Target, Clock } from 'lucide-react';

export function AdvancedQuestionsOptIn() {
  const { data, updateData, setCurrentStep, currentStep, totalSteps } =
    useOnboarding();
  const [wantsAdvanced, setWantsAdvanced] = useState<boolean | null>(
    data.wantsAdvancedQuestions
  );

  const handleNext = () => {
    updateData({ wantsAdvancedQuestions: wantsAdvanced || false });
    if (wantsAdvanced) {
      setCurrentStep(5); // Go to advanced questions
    } else {
      setCurrentStep(6); // Skip to terms
    }
  };

  const handleBack = () => {
    setCurrentStep(3);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          Would you like to answer more advanced questions?
        </h2>
        <p className='text-gray-600 text-sm'>
          This will help us match you more accurately with opportunities that
          fit your specific interests and goals.
        </p>
      </div>

      {/* Progress */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm text-gray-500'>
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-cyan-500 h-2 rounded-full transition-all duration-300'
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Benefits */}
      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8'>
        <h3 className='font-semibold text-blue-900 mb-3 flex items-center'>
          <Target className='w-5 h-5 mr-2' />
          Why answer advanced questions?
        </h3>
        <ul className='space-y-2 text-sm text-blue-800'>
          <li>• Get more personalized opportunity recommendations</li>
          <li>• Better matching based on your career goals and interests</li>
          <li>• Discover opportunities you might not have considered</li>
          <li>• Higher success rate in applications and interviews</li>
        </ul>
        <div className='mt-3 flex items-center text-xs text-blue-600'>
          <Clock className='w-4 h-4 mr-1' />
          Takes about 2-3 minutes
        </div>
      </div>

      {/* Options */}
      <div className='space-y-4 mb-8'>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            wantsAdvanced === true
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          onClick={() => setWantsAdvanced(true)}
        >
          <div className='flex items-center space-x-3'>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                wantsAdvanced === true
                  ? 'border-cyan-500 bg-cyan-500'
                  : 'border-gray-300'
              }`}
            >
              {wantsAdvanced === true && (
                <div className='w-2 h-2 bg-white rounded-full' />
              )}
            </div>
            <div>
              <span className='font-medium text-gray-900'>
                Yes, I want better matches
              </span>
              <p className='text-sm text-gray-600'>
                Answer a few more questions for personalized recommendations
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            wantsAdvanced === false
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          onClick={() => setWantsAdvanced(false)}
        >
          <div className='flex items-center space-x-3'>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                wantsAdvanced === false
                  ? 'border-cyan-500 bg-cyan-500'
                  : 'border-gray-300'
              }`}
            >
              {wantsAdvanced === false && (
                <div className='w-2 h-2 bg-white rounded-full' />
              )}
            </div>
            <div>
              <span className='font-medium text-gray-900'>
                No, skip for now
              </span>
              <p className='text-sm text-gray-600'>
                Continue with basic matching
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className='flex justify-between'>
        <Button
          onClick={handleBack}
          variant='ghost'
          className='text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full'
        >
          <ArrowLeft className='w-4 h-4 mr-2' /> Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={wantsAdvanced === null}
          className='bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-full disabled:opacity-50'
        >
          {wantsAdvanced ? 'Continue' : 'Skip'}{' '}
          <ArrowRight className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </motion.div>
  );
}
