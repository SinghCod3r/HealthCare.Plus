"use client";

import { useSession } from "next-auth/react";
import { Activity, Droplets, Pill, Moon, Heart, TrendingUp, Plus, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function HealthCard({ title, value, unit, icon: Icon, color, delay, trend }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group cursor-pointer"
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                        <TrendingUp className="h-4 w-4" />
                        <span>{trend}%</span>
                    </div>
                )}
            </div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">{title}</h3>
            <div className="flex items-baseline mt-2 gap-1">
                <span className="text-3xl font-bold text-slate-900">{value}</span>
                <span className="text-sm text-slate-400 font-medium">{unit}</span>
            </div>
        </motion.div>
    );
}

export default function Dashboard() {
    const { data: session } = useSession();
    const firstName = session?.user?.name?.split(" ")[0] || "User";

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">
                        {getGreeting()}, {firstName}!
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Here's your daily health overview.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notifications
                    </button>
                    <Link
                        href="/dashboard/reminders"
                        className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        Add Reminder
                    </Link>
                </div>
            </div>

            {/* Health Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthCard
                    title="Heart Rate"
                    value="72"
                    unit="BPM"
                    icon={Heart}
                    color="bg-gradient-to-br from-red-500 to-pink-500"
                    delay={0.1}
                    trend={2}
                />
                <HealthCard
                    title="Sleep"
                    value="7.5"
                    unit="Hrs"
                    icon={Moon}
                    color="bg-gradient-to-br from-indigo-500 to-purple-500"
                    delay={0.2}
                    trend={5}
                />
                <HealthCard
                    title="Water Intake"
                    value="1.8"
                    unit="L / 2.5L"
                    icon={Droplets}
                    color="bg-gradient-to-br from-blue-500 to-cyan-500"
                    delay={0.3}
                />
                <HealthCard
                    title="Steps"
                    value="8,432"
                    unit="/ 10k"
                    icon={Activity}
                    color="bg-gradient-to-br from-emerald-500 to-teal-500"
                    delay={0.4}
                    trend={12}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Reminders & Activity */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Today's Reminders */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-slate-900">Today's Reminders</h2>
                            <Link href="/dashboard/reminders" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
                                View All →
                            </Link>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                            {[
                                { title: "Take Vitamin D", time: "09:00 AM", type: "Medicine", color: "bg-orange-100 text-orange-700", icon: Pill },
                                { title: "Drink Water (500ml)", time: "10:30 AM", type: "Hydration", color: "bg-blue-100 text-blue-700", icon: Droplets },
                                { title: "Evening Run", time: "06:00 PM", type: "Exercise", color: "bg-emerald-100 text-emerald-700", icon: Activity },
                            ].map((reminder, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100 cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-lg ${reminder.color} group-hover:scale-110 transition-transform`}>
                                            <reminder.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{reminder.title}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{reminder.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-slate-600">{reminder.time}</span>
                                    </div>
                                </motion.div>
                            ))}

                            {[
                                { title: "Take Vitamin D", time: "09:00 AM", type: "Medicine", color: "bg-orange-100 text-orange-700", icon: Pill, completed: true },
                                { title: "Morning Water", time: "07:00 AM", type: "Hydration", color: "bg-blue-100 text-blue-700", icon: Droplets, completed: true },
                            ].map((reminder, i) => (
                                <div
                                    key={`completed-${i}`}
                                    className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl opacity-50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-lg bg-slate-200`}>
                                            <reminder.icon className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-500 line-through">{reminder.title}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">Completed</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl"
                    >
                        <h3 className="text-lg font-semibold mb-4">This Week's Progress</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-cyan-100 text-sm">Reminders</p>
                                <p className="text-3xl font-bold mt-1">18/20</p>
                            </div>
                            <div>
                                <p className="text-cyan-100 text-sm">Workouts</p>
                                <p className="text-3xl font-bold mt-1">5/7</p>
                            </div>
                            <div>
                                <p className="text-cyan-100 text-sm">Water Goal</p>
                                <p className="text-3xl font-bold mt-1">86%</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Insights & Tips */}
                <div className="space-y-6">

                    {/* Health Tip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-md border border-white/10 mb-3">
                                💡 Daily Tip
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Focus: Lower Back</h3>
                            <p className="text-slate-300 text-sm mb-4">
                                You've been sitting for 4+ hours. Try these stretches to avoid pain.
                            </p>
                            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors backdrop-blur-md border border-white/10">
                                View Exercises
                            </button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
                    >
                        <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                href="/dashboard/body-status"
                                className="block p-3 bg-slate-50 hover:bg-cyan-50 rounded-xl transition-colors group"
                            >
                                <p className="font-medium text-slate-700 group-hover:text-cyan-700">View Body Status</p>
                                <p className="text-xs text-slate-500 mt-1">Check your vital signs</p>
                            </Link>
                            <Link
                                href="/dashboard/reminders"
                                className="block p-3 bg-slate-50 hover:bg-cyan-50 rounded-xl transition-colors group"
                            >
                                <p className="font-medium text-slate-700 group-hover:text-cyan-700">Manage Reminders</p>
                                <p className="text-xs text-slate-500 mt-1">Add or edit your reminders</p>
                            </Link>
                            <Link
                                href="/dashboard/profile"
                                className="block p-3 bg-slate-50 hover:bg-cyan-50 rounded-xl transition-colors group"
                            >
                                <p className="font-medium text-slate-700 group-hover:text-cyan-700">Update Profile</p>
                                <p className="text-xs text-slate-500 mt-1">Manage health information</p>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
