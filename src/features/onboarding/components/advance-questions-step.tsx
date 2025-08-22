'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '../../../features/onboarding/contexts/onboarding-context';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const advancedQuestions = [
  {
    id: 'career_goals',
    question: 'What are your primary career goals for the next 2-3 years?',
    type: 'textarea',
    placeholder: 'e.g., Become a senior developer, start my own business, get into data science...',
  },
  {
    id: 'preferred_industries',
    question: 'Which industries interest you most?',
    type: 'select',
    options: [
      'Technology',
      'Healthcare',
      'Finance',
      'Education',
      'Marketing',
      'Design',
      'Engineering',
      'Research',
      'Non-profit',
      'Government',
      'Other',
    ],
  },
  {
    id: 'work_environment',
    question: 'What type of work environment do you prefer?',
    type: 'select',
    options: ['Remote', 'In-person', 'Hybrid', 'Flexible', 'No preference'],
  },
  {
    id: 'learning_style',
    question: 'How do you prefer to learn new skills?',
    type: 'select',
    options: [
      'Hands-on projects',
      'Online courses',
      'Mentorship',
      'Reading/Research',
      'Group workshops',
      'Self-directed learning',
    ],
  },
  {
    id: 'biggest_challenge',
    question: "What's your biggest challenge in achieving your career goals?",
    type: 'textarea',
    placeholder: 'e.g., Lack of experience, need more skills, networking, finding opportunities...',
  },
];

export function AdvancedQuestionsStep() {
  const { data, updateData, setCurrentStep, currentStep, totalSteps } = useOnboarding();
  const [answers, setAnswers] = useState<Record<string, string>>(data.advancedAnswers);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    updateData({ advancedAnswers: answers });
    setCurrentStep(6);
  };

  const handleBack = () => {
    setCurrentStep(4);
  };

  const requiredQuestions = advancedQuestions.filter((q) => q.type !== 'textarea');
  const isFormValid = requiredQuestions.every((q) => answers[q.id]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Tell us more about yourself</h2>
        <p className='text-gray-600 text-sm'>These questions help us understand your goals and preferences better.</p>
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

      {/* Questions */}
      <div className='space-y-6 mb-8'>
        {advancedQuestions.map((question, index) => (
          <div key={index}>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              {question.question}
              {question.type !== 'textarea' && <span className='text-red-500 ml-1'>*</span>}
            </label>

            {question.type === 'textarea' ? (
              <textarea
                placeholder={question.placeholder}
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className='w-full h-24 bg-gray-100 border rounded-md px-3 py-2 focus:bg-white focus:ring-2 focus:ring-cyan-500 resize-none'
              />
            ) : question.type === 'select' ? (
              <select
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className='w-full h-12 bg-gray-100 border rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-cyan-500'>
                <option value=''>Select an option</option>
                {question.options?.map((option) => (
                  <option
                    key={option}
                    value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                type='text'
                placeholder={question.placeholder}
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className='w-full h-12 bg-gray-100 border rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-cyan-500'
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className='flex justify-between'>
        <Button
          onClick={handleBack}
          variant='ghost'
          className='text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full'>
          <ArrowLeft className='w-4 h-4 mr-2' /> Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className='bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-full disabled:opacity-50'>
          Next <ArrowRight className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </motion.div>
  );
}
