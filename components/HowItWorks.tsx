"use client";

import { motion } from "framer-motion";
import { UserPlus, Settings, TrendingUp } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: UserPlus,
        title: "Create Your Profile",
        description: "Sign up in seconds and set up your health profile with your goals, conditions, and preferences.",
        color: "cyan",
    },
    {
        number: "02",
        icon: Settings,
        title: "Set Up Reminders",
        description: "Add medications, appointments, and wellness activities. Our AI optimizes timing for you.",
        color: "blue",
    },
    {
        number: "03",
        icon: TrendingUp,
        title: "Track & Improve",
        description: "Monitor your progress with beautiful visualizations and receive personalized health insights.",
        color: "purple",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 text-sm font-semibold mb-4">
                        How It Works
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        Get started in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
                            3 simple steps
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Begin your personalized health journey today. It only takes a few minutes to set up.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20" />
                            )}

                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 relative">
                                {/* Number badge */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {step.number}
                                </div>

                                <div className="pt-4">
                                    <div className={`inline-flex p-4 rounded-2xl bg-${step.color}-100 dark:bg-${step.color}-900/30 mb-6`}>
                                        <step.icon className={`h-8 w-8 text-${step.color}-600 dark:text-${step.color}-400`} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
