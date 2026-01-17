"use client";

import { motion } from "framer-motion";
import {
    Bell,
    HeartPulse,
    Activity,
    Shield,
    Sparkles,
    Smartphone
} from "lucide-react";

const features = [
    {
        icon: Bell,
        title: "Smart Reminders",
        description: "Never miss a medication or appointment with AI-powered reminders that adapt to your schedule.",
        color: "from-cyan-500 to-blue-500",
    },
    {
        icon: HeartPulse,
        title: "Health Tracking",
        description: "Monitor vitals, sleep patterns, and activity levels with beautiful visualizations.",
        color: "from-rose-500 to-pink-500",
    },
    {
        icon: Activity,
        title: "Body Analysis",
        description: "Interactive body status visualization shows your health metrics at a glance.",
        color: "from-emerald-500 to-teal-500",
    },
    {
        icon: Shield,
        title: "Preventive Care",
        description: "Get personalized recommendations to prevent health issues before they arise.",
        color: "from-purple-500 to-indigo-500",
    },
    {
        icon: Sparkles,
        title: "AI Insights",
        description: "Machine learning analyzes your data to provide actionable health insights.",
        color: "from-amber-500 to-orange-500",
    },
    {
        icon: Smartphone,
        title: "Cross-Platform",
        description: "Access your health data anywhere with our responsive web and mobile apps.",
        color: "from-blue-500 to-cyan-500",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-100/50 dark:from-cyan-900/20 to-transparent rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 text-sm font-semibold mb-4">
                        Features
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        Everything you need for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                            better health
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Our comprehensive platform combines cutting-edge technology with intuitive design to help you take control of your wellness journey.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-cyan-200 dark:hover:border-cyan-800 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
                        >
                            <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
