"use client";

import { useState } from "react";
import { Activity, Heart, Droplets, Brain, Zap, Moon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

type HealthMetric = {
    name: string;
    value: number;
    unit: string;
    status: "good" | "warning" | "neutral";
    change: number;
    icon: React.ElementType;
    color: string;
};

// Animated body part indicator
function BodyIndicator({
    x, y, label, status, delay
}: {
    x: number;
    y: number;
    label: string;
    status: "good" | "warning";
    delay: number;
}) {
    const color = status === "good" ? "#10b981" : "#f59e0b";

    return (
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, type: "spring" }}
        >
            {/* Pulse ring */}
            <motion.circle
                cx={x}
                cy={y}
                r={18}
                fill="none"
                stroke={color}
                strokeWidth={2}
                initial={{ r: 8, opacity: 1 }}
                animate={{ r: 20, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay }}
            />
            {/* Core dot */}
            <circle cx={x} cy={y} r={8} fill={color} />
            <circle cx={x} cy={y} r={4} fill="white" />

            {/* Label */}
            <rect x={x + 15} y={y - 10} width={70} height={20} rx={4} fill="rgba(0,0,0,0.7)" />
            <text x={x + 20} y={y + 4} fill="white" fontSize={10} fontWeight="bold">{label}</text>
        </motion.g>
    );
}

export default function BodyStatusPage() {
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);

    const metrics: HealthMetric[] = [
        { name: "Heart Rate", value: 72, unit: "BPM", status: "good", change: 2, icon: Heart, color: "from-rose-500 to-red-600" },
        { name: "Hydration", value: 85, unit: "%", status: "good", change: 5, icon: Droplets, color: "from-blue-500 to-cyan-500" },
        { name: "Mental Focus", value: 92, unit: "%", status: "good", change: 8, icon: Brain, color: "from-purple-500 to-indigo-600" },
        { name: "Energy Level", value: 78, unit: "%", status: "good", change: -3, icon: Zap, color: "from-amber-500 to-orange-500" },
        { name: "Sleep Quality", value: 88, unit: "%", status: "good", change: 4, icon: Moon, color: "from-indigo-500 to-purple-600" },
        { name: "Activity", value: 6420, unit: "steps", status: "good", change: 12, icon: Activity, color: "from-emerald-500 to-teal-500" },
    ];

    const getTrendIcon = (change: number) => {
        if (change > 0) return <TrendingUp className="h-4 w-4 text-emerald-500" />;
        if (change < 0) return <TrendingDown className="h-4 w-4 text-red-400" />;
        return <Minus className="h-4 w-4 text-slate-400" />;
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Body Status</h1>
                <p className="text-slate-500 mt-1">Real-time health monitoring & body analysis</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: 2D Body Visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-slate-700"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-white font-bold text-lg">Health Scan</h2>
                            <p className="text-cyan-400 text-xs uppercase tracking-widest">All systems nominal</p>
                        </div>
                        <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full">
                            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                LIVE
                            </span>
                        </div>
                    </div>

                    {/* SVG Body Illustration */}
                    <div className="relative flex justify-center items-center h-[450px]">
                        <svg viewBox="0 0 300 500" className="h-full w-auto">
                            {/* Glow effect */}
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                                </linearGradient>
                                <linearGradient id="outlineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#22d3ee" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>

                            {/* Body silhouette - stylized human form */}
                            <g filter="url(#glow)">
                                {/* Head */}
                                <ellipse cx="150" cy="55" rx="35" ry="40" fill="url(#bodyGradient)" stroke="url(#outlineGradient)" strokeWidth="2" />

                                {/* Neck */}
                                <rect x="140" y="90" width="20" height="25" fill="url(#bodyGradient)" />

                                {/* Torso */}
                                <path
                                    d="M100 115 Q90 150 95 220 L95 280 Q95 290 105 295 L110 295 L115 320 Q150 330 185 320 L190 295 L195 295 Q205 290 205 280 L205 220 Q210 150 200 115 Q175 105 150 110 Q125 105 100 115Z"
                                    fill="url(#bodyGradient)"
                                    stroke="url(#outlineGradient)"
                                    strokeWidth="2"
                                />

                                {/* Left Arm */}
                                <path
                                    d="M100 120 Q70 140 60 200 Q55 240 65 280 Q68 295 75 300 Q82 295 80 280 Q78 240 85 200 Q90 160 95 140"
                                    fill="url(#bodyGradient)"
                                    stroke="url(#outlineGradient)"
                                    strokeWidth="2"
                                />

                                {/* Right Arm */}
                                <path
                                    d="M200 120 Q230 140 240 200 Q245 240 235 280 Q232 295 225 300 Q218 295 220 280 Q222 240 215 200 Q210 160 205 140"
                                    fill="url(#bodyGradient)"
                                    stroke="url(#outlineGradient)"
                                    strokeWidth="2"
                                />

                                {/* Left Leg */}
                                <path
                                    d="M115 320 Q110 380 108 440 Q107 470 115 485 Q125 490 130 485 Q135 470 130 440 Q128 380 130 330"
                                    fill="url(#bodyGradient)"
                                    stroke="url(#outlineGradient)"
                                    strokeWidth="2"
                                />

                                {/* Right Leg */}
                                <path
                                    d="M185 320 Q190 380 192 440 Q193 470 185 485 Q175 490 170 485 Q165 470 170 440 Q172 380 170 330"
                                    fill="url(#bodyGradient)"
                                    stroke="url(#outlineGradient)"
                                    strokeWidth="2"
                                />
                            </g>

                            {/* Health Indicators */}
                            <BodyIndicator x={150} y={55} label="Brain" status="good" delay={0.2} />
                            <BodyIndicator x={150} y={180} label="Heart" status="good" delay={0.4} />
                            <BodyIndicator x={150} y={250} label="Core" status="good" delay={0.6} />
                            <BodyIndicator x={70} y={290} label="Arm L" status="good" delay={0.8} />
                            <BodyIndicator x={230} y={290} label="Arm R" status="good" delay={1.0} />
                            <BodyIndicator x={120} y={420} label="Leg L" status="good" delay={1.2} />
                            <BodyIndicator x={180} y={420} label="Leg R" status="good" delay={1.4} />
                        </svg>

                        {/* Decorative scan lines */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <motion.div
                                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                                initial={{ top: "0%" }}
                                animate={{ top: "100%" }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    </div>

                    {/* Footer stats */}
                    <div className="flex justify-between items-end mt-4 text-white/60 text-xs font-mono">
                        <div>SCAN MODE: PASSIVE<br />SYNC: 100%</div>
                        <div className="text-right">
                            <span className="text-3xl font-bold text-white">98%</span>
                            <br />
                            <span className="text-cyan-400">Overall Health</span>
                        </div>
                    </div>

                    {/* Decorative blurs */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute -top-20 -left-20 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
                </motion.div>

                {/* Right: Metrics Grid */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">Vital Signs</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {metrics.map((metric, i) => (
                            <motion.div
                                key={metric.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setSelectedMetric(metric.name)}
                                className={`p-5 rounded-xl border-2 transition-all cursor-pointer bg-white hover:shadow-lg ${selectedMetric === metric.name
                                        ? "ring-2 ring-cyan-500 border-cyan-500 shadow-lg"
                                        : "border-slate-100 hover:border-slate-200"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${metric.color} shadow-lg`}>
                                        <metric.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-medium">
                                        {getTrendIcon(metric.change)}
                                        <span className={metric.change >= 0 ? "text-emerald-600" : "text-red-500"}>
                                            {metric.change >= 0 ? "+" : ""}{metric.change}%
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-sm font-medium text-slate-500 mb-1">{metric.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-slate-900">{metric.value.toLocaleString()}</span>
                                    <span className="text-sm text-slate-400">{metric.unit}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* AI Insight */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-xl border border-slate-700"
                    >
                        <h3 className="font-bold text-cyan-400 mb-3 flex items-center gap-2">
                            <span className="text-lg">✨</span>
                            Health Insights
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-0.5">●</span>
                                Your vitals are within healthy ranges — keep it up!
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-0.5">●</span>
                                Mental focus is 8% higher than your weekly average.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-400 mt-0.5">●</span>
                                Consider more water intake to optimize hydration.
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
