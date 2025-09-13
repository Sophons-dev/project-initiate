'use client';

import { Question, UserType } from '@/features/onboarding/types';
import { createContext, useContext, useState, useEffect } from 'react';
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
  clearOnboardingData: () => void;
  isClient: boolean;
  isFinalizing: boolean;
  setIsFinalizing: (finalizing: boolean) => void;
}

// LocalStorage keys
const ONBOARDING_DATA_KEY = 'onboarding_data';
const ONBOARDING_STEP_KEY = 'onboarding_current_step';
const ONBOARDING_QUESTIONS_KEY = 'onboarding_questions';
const ONBOARDING_FINALIZING_KEY = 'onboarding_finalizing';

// Utility functions for localStorage
const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }
};

const loadFromLocalStorage = (key: string, defaultValue: any = null) => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  }
  return defaultValue;
};

const clearLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const { start, stop } = useProgress();

  // Track if we're on the client side to prevent hydration mismatches
  const [isClient, setIsClient] = useState(false);

  // Initialize with default values to match server-side rendering
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isFinalizing, setIsFinalizing] = useState(false);
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

  // Load data from localStorage only on client side after hydration
  useEffect(() => {
    setIsClient(true);

    // Load saved data from localStorage
    const savedStep = loadFromLocalStorage(ONBOARDING_STEP_KEY, 1);
    const savedQuestions = loadFromLocalStorage(ONBOARDING_QUESTIONS_KEY, []);
    const savedFinalizing = loadFromLocalStorage(ONBOARDING_FINALIZING_KEY, false);
    const savedData = loadFromLocalStorage(ONBOARDING_DATA_KEY, {
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

    // Only update state if we have saved data
    if (savedStep !== 1) {
      setCurrentStep(savedStep);
    }
    if (savedQuestions.length > 0) {
      setQuestions(savedQuestions);
    }
    if (savedFinalizing) {
      setIsFinalizing(savedFinalizing);
    }
    if (
      savedData.fullName ||
      savedData.contactInfo ||
      savedData.dateOfBirth ||
      savedData.gender ||
      savedData.gradeLevel ||
      savedData.school ||
      savedData.location ||
      savedData.interests.length > 0 ||
      Object.keys(savedData.answers).length > 0 ||
      savedData.wantsAdvancedQuestions ||
      savedData.agreedToTerms
    ) {
      setData(savedData);
    }
  }, []);

  // Save to localStorage whenever data changes (only on client side)
  useEffect(() => {
    if (isClient) {
      saveToLocalStorage(ONBOARDING_DATA_KEY, data);
    }
  }, [data, isClient]);

  // Save to localStorage whenever currentStep changes (only on client side)
  useEffect(() => {
    if (isClient) {
      saveToLocalStorage(ONBOARDING_STEP_KEY, currentStep);
    }
  }, [currentStep, isClient]);

  // Save to localStorage whenever questions change (only on client side)
  useEffect(() => {
    if (isClient) {
      saveToLocalStorage(ONBOARDING_QUESTIONS_KEY, questions);
    }
  }, [questions, isClient]);

  // Save to localStorage whenever finalizing state changes (only on client side)
  useEffect(() => {
    if (isClient) {
      saveToLocalStorage(ONBOARDING_FINALIZING_KEY, isFinalizing);
    }
  }, [isFinalizing, isClient]);

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

  const clearOnboardingData = () => {
    clearLocalStorage(ONBOARDING_DATA_KEY);
    clearLocalStorage(ONBOARDING_STEP_KEY);
    clearLocalStorage(ONBOARDING_QUESTIONS_KEY);
    clearLocalStorage(ONBOARDING_FINALIZING_KEY);
    setCurrentStep(1);
    setQuestions([]);
    setIsFinalizing(false);
    setData({
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
        clearOnboardingData,
        isClient,
        isFinalizing,
        setIsFinalizing,
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
