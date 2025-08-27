'use client';

import { Question } from '@/features/onboarding/types/question';
import { createContext, useContext, useState } from 'react';
import { UserInfoFormData } from '../validations/onboarding';
import { getQuestionsByUserType } from '../actions';

export interface OnboardingData extends UserInfoFormData {
  userType: 'student' | 'professional' | null;
  answers: Record<string, string | string[]>;
  wantsAdvancedQuestions: boolean;
  agreedToTerms: boolean;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  questions: Question[];
  fetchQuestions: (userType: 'student' | 'professional') => void;
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
    userType: null,
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

  const fetchQuestions = async (userType: 'student' | 'professional') => {
    try {
      const questions = await getQuestionsByUserType(userType);
      console.log(questions);
      setQuestions(questions?.data ?? []);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    }
  };

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  // 2 fixed steps (UserInfo1, UserInfo2) + dynamic questions + 2 fixed steps (Terms, Completion)
  const totalSteps = 5 + questions.length; // UserType, UserInfo1, UserInfo2, Questions, Terms, Completion

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
