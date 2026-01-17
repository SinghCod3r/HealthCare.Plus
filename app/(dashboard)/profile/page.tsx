"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">Your Profile</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors"
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                        {session?.user?.name?.[0]?.toUpperCase() || "U"}
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{session?.user?.name}</h2>
                            <p className="text-slate-500 flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4" />
                                {session?.user?.email}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-xs text-slate-500 uppercase flex items-center gap-2">
                                    <Calendar className="h-3 w-3" />
                                    Member Since
                                </p>
                                <p className="font-semibold text-slate-800 mt-1">January 2026</p>
                            </div>
                            <div className="p-4 bg-cyan-50 rounded-xl">
                                <p className="text-xs text-cyan-600 uppercase flex items-center gap-2">
                                    <User className="h-3 w-3" />
                                    Subscription
                                </p>
                                <p className="font-semibold text-cyan-700 mt-1">Free Plan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Health Information */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Health Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                        {isEditing ? (
                            <input
                                type="number"
                                defaultValue={28}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                            />
                        ) : (
                            <p className="text-lg text-slate-900">28 years</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                        {isEditing ? (
                            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        ) : (
                            <p className="text-lg text-slate-900">Male</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Height (cm)</label>
                        {isEditing ? (
                            <input
                                type="number"
                                defaultValue={175}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                            />
                        ) : (
                            <p className="text-lg text-slate-900">175 cm</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Weight (kg)</label>
                        {isEditing ? (
                            <input
                                type="number"
                                defaultValue={70}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                            />
                        ) : (
                            <p className="text-lg text-slate-900">70 kg</p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Blood Type</label>
                        {isEditing ? (
                            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500">
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>O+</option>
                                <option>O-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                            </select>
                        ) : (
                            <p className="text-lg text-slate-900">O+</p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Allergies</label>
                        {isEditing ? (
                            <textarea
                                placeholder="e.g., Peanuts, Penicillin..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 min-h-[100px]"
                                defaultValue="None"
                            />
                        ) : (
                            <p className="text-lg text-slate-900">None</p>
                        )}
                    </div>
                </div>

                {isEditing && (
                    <div className="flex gap-4 pt-4 border-t">
                        <button className="flex-1 py-3 bg-cyan-500 text-white rounded-xl font-medium hover:bg-cyan-600 transition-colors">
                            Save Changes
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Account Actions */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Account Settings</h3>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
