'use client';

import { CompletionStep } from '@/features/onboarding/components/completion-step';
import { TermsStep } from '@/features/onboarding/components/term-step';
import { UserTypeStep } from '@/features/onboarding/components/user-type-step';
import { DynamicQuestionStep } from '@/features/onboarding/components/dynamic-question-step';
import { useOnboarding } from '@/features/onboarding/contexts/onboarding-context';
import { UserInfo1Step } from '@/features/onboarding/components/user-info1-step';
import { UserInfo2Step } from '@/features/onboarding/components/user-info2-step';

export default function OnboardingPage() {
  const { currentStep, questions } = useOnboarding();

  const renderStep = () => {
    const questionSteps = questions.length;

    if (currentStep === 1) {
      return <UserTypeStep />;
    }
    if (currentStep === 2) {
      return <UserInfo1Step />;
    }
    if (currentStep === 3) {
      return <UserInfo2Step />;
    }
    if (currentStep > 3 && currentStep < 3 + questionSteps) {
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
