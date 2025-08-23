'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../contexts/onboarding-context';
import { Button } from '@/components/ui/button';

const strengthOptions = [
  'Leadership',
  'Communication',
  'Problem Solving',
  'Creativity',
  'Teamwork',
  'Analytical Thinking',
  'Time Management',
  'Adaptability',
  'Technical Skills',
  'Research',
  'Writing',
  'Public Speaking',
  'Project Management',
  'Critical Thinking',
  'Innovation',
  'Networking',
];

export function StrengthsStep() {
  const { data, updateData, setCurrentStep, currentStep, totalSteps } =
    useOnboarding();
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>(
    data.strengths
  );

  const toggleStrength = (strength: string) => {
    setSelectedStrengths(prev =>
      prev.includes(strength)
        ? prev.filter(s => s !== strength)
        : [...prev, strength]
    );
  };

  const handleNext = () => {
    updateData({ strengths: selectedStrengths });
    setCurrentStep(4);
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          What are your strengths?
        </h2>
        <p className='text-gray-600 text-sm'>
          Select all that apply. This helps us match you with the right
          opportunities.
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

      {/* Strengths Grid */}
      <div className='grid grid-cols-2 bg-neutral-100 p-3 rounded-xl gap-3 mb-8'>
        {strengthOptions.map(strength => (
          <motion.div
            key={strength}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-2 border-2 rounded-lg cursor-pointer transition-all text-center flex items-center justify-center ${
              selectedStrengths.includes(strength)
                ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
            }`}
            onClick={() => toggleStrength(strength)}
          >
            <span className='text-sm font-medium'>{strength}</span>
          </motion.div>
        ))}
      </div>

      {/* Selected count */}
      <div className='text-center mb-6'>
        <p className='text-sm text-gray-600'>
          {selectedStrengths.length} strength
          {selectedStrengths.length !== 1 ? 's' : ''} selected
        </p>
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
          disabled={selectedStrengths.length === 0}
          className='bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-full disabled:opacity-50'
        >
          Next <ArrowRight className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </motion.div>
  );
}
