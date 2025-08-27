import { useOnboarding } from '../contexts/onboarding-context';
import { SingleChoiceQuestion } from './question-types/single-choice-question';
import { MultiChoiceQuestion } from './question-types/multi-choice-question';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function DynamicQuestionStep() {
  const {
    data,
    updateData,
    currentStep,
    setCurrentStep,
    questions,
    totalSteps,
  } = useOnboarding();

  const questionIndex = currentStep - 3; // 1: type, 2: info, 3...n: questions
  const question = questions[questionIndex];

  const handleAnswerChange = (value: string | string[]) => {
    updateData({ answers: { ...data.answers, [question.id]: value } });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  if (!question) {
    return <div>Question not found</div>; // Or a loading state
  }

  const answer = data.answers[question.id];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
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

      {question.questionType === 'single_choice' && (
        <SingleChoiceQuestion
          question={question}
          value={answer || ''}
          onChange={handleAnswerChange}
        />
      )}

      {question.questionType === 'multi_choice' && (
        <MultiChoiceQuestion
          question={question}
          value={answer || []}
          onChange={handleAnswerChange}
        />
      )}

      {/* Add other question types here */}

      <div className='flex justify-between mt-8'>
        <Button
          onClick={handleBack}
          variant='ghost'
          className='text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full'
        >
          <ArrowLeft className='w-4 h-4 mr-2' /> Back
        </Button>
        <Button
          onClick={handleNext}
          className='bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-full disabled:opacity-50'
        >
          Next <ArrowRight className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </motion.div>
  );
}
