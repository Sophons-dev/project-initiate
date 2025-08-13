'use client';

import { useOnboarding } from "./context/onboarding-context"
import { UserTypeStep } from "./_components/steps/user-type-step"
import { UserInfoStep } from "./_components/steps/user-info-step";
import { StrengthsStep } from "./_components/steps/strengths-step";
import { AdvancedQuestionsOptIn } from "./_components/steps/advanced-questions-opt-in";
import { AdvancedQuestionsStep } from "./_components/steps/advance-questions-step";
import { TermsStep } from "./_components/steps/term-step";
import { CompletionStep } from "./_components/steps/completion-step";

export default function OnboardingPage() {
    const { currentStep } = useOnboarding()

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <UserTypeStep />
            case 2:
                return <UserInfoStep />
            case 3:
                return <StrengthsStep />
            case 4:
                return <AdvancedQuestionsOptIn />
            case 5:
                return <AdvancedQuestionsStep />
            case 6:
                return <TermsStep />
            case 7:
                return <CompletionStep />
            default:
                return <UserTypeStep />
        }
    }

    return (
        renderStep()
    )
}
