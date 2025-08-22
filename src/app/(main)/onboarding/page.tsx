'use client';

import { UserTypeStep } from '../../../features/onboarding/components/user-type-step';
import { UserInfoStep } from '../../../features/onboarding/components/user-info-step';
import { StrengthsStep } from '../../../features/onboarding/components/strengths-step';
import { AdvancedQuestionsOptIn } from '../../../features/onboarding/components/advanced-questions-opt-in';
import { AdvancedQuestionsStep } from '../../../features/onboarding/components/advance-questions-step';
import { TermsStep } from '../../../features/onboarding/components/term-step';
import { CompletionStep } from '../../../features/onboarding/components/completion-step';
import { useOnboarding } from '@/features/onboarding/contexts/onboarding-context';

export default function OnboardingPage() {
  const { currentStep } = useOnboarding();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UserTypeStep />;
      case 2:
        return <UserInfoStep />;
      case 3:
        return <StrengthsStep />;
      case 4:
        return <AdvancedQuestionsOptIn />;
      case 5:
        return <AdvancedQuestionsStep />;
      case 6:
        return <TermsStep />;
      case 7:
        return <CompletionStep />;
      default:
        return <UserTypeStep />;
    }
  };

  return renderStep();
}
