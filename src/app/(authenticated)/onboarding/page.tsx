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
    const step = currentStep;

    console.log(questions);
    console.log(questionSteps);

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
