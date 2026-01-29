
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/mongodb"
import Question from "@/models/Question"
import Progress from "@/models/Progress"
import DashboardClient from "./DashboardClient"

export const dynamic = 'force-dynamic'

async function getData() {
    const session = await auth()
    if (!session?.user) return null

    await dbConnect()

    // Fetch all questions sorted by day
    const questions = await Question.find({}).sort({ day: 1 }).lean() as any[]

    if (!session.user.id) return { user: session.user, questions: [], completedIds: [] } // Should handle better

    // Fetch user progress
    const progress = await Progress.find({ userId: session.user.id }).lean() as any[]

    // Map progress to questions
    const progressMap = new Set(progress.filter(p => p.isCompleted).map(p => p.questionId.toString()))

    const mappedQuestions = questions.map(q => ({
        ...q,
        _id: q._id.toString(),
        completed: progressMap.has(q._id.toString())
    }))

    return {
        user: session.user,
        questions: mappedQuestions
    }
}

export default async function Dashboard() {
    const data = await getData()

    if (!data) {
        redirect("/login")
    }

    const { questions } = data

    // Group by Day
    const groupedByDay: Record<number, any[]> = {}
    questions.forEach(q => {
        if (!groupedByDay[q.day]) groupedByDay[q.day] = []
        groupedByDay[q.day].push(q)
    })

    // Sort days
    const days = Object.keys(groupedByDay).map(Number).sort((a, b) => a - b)

    const totalCompleted = questions.filter(q => q.completed).length
    const totalQuestions = questions.length
    const progressPercentage = totalQuestions === 0 ? 0 : Math.round((totalCompleted / totalQuestions) * 100)

    return (
        <DashboardClient
            userName={data.user.name || "User"}
            days={days}
            groupedByDay={groupedByDay}
            totalCompleted={totalCompleted}
            totalQuestions={totalQuestions}
            progressPercentage={progressPercentage}
        />
    )
}
