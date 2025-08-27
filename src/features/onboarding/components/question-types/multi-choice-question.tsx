'use client';

import { Question } from '@/features/onboarding/types/question';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface MultiChoiceQuestionProps {
  question: Question;
  value: string | string[];
  onChange: (value: string[]) => void;
}

export function MultiChoiceQuestion({
  question,
  value,
  onChange,
}: MultiChoiceQuestionProps) {
  const handleCheckboxChange = (option: string) => {
    const newValue = [...value];
    const index = newValue.indexOf(option);

    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(option);
    }

    onChange(newValue);
  };

  return (
    <div>
      <h3 className='font-semibold text-lg mb-4'>{question.questionText}</h3>
      <div className='space-y-2'>
        {question.options?.map(option => {
          const isChecked = value.includes(option);

          return (
            <motion.label
              key={option}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
                isChecked
                  ? 'bg-cyan-50 border-cyan-500'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => handleCheckboxChange(option)}
            >
              <div
                className={`w-5 h-5 flex items-center justify-center border rounded-sm mr-3 transition-colors ${
                  isChecked ? 'bg-cyan-500 border-cyan-500' : 'border-gray-300'
                }`}
              >
                {isChecked && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check className='w-4 h-4 text-white' />
                  </motion.span>
                )}
              </div>
              <span className='text-gray-800'>{option}</span>
            </motion.label>
          );
        })}
      </div>
    </div>
  );
}
