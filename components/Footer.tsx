"use client";

import Link from "next/link";
import { Activity, Heart, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-gradient-to-tr from-cyan-400 to-blue-500 p-2 rounded-xl">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-xl">
                                HealthCare<span className="text-cyan-400">Plus</span>
                            </span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-6">
                            Your personalized healthcare companion. Smart reminders, health insights, and preventive care all in one place.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://x.com/singhcod3r" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                                <Twitter className="h-5 w-5 text-slate-400 hover:text-white" />
                            </a>
                            <a href="https://github.com/singhcod3r" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                                <Github className="h-5 w-5 text-slate-400 hover:text-white" />
                            </a>
                            <a href="https://linkedin.com/in/singhcod3r" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                                <Linkedin className="h-5 w-5 text-slate-400 hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3">
                            {["Features", "Pricing", "Integrations", "API"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {["About", "Blog", "Careers", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} HealthCarePlus. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                        Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for better health
                    </div>
                    <div className="flex gap-6 text-sm">
                        <Link href="#" className="text-slate-500 hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="text-slate-500 hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
