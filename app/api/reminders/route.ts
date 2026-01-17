import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all reminders for current user
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                reminders: {
                    orderBy: { time: "asc" },
                },
            },
        });

        return NextResponse.json(user?.reminders || []);
    } catch (error) {
        console.error("Error fetching reminders:", error);
        return NextResponse.json({ error: "Failed to fetch reminders" }, { status: 500 });
    }
}

// POST create a new reminder
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, time, type, repeat } = body;

        if (!title || !time) {
            return NextResponse.json({ error: "Title and time are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const reminder = await prisma.reminder.create({
            data: {
                title,
                description: description || "",
                time: new Date(time),
                type: type || "general",
                repeat: repeat || "none",
                userId: user.id,
            },
        });

        return NextResponse.json(reminder, { status: 201 });
    } catch (error) {
        console.error("Error creating reminder:", error);
        return NextResponse.json({ error: "Failed to create reminder" }, { status: 500 });
    }
}
