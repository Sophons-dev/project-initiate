'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../../context/onboarding-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function UserInfoStep() {
  const { data, updateData, setCurrentStep, currentStep, totalSteps } = useOnboarding();
  const [formData, setFormData] = useState({
    age: data.age,
    gender: data.gender,
    gradeLevel: data.gradeLevel,
    school: data.school,
    location: data.location,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateData(formData);
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const isFormValid = formData.age && formData.gender && formData.location;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>User Information</h2>
        <p className='text-gray-600 text-sm'>Please fill up the fields below</p>
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

      {/* Form */}
      <div className='space-y-6 mb-8'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Age</label>
          <Input
            type='number'
            placeholder='Enter your age'
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className='w-full h-12 bg-gray-100 border-1 focus:bg-white focus:ring-2 focus:ring-cyan-500'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className='w-full h-12 bg-gray-100 border-1 rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-cyan-500'>
            <option value=''>Select gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='non-binary'>Non-binary</option>
            <option value='prefer-not-to-say'>Prefer not to say</option>
          </select>
        </div>

        {data.userType === 'student' && (
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Grade Level</label>
            <select
              value={formData.gradeLevel}
              onChange={(e) => handleInputChange('gradeLevel', e.target.value)}
              className='w-full h-12 bg-gray-100 border-1 rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-cyan-500'>
              <option value=''>Select grade level</option>
              <option value='high-school'>High School</option>
              <option value='undergraduate'>Undergraduate</option>
              <option value='graduate'>Graduate</option>
              <option value='postgraduate'>Postgraduate</option>
            </select>
          </div>
        )}

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            {data.userType === 'student' ? 'School' : 'Company/Organization'}
          </label>
          <Input
            type='text'
            placeholder={data.userType === 'student' ? 'Enter your school' : 'Enter your company'}
            value={formData.school}
            onChange={(e) => handleInputChange('school', e.target.value)}
            className='w-full h-12 bg-gray-100 border-1 focus:bg-white focus:ring-2 focus:ring-cyan-500'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Location</label>
          <Input
            type='text'
            placeholder='Enter your location'
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className='w-full h-12 bg-gray-100 border-1 focus:bg-white focus:ring-2 focus:ring-cyan-500'
          />
        </div>
      </div>

      {/* Navigation */}
      <div className='flex justify-between'>
        <Button
          size={'lg'}
          onClick={handleBack}
          variant='ghost'
          className='text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full'>
          <ArrowLeft className='w-4 h-4 mr-2' /> Back
        </Button>
        <Button
          size={'lg'}
          onClick={handleNext}
          disabled={!isFormValid}
          className='bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-full disabled:opacity-50'>
          Next <ArrowRight className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </motion.div>
  );
}
