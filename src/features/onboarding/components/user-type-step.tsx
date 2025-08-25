'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../contexts/onboarding-context';
import { Button } from '@/components/ui/button';

export function UserTypeStep() {
  const { data, updateData, setCurrentStep, currentStep, totalSteps, fetchQuestions } =
    useOnboarding();
  const [selectedRole, setSelectedRole] = useState<
    'student' | 'professional' | null
  >(data.role);

  const handleNext = () => {
    if (selectedRole) {
      updateData({ role: selectedRole });
      fetchQuestions(selectedRole);
      setCurrentStep(2);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          Which best describes you?
        </h2>
        <p className='text-gray-600 text-sm'>
          Tell us a bit about where you are right now, so we can tailor
          opportunities just for you.
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

      {/* Options */}
      <div className='space-y-2 mb-8 bg-neutral-100 p-3 rounded-xl'>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 border rounded-lg cursor-pointer transition-all ${
            selectedRole === 'student'
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          onClick={() => setSelectedRole('student')}
        >
          <div className='flex items-center space-x-3'>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedRole === 'student'
                  ? 'border-cyan-500 bg-cyan-500'
                  : 'border-gray-300'
              }`}
            >
              {selectedRole === 'student' && (
                <div className='w-2 h-2 bg-white rounded-full' />
              )}
            </div>
            <GraduationCap className='w-6 h-6 text-gray-600' />
            <span className='font-medium text-gray-900'>Student</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selectedRole === 'professional'
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          onClick={() => setSelectedRole('professional')}
        >
          <div className='flex items-center space-x-3'>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedRole === 'professional'
                  ? 'border-cyan-500 bg-cyan-500'
                  : 'border-gray-300'
              }`}
            >
              {selectedRole === 'professional' && (
                <div className='w-2 h-2 bg-white rounded-full' />
              )}
            </div>
            <Briefcase className='w-6 h-6 text-gray-600' />
            <span className='font-medium text-gray-900'>
              Professional / Post Grad
            </span>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className='flex justify-end'>
        <Button
          size={'lg'}
          onClick={handleNext}
          disabled={!selectedRole}
          className='bg-cyan-600 !px-6 hover:bg-cyan-700 text-white rounded-full disabled:opacity-50'
        >
          Next <ArrowRight className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </motion.div>
  );
}
