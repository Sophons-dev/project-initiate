'use client';

import {
  studentOnboardingQuestions,
  professionalOnboardingQuestions,
} from '@/lib/mock-data/onboarding-questions';
import { Question } from '@/features/onboarding/types/question';
import { createContext, useContext, useState } from 'react';

export interface OnboardingData {
  role: 'student' | 'professional' | null;
  age: string;
  gender: string;
  gradeLevel: string;
  school: string;
  location: string;
  answers: Record<string, string | string[]>;
  wantsAdvancedQuestions: boolean; // This can be repurposed or removed
  agreedToTerms: boolean;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  questions: Question[];
  fetchQuestions: (role: 'student' | 'professional') => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [data, setData] = useState<OnboardingData>({
    role: null,
    age: '',
    gender: '',
    gradeLevel: '',
    school: '',
    location: '',
    answers: {},
    wantsAdvancedQuestions: false,
    agreedToTerms: false,
  });

  const fetchQuestions = (role: 'student' | 'professional') => {
    if (role === 'student') {
      setQuestions(studentOnboardingQuestions);
    } else {
      setQuestions(professionalOnboardingQuestions);
    }
  };

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  // 2 fixed steps (UserInfo, Terms) + dynamic questions
  const totalSteps = 4 + questions.length; // UserType, UserInfo, Questions, Terms, Completion

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
        currentStep,
        setCurrentStep,
        totalSteps,
        questions,
        fetchQuestions,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
