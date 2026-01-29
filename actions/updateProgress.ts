'use server'

import { auth } from "@/auth"
import Progress from "@/models/Progress"
import dbConnect from "@/lib/mongodb"
import { revalidatePath } from "next/cache"

export async function toggleTask(questionId: string, status: boolean) {
    const session = await auth()

    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    await dbConnect()

    await Progress.findOneAndUpdate(
        { userId: session.user.id, questionId },
        {
            isCompleted: status,
            completedAt: status ? new Date() : undefined
        },
        { upsert: true, new: true }
    )

    revalidatePath('/dashboard')
}
