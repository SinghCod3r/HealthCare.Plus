"use client";

import { motion } from "framer-motion";
import { Activity, Heart, Droplets, Moon, TrendingUp, TrendingDown } from "lucide-react";

// Mock data for health insights
const weeklyData = [
    { day: "Mon", steps: 8500, calories: 2100, sleep: 7.5 },
    { day: "Tue", steps: 10200, calories: 2300, sleep: 8.0 },
    { day: "Wed", steps: 6800, calories: 1900, sleep: 6.5 },
    { day: "Thu", steps: 9100, calories: 2200, sleep: 7.0 },
    { day: "Fri", steps: 11000, calories: 2400, sleep: 8.5 },
    { day: "Sat", steps: 7500, calories: 2000, sleep: 9.0 },
    { day: "Sun", steps: 5200, calories: 1800, sleep: 8.0 },
];

const insights = [
    {
        title: "Great Progress!",
        description: "Your average steps increased by 15% compared to last week.",
        type: "positive",
        icon: TrendingUp,
    },
    {
        title: "Hydration Reminder",
        description: "You're averaging 6 glasses per day. Try to hit 8 for optimal health.",
        type: "warning",
        icon: Droplets,
    },
    {
        title: "Sleep Pattern",
        description: "Your sleep quality has improved. Average: 7.8 hours.",
        type: "positive",
        icon: Moon,
    },
];

function SimpleBarChart({ data, dataKey, color }: { data: typeof weeklyData; dataKey: string; color: string }) {
    const maxValue = Math.max(...data.map((d) => d[dataKey as keyof typeof d] as number));

    return (
        <div className="flex items-end justify-between h-32 gap-2">
            {data.map((item, i) => {
                const value = item[dataKey as keyof typeof item] as number;
                const height = (value / maxValue) * 100;
                return (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className={`w-full rounded-t-lg ${color}`}
                            style={{ minHeight: 4 }}
                        />
                        <span className="text-xs text-slate-500 dark:text-slate-400">{item.day}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default function HealthInsights() {
    const averageSteps = Math.round(weeklyData.reduce((acc, d) => acc + d.steps, 0) / 7);
    const averageSleep = (weeklyData.reduce((acc, d) => acc + d.sleep, 0) / 7).toFixed(1);
    const totalCalories = weeklyData.reduce((acc, d) => acc + d.calories, 0);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Health Insights</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Your weekly health analysis and AI-powered recommendations</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/20 rounded-xl">
                            <Activity className="h-6 w-6" />
                        </div>
                        <span className="font-medium">Avg. Daily Steps</span>
                    </div>
                    <p className="text-4xl font-bold">{averageSteps.toLocaleString()}</p>
                    <p className="text-cyan-100 text-sm mt-2 flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" /> +15% from last week
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/20 rounded-xl">
                            <Moon className="h-6 w-6" />
                        </div>
                        <span className="font-medium">Avg. Sleep</span>
                    </div>
                    <p className="text-4xl font-bold">{averageSleep} hrs</p>
                    <p className="text-purple-100 text-sm mt-2 flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" /> +8% improvement
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/20 rounded-xl">
                            <Heart className="h-6 w-6" />
                        </div>
                        <span className="font-medium">Weekly Calories</span>
                    </div>
                    <p className="text-4xl font-bold">{totalCalories.toLocaleString()}</p>
                    <p className="text-rose-100 text-sm mt-2 flex items-center gap-1">
                        <TrendingDown className="h-4 w-4" /> On target
                    </p>
                </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700"
                >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Weekly Steps</h3>
                    <SimpleBarChart data={weeklyData} dataKey="steps" color="bg-cyan-500" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700"
                >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Sleep Hours</h3>
                    <SimpleBarChart data={weeklyData} dataKey="sleep" color="bg-purple-500" />
                </motion.div>
            </div>

            {/* AI Insights */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl"
            >
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="text-xl">🤖</span> AI Health Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {insights.map((insight, i) => (
                        <div
                            key={i}
                            className={`p-4 rounded-xl ${insight.type === "positive"
                                    ? "bg-emerald-500/20 border border-emerald-500/30"
                                    : "bg-amber-500/20 border border-amber-500/30"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <insight.icon className={`h-5 w-5 ${insight.type === "positive" ? "text-emerald-400" : "text-amber-400"
                                    }`} />
                                <span className="font-semibold">{insight.title}</span>
                            </div>
                            <p className="text-sm text-slate-300">{insight.description}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
