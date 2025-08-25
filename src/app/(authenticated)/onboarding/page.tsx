'use client';

import { CompletionStep } from '@/features/onboarding/components/completion-step';
import { TermsStep } from '@/features/onboarding/components/term-step';
import { UserInfoStep } from '@/features/onboarding/components/user-info-step';
import { UserTypeStep } from '@/features/onboarding/components/user-type-step';
import { DynamicQuestionStep } from '@/features/onboarding/components/dynamic-question-step';
import { useOnboarding } from '@/features/onboarding/contexts/onboarding-context';

export default function OnboardingPage() {
  const { currentStep, questions } = useOnboarding();

  const renderStep = () => {
    const questionSteps = questions.length;

    if (currentStep === 1) {
      return <UserTypeStep />;
    }
    if (currentStep === 2) {
      return <UserInfoStep />;
    }
    if (currentStep > 2 && currentStep <= 2 + questionSteps) {
      return <DynamicQuestionStep />;
    }
    if (currentStep === 3 + questionSteps) {
      return <TermsStep />;
    }
    if (currentStep === 4 + questionSteps) {
      return <CompletionStep />;
    }

    return <UserTypeStep />;
  };

  return renderStep();
}
