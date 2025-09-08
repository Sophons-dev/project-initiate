'use client';

import { Question } from '@/features/onboarding/types/question';
import { motion } from 'framer-motion';

interface SingleChoiceQuestionProps {
  question: Question;
  value: string | string[];
  onChange: (value: string) => void;
}

export function SingleChoiceQuestion({ question, value, onChange }: SingleChoiceQuestionProps) {
  return (
    <div>
      <h3 className='font-semibold text-lg mb-4'>{question.text}</h3>
      <div className='space-y-2'>
        {question.options?.map(option => {
          const isSelected = value === option;

          return (
            <motion.label
              key={option}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
                isSelected ? 'bg-cyan-50 border-cyan-500' : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => onChange(option)}
            >
              {/* Custom Radio Circle */}
              <div
                className={`w-5 h-5 flex items-center justify-center border rounded-full mr-3 transition-colors ${
                  isSelected ? 'border-cyan-500' : 'border-gray-300'
                }`}
              >
                {isSelected && (
                  <motion.div
                    className='w-3 h-3 bg-cyan-500 rounded-full'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  />
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
