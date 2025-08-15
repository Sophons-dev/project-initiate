'use client';

import { RecommendedOpportunityCard } from "@/components/shared/cards/recommended-opportunity-card";
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const DashboardContent = () => {
    const router = useRouter()
    const [activeFilter, setActiveFilter] = useState("Show All")
    const filters = ["Show All", "Jobs", "Courses", "Events"]

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 md:px-0">
            {/* Recommended Opportunities */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">Recommended Opportunities</h2>
                        <p className="text-gray-600">Here are your AI-powered personalized recommendations.</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} className="text-cyan-500 hover:text-cyan-600 font-medium">
                        View All →
                    </motion.button>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center space-x-6 mb-8 border-b border-gray-200">
                    {filters.map((filter) => (
                        <motion.button
                            key={filter}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveFilter(filter)}
                            className={`pb-3 px-1 border-b-2 transition-colors ${activeFilter === filter
                                ? "border-cyan-500 text-cyan-600 font-medium"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            {filter}
                        </motion.button>
                    ))}
                </div>

                {/* Opportunities Grid */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3.5 bg-[#E9E9E9]/50 rounded">
                    <RecommendedOpportunityCard />
                </div>

            </motion.div>
        </div>
    )
}