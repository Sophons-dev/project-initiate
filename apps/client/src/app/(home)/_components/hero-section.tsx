'use client'

import { TextPill } from "@/components/shared/text-pill"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/animation-variants"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Calendar, ChevronDown, DollarSign, MapPin, Search, Sparkles, Users } from "lucide-react"
import { useRef } from "react"

export const HeroSection = () => {
    const { scrollYProgress } = useScroll()
    const heroRef = useRef(null)

    const heroInView = useInView(heroRef, { once: true, margin: "-100px" })

    // Parallax effects
    const yHero = useTransform(scrollYProgress, [0, 0.3], [0, -50])

    const filterOptions = [
        { icon: Search, value: "85%", label: "Profile Completion", color: "red" },
        { icon: MapPin, value: "34", label: "Matched Opportunities", color: "cyan" },
        { icon: Calendar, value: "10", label: "High Priority Matches", color: "yellow" },
        { icon: DollarSign, value: "95%", label: "Match Score", color: "purple" }
    ]
    return (
        <section ref={heroRef} className="py-16 relative mt-15">
            <motion.div style={{ y: yHero }} className="mx-auto text-center">

                {/* Hero Content */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <TextPill icon={<Sparkles className="h-4 w-4" />} text="AI-Powered Opportunity Matching" />
                    <motion.h1
                        className="text-4xl lg:text-6xl text-black font-medium mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Find Your Perfect{" "}
                        <motion.span
                            className="text-cyan-500 relative"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            Opportunity
                            <motion.div
                                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={heroInView ? { scaleX: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            />
                        </motion.span>
                    </motion.h1>
                </motion.div>

                {/* Hero Description */}
                <motion.p
                    className="text-gray-600 text-normal mb-8 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Whether you&apos;re a student seeking courses or a professional hunting for your next career move, our AI matches you with opportunities that align perfectly with your goals and profile.                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >

                    {/* Get Started Button */}
                    {/* TODO: Add gradient from top to bottom */}
                    <Button size={'lg'} className="rounded-full bg-gradient-to-b from-cyan-400 to-cyan-600 border-4 py-5 border-neutral-100 hover:bg-cyan-600 mb-12 relative overflow-hidden group">
                        <span className="relative z-10 flex items-center gap-2">
                            Start Journey
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </span>
                    </Button>
                </motion.div>

                {/* Hero section feature display */}
                <div className="border-t border-t-neutral-100 mx-auto p-15 pb-0">
                    <motion.div
                        // add inner border
                        className="container max-w-7xl border-10 border-b-0 rounded-bl-none rounded-br-none border-neutral-100 bg-[#E9E9E9]/20 p-10 rounded-2xl mx-auto"
                        initial={{ opacity: 0, y: 60, scale: 0.9 }}
                        animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-4 bg-[#E9E9E9]/30 p-3 rounded-md border-2 border-white gap-4 mb-6"
                            variants={staggerContainer}
                            animate={heroInView ? "animate" : "initial"}
                        >
                            {filterOptions.map((filter, index) => {
                                const Icon = filter.icon
                                const iconColor = {
                                    red: "bg-red-100 text-red-500",
                                    cyan: "bg-cyan-100 text-cyan-500",
                                    yellow: "bg-yellow-100 text-yellow-500",
                                    purple: "bg-purple-100 text-purple-500"
                                }

                                const textColor = {
                                    red: "text-red-500",
                                    cyan: "text-cyan-500",
                                    yellow: "text-yellow-500",
                                    purple: "text-purple-500"
                                }

                                return (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        className={`bg-white rounded p-4 flex items-start space-x-3 cursor-pointer transition-all duration-300`}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <motion.div
                                            className={`md:w-11 md:h-11 rounded-lg flex items-center justify-center ${iconColor[filter.color as keyof typeof iconColor]}`}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </motion.div>
                                        <div>
                                            <p className={`font-medium ${textColor[filter.color as keyof typeof textColor]}`}>{filter.value}</p>
                                            <p className="text-sm text-gray-500">{filter.label}</p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>

                        <motion.div
                            className="rounded-md border-2 bg-[#E9E9E9]/30 p-3 border-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="p-4 bg-white">
                                <div
                                    className="flex items-start space-x-2 mb-4"
                                >
                                    <Sparkles className="w-5 h-5 text-black" />
                                    <span className="text-normal font-medium text-black">AI Career Insights</span>
                                </div>
                                <motion.p
                                    className="text-normal text-start"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.4 }}
                                >
                                    Based on your profile, you appear to be a well-rounded individual with strong interests in arts & design and excellent analytical thinking abilities. Your goal to explore career options shows you&apos;re proactive about your career development. Consider focusing on opportunities that combine your technical interests with your interpersonal skills. I recommend starting with skill-building courses in your areas of interest while networking with professionals in your target industries.
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div >


            {/* Floating scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ChevronDown className="w-6 h-6 text-gray-400" />
            </motion.div>
        </section >
    )
}