"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useOnboarding } from "../../context/onboarding-context"
import { ArrowLeft, ArrowRight, Shield, FileText } from "lucide-react"

export function TermsStep() {
    const { data, updateData, setCurrentStep, currentStep, totalSteps } = useOnboarding()
    const [agreedToTerms, setAgreedToTerms] = useState(data.agreedToTerms)

    const handleNext = () => {
        updateData({ agreedToTerms })
        setCurrentStep(7)
    }

    const handleBack = () => {
        if (data.wantsAdvancedQuestions) {
            setCurrentStep(5)
        } else {
            setCurrentStep(4)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-[500px]">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy & Terms of Use</h2>
                <p className="text-gray-600 text-sm">Please review and accept our terms to continue.</p>
            </div>

            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                        Step {currentStep} of {totalSteps}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            {/* Terms Content */}
            <div className="h-[500px] p-3 text-sm rounded-xl overflow-y-auto bg-gray-100 mb-8 border">
                <p>Last updated: 2025-08-13</p>
                <p className="mb-3">We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our services.</p>

                <ol className="list-decimal list-inside flex flex-col space-y-4">
                    <span >
                        <li className="text-black">Information We Collect</li>
                        We collect the following types of information during onboarding and usage:
                        <ul className="list-disc px-7">
                            <li>Personal Information - such as your name, email, age, and location</li>
                            <li>Career and Academic Preferences - including interests, goals, current education or job level, and fields of interest.</li>
                            <li>Cookie Data</li>
                        </ul>
                    </span>

                    <span>
                        <li className="text-black">How We Use Your Data</li>
                        We use your information to:
                        <ul className="px-3.5">
                            <li className="list-inside list-disc">Recommend jobs, schools, courses, organizations, and other opportunities tailored to your interest.</li>
                            <li className="list-inside list-disc">Improve our matching algorithms and user experience</li>
                            <li className="list-inside list-disc">Contact you with updates, helpful resources, or platform announcements (only if you opt in)</li>
                        </ul>
                    </span>

                    <span>
                        <li className="text-black">Data Sharing</li>
                        We may share your information with third parties for the following purposes:
                        <ul className="px-3.5">
                            <li className="list-inside list-disc">Personal Information - such as your name, email, age, and location</li>
                            <li className="list-inside list-disc">Usage Data - such as your search history, preferences, and interactions with our platform</li>
                            <li className="list-inside list-disc">Cookie Data - such as your browser type, device type, and IP address</li>
                        </ul>
                    </span>

                    <span>
                        <li className="text-black">How We Use Your Data</li>
                        We use the collected information for the following purposes:
                        <ul className="px-3.5">
                            <li className="list-inside list-disc">Personal Information</li>
                            <li className="list-inside list-disc">Usage Data</li>
                            <li className="list-inside list-disc">Cookie Data</li>
                        </ul>
                    </span>
                </ol>
            </div>

            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${agreedToTerms ? "border-cyan-500 bg-cyan-50" : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                onClick={() => setAgreedToTerms(!agreedToTerms)}
            >
                <div className="flex items-start space-x-3">
                    <div
                        className={`w-7.5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${agreedToTerms ? "border-cyan-500 bg-cyan-500" : "border-gray-300"
                            }`}
                    >
                        {agreedToTerms && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </div>
                    <div>
                        <span className="font-medium text-gray-900">I agree to the Privacy Policy and Terms of Use</span>
                        <p className="text-sm text-gray-600 mt-1">
                            By checking this box, you acknowledge that you have read and agree to our privacy policy and terms of
                            use.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between mt-5">
                <Button
                    onClick={handleBack}
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={!agreedToTerms}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-full disabled:opacity-50"
                >
                    Complete Setup <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </motion.div>
    )
}
