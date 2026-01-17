import { NextResponse } from "next/server";

// Mock AI-powered health suggestions
const suggestions = [
    {
        id: 1,
        type: "hydration",
        title: "Drink more water",
        description: "Based on your activity level, you should drink at least 2.5L of water today.",
        priority: "medium",
        icon: "💧",
    },
    {
        id: 2,
        type: "exercise",
        title: "Time for a walk",
        description: "You've been sitting for 2 hours. A 10-minute walk will boost your energy.",
        priority: "low",
        icon: "🚶",
    },
    {
        id: 3,
        type: "medication",
        title: "Vitamin D reminder",
        description: "Don't forget your daily Vitamin D supplement with breakfast.",
        priority: "high",
        icon: "💊",
    },
    {
        id: 4,
        type: "sleep",
        title: "Improve sleep quality",
        description: "Try to sleep 30 minutes earlier tonight. Your average is below the recommended 7-8 hours.",
        priority: "medium",
        icon: "🌙",
    },
    {
        id: 5,
        type: "stress",
        title: "Take a break",
        description: "Your heart rate variability suggests elevated stress. Try 5 minutes of deep breathing.",
        priority: "medium",
        icon: "🧘",
    },
];

export async function GET() {
    // In a real app, this would use ML/AI to generate personalized suggestions
    // based on user's health data, activity patterns, and preferences

    // Simulate some randomness for demo
    const shuffled = [...suggestions].sort(() => Math.random() - 0.5);
    const selectedSuggestions = shuffled.slice(0, 3);

    return NextResponse.json({
        suggestions: selectedSuggestions,
        generatedAt: new Date().toISOString(),
        model: "HealthAI-v1",
    });
}
