'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

export const Navbar = () => {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-b border-gray-100 px-4 lg:px-6 h-16 flex items-center sticky top-0 bg-white/80 backdrop-blur-md z-50"
        >
            <div className="container mx-auto flex items-center justify-between">
                <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-white font-bold text-sm">I</span>
                    </motion.div>
                    <span className="font-semibold text-xl">Initiate</span>
                </motion.div>

                <nav className="hidden md:flex items-center space-x-8">
                    {["Home", "How it Works", "For Students", "For Professionals"].map((item, index) => (
                        <motion.div key={item}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                        >
                            <Link
                                href="#"
                                className="text-gray-600 hover:text-gray-900 relative group"
                            >
                                {item}

                            </Link>
                        </motion.div>
                    ))}
                </nav>

                <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="ghost" className="hidden md:inline-flex">Sign In</Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-orange-500 hover:bg-orange-600 relative overflow-hidden group">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <span className="relative z-10">Get Started</span>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.header>
    );
}