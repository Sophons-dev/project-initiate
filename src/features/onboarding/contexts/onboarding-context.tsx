'use client';

import { Question, UserType } from '@/features/onboarding/types';
import { createContext, useContext, useState } from 'react';
import { getQuestionsByUserType } from '../actions';
import { OnboardingUserParams } from '../types';
import { useProgress } from '@bprogress/next';
import { toast } from 'sonner';

interface OnboardingContextType {
  data: OnboardingUserParams;
  updateData: (updates: Partial<OnboardingUserParams>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  questions: Question[];
  fetchQuestions: (userType: UserType) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { start, stop } = useProgress();
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [data, setData] = useState<OnboardingUserParams>({
    userType: 'student',
    fullName: '',
    contactInfo: '',
    dateOfBirth: '',
    gender: '',
    gradeLevel: '',
    school: '',
    location: '',
    interests: [],
    answers: {},
    wantsAdvancedQuestions: false,
    agreedToTerms: false,
  });
  console.log(data);

  const fetchQuestions = async (userType: UserType) => {
    start();

    try {
      const questions = await getQuestionsByUserType(userType);

      if (!questions.success) {
        throw new Error('Failed to fetch questions');
      }

      setQuestions(questions?.data ?? []);
    } catch (error) {
      console.error('Error fetching questions:', error);

      toast.error(`Error fetching questions: ${error}`);

      setQuestions([]);
    } finally {
      stop();
    }
  };

  const updateData = (updates: Partial<OnboardingUserParams>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  // 2 fixed steps (UserInfo1, UserInfo2) + dynamic questions + 2 fixed steps (Terms, Completion)
  const totalSteps = 3 + questions.length; // UserType, UserInfo1, UserInfo2, Questions, Terms, Completion

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
