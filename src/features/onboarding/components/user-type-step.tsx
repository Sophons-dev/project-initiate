'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../contexts/onboarding-context';
import { Button } from '@/components/ui/button';

export function UserTypeStep() {
  const { data, updateData, setCurrentStep, fetchQuestions } = useOnboarding();
  const [selectedUserType, setSelectedUserType] = useState<
    'student' | 'professional' | null
  >(data.userType);

  const handleNext = () => {
    if (selectedUserType) {
      updateData({ userType: selectedUserType });

      fetchQuestions(selectedUserType);
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

      {/* Options */}
      <div className='space-y-2 mb-8 bg-neutral-100 p-3 rounded-xl'>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 border rounded-lg cursor-pointer transition-all ${
            selectedUserType === 'student'
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          onClick={() => setSelectedUserType('student')}
        >
          <div className='flex items-center space-x-3'>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedUserType === 'student'
                  ? 'border-cyan-500 bg-cyan-500'
                  : 'border-gray-300'
              }`}
            >
              {selectedUserType === 'student' && (
                <div className='w-2 h-2 bg-white rounded-full' />
              )}
            </div>
            <GraduationCap className='w-6 h-6 text-gray-600' />
            <span className='text-gray-900'>Student</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selectedUserType === 'professional'
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          onClick={() => setSelectedUserType('professional')}
        >
          <div className='flex items-center space-x-3'>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedUserType === 'professional'
                  ? 'border-cyan-500 bg-cyan-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {selectedUserType === 'professional' && (
                <div className='w-2 h-2 bg-white rounded-full' />
              )}
            </div>
            <Briefcase className='w-6 h-6 text-gray-600' />
            <span className='text-gray-900'>Professional / Post Grad</span>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className='flex justify-end'>
        <Button
          size={'lg'}
          onClick={handleNext}
          disabled={!selectedUserType}
          className='bg-cyan-600 !px-6 hover:bg-cyan-700 text-white rounded-full disabled:opacity-50'
        >
          Next <ArrowRight className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </motion.div>
  );
}
