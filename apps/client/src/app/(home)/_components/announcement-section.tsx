'use client'

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animation-variants"
import EventsCarousel from "./events-carousel"
import { Sparkles } from "lucide-react"
import { TextPill } from "@/components/shared/text-pill"

export const AnnouncementSection = () => {
    return (
        <section className="-12">
            <div className="container max-w-7xl mx-auto py-30">
                <motion.div
                    className="mb-15 text-center"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <TextPill
                        className="mx-auto mb-8 mt-0 !text-xs"
                        icon={<Sparkles className="w-4 h-4" />}
                        text="Announcements"
                    />
                    <h3 className="mt-3 text-xl text-black">Upcoming Events</h3>
                    <p className="mx-auto mt-1 max-w-2xl text-sm text-muted-foreground">
                        Explore our latest events, workshops, and webinars designed to inspire, inform, and bring our community together. Be the first to know what’s happening next.
                    </p>
                </motion.div>

                <EventsCarousel
                    items={[
                        {
                            id: "poster-1",
                            title: "Careers of the Future Today",
                            date: "October 17-19, 2025",
                            location: "Megatrade Hall I",
                            focus: "Career and Education",
                            badge: "Highlight",
                            image: "/landing-page/event-1.png",
                        },
                        {
                            id: "poster-2",
                            title: "AI x Careers Workshop",
                            date: "Nov 02, 2025",
                            location: "Online",
                            focus: "Career and Education",
                            badge: "Workshop",
                            image: "/placeholder.svg",
                        },
                        {
                            id: "poster-3",
                            title: "University Career Fair",
                            date: "Dec 05, 2025",
                            location: "Campus Hall A",
                            focus: "Career and Education",
                            badge: "Fair",
                            image: "/placeholder.svg",
                        },
                        {
                            id: "poster-4",
                            title: "AI x Careers Workshop",
                            date: "Nov 02, 2025",
                            location: "Online",
                            focus: "Career and Education",
                            badge: "Workshop",
                            image: "/placeholder.svg",
                        },
                    ]}
                />
            </div>
        </section>
    )
}