'use client';

import type React from 'react';
import { createContext, useContext, useState } from 'react';

export interface OnboardingData {
  role: 'student' | 'professional' | null;
  age: string;
  gender: string;
  gradeLevel: string;
  school: string;
  location: string;
  strengths: string[];
  wantsAdvancedQuestions: boolean;
  advancedAnswers: Record<string, string>;
  agreedToTerms: boolean;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
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
  const totalSteps = 7;

  const [data, setData] = useState<OnboardingData>({
    role: null,
    age: '',
    gender: '',
    gradeLevel: '',
    school: '',
    location: '',
    strengths: [],
    wantsAdvancedQuestions: false,
    advancedAnswers: {},
    agreedToTerms: false,
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  return (
    <OnboardingContext.Provider
      value={{ data, updateData, currentStep, setCurrentStep, totalSteps }}
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
