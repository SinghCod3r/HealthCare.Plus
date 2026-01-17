import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET single reminder
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const reminder = await prisma.reminder.findUnique({
            where: { id: params.id },
            include: { user: true },
        });

        if (!reminder) {
            return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
        }

        // Check if reminder belongs to user
        if (reminder.user.email !== session.user.email) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(reminder);
    } catch (error) {
        console.error("Error fetching reminder:", error);
        return NextResponse.json({ error: "Failed to fetch reminder" }, { status: 500 });
    }
}

// PUT update reminder
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, time, type, repeat, completed } = body;

        const existingReminder = await prisma.reminder.findUnique({
            where: { id: params.id },
            include: { user: true },
        });

        if (!existingReminder) {
            return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
        }

        if (existingReminder.user.email !== session.user.email) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedReminder = await prisma.reminder.update({
            where: { id: params.id },
            data: {
                title: title ?? existingReminder.title,
                description: description ?? existingReminder.description,
                time: time ? new Date(time) : existingReminder.time,
                type: type ?? existingReminder.type,
                repeat: repeat ?? existingReminder.repeat,
                completed: completed ?? existingReminder.completed,
            },
        });

        return NextResponse.json(updatedReminder);
    } catch (error) {
        console.error("Error updating reminder:", error);
        return NextResponse.json({ error: "Failed to update reminder" }, { status: 500 });
    }
}

// DELETE reminder
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const existingReminder = await prisma.reminder.findUnique({
            where: { id: params.id },
            include: { user: true },
        });

        if (!existingReminder) {
            return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
        }

        if (existingReminder.user.email !== session.user.email) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.reminder.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: "Reminder deleted successfully" });
    } catch (error) {
        console.error("Error deleting reminder:", error);
        return NextResponse.json({ error: "Failed to delete reminder" }, { status: 500 });
    }
}
