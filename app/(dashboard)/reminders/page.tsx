"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle, Circle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Reminder = {
    id: string;
    title: string;
    time: string;
    type: string;
    completed: boolean;
};

export default function RemindersPage() {
    // Mock data for MVP visual - in real app, fetch from API
    const [reminders, setReminders] = useState<Reminder[]>([
        { id: "1", title: "Morning Meds", time: "08:00", type: "Medicine", completed: false },
        { id: "2", title: "Drink Water", time: "10:00", type: "Hydration", completed: true },
        { id: "3", title: "Walk", time: "18:00", type: "Exercise", completed: false },
    ]);

    const [newTitle, setNewTitle] = useState("");
    const [newTime, setNewTime] = useState("");

    const addReminder = () => {
        if (!newTitle || !newTime) return;
        const newRem: Reminder = {
            id: Date.now().toString(),
            title: newTitle,
            time: newTime,
            type: "Custom",
            completed: false,
        };
        setReminders([...reminders, newRem]);
        setNewTitle("");
        setNewTime("");
    };

    const toggleComplete = (id: string) => {
        setReminders(reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
    };

    const deleteReminder = (id: string) => {
        setReminders(reminders.filter(r => r.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">Reminders</h1>
                <div className="text-slate-500 text-sm">Today, {new Date().toLocaleDateString()}</div>
            </div>

            {/* Add Reminder Input */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="New reminder..."
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-black"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <input
                    type="time"
                    className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-black"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                />
                <button
                    onClick={addReminder}
                    className="px-6 py-3 bg-cyan-500 text-white font-medium rounded-xl hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Add
                </button>
            </div>

            {/* List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {reminders.map((reminder) => (
                        <motion.div
                            key={reminder.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${reminder.completed
                                ? "bg-slate-50 border-slate-100 opacity-75"
                                : "bg-white border-slate-100 hover:shadow-md hover:border-cyan-100"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => toggleComplete(reminder.id)}
                                    className={`p-1 rounded-full ${reminder.completed ? "text-cyan-500" : "text-slate-300 hover:text-cyan-500"}`}
                                >
                                    {reminder.completed ? <CheckCircle className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                                </button>
                                <div>
                                    <h3 className={`font-semibold text-lg ${reminder.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>
                                        {reminder.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                        <Clock className="h-3 w-3" />
                                        {reminder.time} • <span className="bg-slate-100 px-2 py-0.5 rounded-full">{reminder.type}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => deleteReminder(reminder.id)}
                                className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {reminders.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        No reminders set. Enjoy your day!
                    </div>
                )}
            </div>
        </div>
    );
}
