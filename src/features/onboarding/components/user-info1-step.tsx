'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../contexts/onboarding-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userInfoSchema, UserInfoFormData } from '../validations/onboarding';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function UserInfo1Step() {
  const { data, updateData, setCurrentStep, currentStep, totalSteps } =
    useOnboarding();

  const form = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      fullName: data.fullName || '',
      contactInfo: data.contactInfo || '',
      dateOfBirth: data.dateOfBirth || '',
      gender: data.gender || '',
      gradeLevel: data.gradeLevel || '',
      school: data.school || '',
      location: data.location || '',
      interests: data.interests || '',
    },
  });

  const handleNext = (formData: UserInfoFormData) => {
    updateData(formData);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          User Information
        </h2>
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNext)}
          className='space-y-6 mb-8'
        >
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter your full name'
                    className='w-full h-12 bg-gray-100 border-1 focus:bg-white focus:ring-2 focus:ring-cyan-500'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='dateOfBirth'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    type='date'
                    className='w-full h-12 bg-gray-100 border-1 focus:bg-white focus:ring-2 focus:ring-cyan-500 [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer'
                    max={new Date().toISOString().split('T')[0]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <select
                    className='w-full h-12 bg-gray-100 border-1 rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-cyan-500'
                    {...field}
                  >
                    <option value=''>Select gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='non-binary'>Non-binary</option>
                    <option value='prefer-not-to-say'>Prefer not to say</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-between pt-4'>
            <Button
              type='button'
              size={'lg'}
              onClick={handleBack}
              variant='ghost'
              className='text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full'
            >
              <ArrowLeft className='w-4 h-4 mr-2' /> Back
            </Button>
            <Button
              type='submit'
              size={'lg'}
              onClick={() => handleNext(form.getValues())}
              className='bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-full'
            >
              Next <ArrowRight className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
