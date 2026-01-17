"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, HeartPulse, Activity, Sparkles, Zap, Shield } from "lucide-react";

function AnimatedSphere() {
    return (
        <Sphere visible args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
                color="#06b6d4"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.1}
            />
        </Sphere>
    );
}

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex flex-col pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-cyan-100/50 dark:from-cyan-900/20 to-transparent blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-blue-100/50 dark:from-blue-900/20 to-transparent blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-grow py-12">
                {/* Left: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 z-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-cyan-100 dark:border-cyan-800 shadow-sm text-cyan-700 dark:text-cyan-400 font-medium text-sm">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Trusted by 10,000+ users</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        <span className="block">Your Health,</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                            Reimagined.
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                        Experience preventive care that adapts to you. Smart reminders, health insights, and premium wellness tracking in one beautiful app.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/signup"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1"
                        >
                            Start Your Journey
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/dashboard"
                            className="flex items-center justify-center gap-2 px-8 py-4 text-slate-700 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <Activity className="h-5 w-5 text-cyan-500" />
                            View Demo
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center gap-6 text-slate-400 dark:text-slate-500">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400`}>
                                    U{i}
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-xs text-cyan-700 dark:text-cyan-400 font-bold">
                                +2k
                            </div>
                        </div>
                        <p className="text-sm">Join our growing community.</p>
                    </div>
                </motion.div>

                {/* Right: 3D Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative h-[600px] w-full hidden lg:block"
                >
                    <div className="absolute inset-0 z-0">
                        <Canvas>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[3, 2, 1]} />
                            <AnimatedSphere />
                            <OrbitControls enableZoom={false} autoRotate />
                        </Canvas>
                    </div>

                    {/* Floating Glass Cards */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-10 glass-panel p-4 rounded-2xl flex items-center gap-3 w-48 z-10"
                    >
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-500">
                            <HeartPulse className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Heart Rate</p>
                            <p className="text-lg font-bold text-slate-800 dark:text-white">72 BPM</p>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-32 left-0 glass-panel p-4 rounded-2xl flex items-center gap-3 w-52 z-10"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-500">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Daily Steps</p>
                            <p className="text-lg font-bold text-slate-800 dark:text-white">8,432 / 10k</p>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-48 right-20 glass-panel p-4 rounded-2xl flex items-center gap-3 w-44 z-10"
                    >
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-500">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Energy</p>
                            <p className="text-lg font-bold text-slate-800 dark:text-white">92%</p>
                        </div>
                    </motion.div>

                    {/* Doctor Avatar Card */}
                    <motion.div
                        animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        className="absolute top-40 left-10 glass-panel p-3 rounded-2xl flex items-center gap-3 z-10"
                    >
                        <img
                            src="/doctor.png"
                            alt="Doctor"
                            className="w-14 h-14 rounded-xl object-cover shadow-lg"
                        />
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Your Doctor</p>
                            <p className="text-sm font-bold text-slate-800 dark:text-white">Dr. Smith</p>
                            <p className="text-xs text-emerald-500">● Online</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
