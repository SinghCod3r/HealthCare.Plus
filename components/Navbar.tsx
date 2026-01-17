"use client";

import Link from "next/link";
import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-white/50 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="bg-gradient-to-tr from-cyan-400 to-blue-500 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                            HealthCare<span className="text-cyan-600 dark:text-cyan-400">Plus</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {["Features", "How it Works", "Testimonials"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                                className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                        <ThemeToggle />
                        <Link
                            href="/signin"
                            className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-slate-900 dark:bg-cyan-500 text-white px-5 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-slate-800 dark:hover:bg-cyan-400 transition-all transform hover:-translate-y-0.5"
                        >
                            Get Started
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {["Features", "How it Works", "Testimonials"].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <div className="pt-4 flex flex-col gap-3">
                                <Link
                                    href="/signin"
                                    className="block w-full text-center py-2 text-slate-600 dark:text-slate-300 font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="block w-full text-center bg-cyan-500 text-white py-3 rounded-xl font-medium shadow-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
