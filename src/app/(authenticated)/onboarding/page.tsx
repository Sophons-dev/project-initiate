'use client';

import {
  CompletionStep,
  FinalizingStep,
  TermsStep,
  UserTypeStep,
  DynamicQuestionStep,
  UserInfo1Step,
  UserInfo2Step,
} from '@/features/onboarding/components';
import { useOnboarding } from '@/features/onboarding/contexts';

export default function OnboardingPage() {
  const { currentStep, questions, isFinalizing } = useOnboarding();

  // If we're in finalizing state, always show the finalizing step
  if (isFinalizing) {
    return <FinalizingStep />;
  }

  const renderStep = () => {
    const questionSteps = questions.length;
    const step = currentStep;

    switch (true) {
      case step === 1:
        return <UserTypeStep />;
      case step === 2:
        return <UserInfo1Step />;
      case step === 3:
        return <UserInfo2Step />;
      case step > 3 && step < 3 + questionSteps:
        return <DynamicQuestionStep />;
      case step === 3 + questionSteps:
        return <TermsStep />;
      case step === 4 + questionSteps:
        return <CompletionStep />;
      default:
        return <UserTypeStep />;
    }
  };

  return renderStep();
}
