"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, Bell, User, Activity, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="animate-pulse text-slate-600 dark:text-slate-400">Loading...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Reminders", href: "/reminders", icon: Bell },
        { name: "Insights", href: "/insights", icon: BarChart3 },
        { name: "Body Status", href: "/body-status", icon: Activity },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 fixed h-full z-10 transition-colors">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
                        HealthPlus
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                                    ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Theme Toggle & User */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Theme</span>
                        <ThemeToggle />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white">
                            {session.user?.name?.[0] || "U"}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{session.user?.name || "User"}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate w-32">{session.user?.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-20 flex items-center justify-between px-4">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
                    HealthPlus
                </span>
                <ThemeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-20 flex items-center justify-around">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 p-2 ${isActive
                                ? "text-cyan-600 dark:text-cyan-400"
                                : "text-slate-500 dark:text-slate-400"
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="text-xs">{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-6 lg:p-8 pt-20 lg:pt-8 pb-20 lg:pb-8">
                {children}
            </main>
        </div>
    );
}
