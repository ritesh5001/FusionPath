
import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/mongodb"
import Question from "@/models/Question"
import Progress from "@/models/Progress"
import User from "@/models/User"
import DashboardClient from "./DashboardClient"
import { TOPICS } from "@/lib/data"

export const dynamic = 'force-dynamic'

async function getData() {
    const session = await auth()
    if (!session?.user) return null

    await dbConnect()

    const userRecord = session.user.id ? await User.findById(session.user.id).lean() : null
    if (!userRecord?.isPaid) {
        return { needsPayment: true }
    }

    // Fetch all questions sorted by number
    const questions = await Question.find({}).sort({ number: 1 }).lean() as any[]

    if (!session.user.id) return { user: session.user, questions: [], completedIds: [] }

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

    if ("needsPayment" in data && data.needsPayment) {
        redirect("/pay")
    }

    const questions = data.questions ?? []
    const user = data.user

    // Group by Topic
    const groupedByTopic: Record<string, any[]> = {}
    questions.forEach(q => {
        if (!groupedByTopic[q.topic]) groupedByTopic[q.topic] = []
        groupedByTopic[q.topic].push(q)
    })

    // Get topics in correct order
    const topics = TOPICS.map(t => t.name).filter(name => groupedByTopic[name])

    const totalCompleted = questions.filter(q => q.completed).length
    const totalQuestions = questions.length
    const progressPercentage = totalQuestions === 0 ? 0 : Math.round((totalCompleted / totalQuestions) * 100)

    // Calculate stats per difficulty
    const easyTotal = questions.filter(q => q.difficulty === 'Easy').length
    const easyCompleted = questions.filter(q => q.difficulty === 'Easy' && q.completed).length
    const mediumTotal = questions.filter(q => q.difficulty === 'Medium').length
    const mediumCompleted = questions.filter(q => q.difficulty === 'Medium' && q.completed).length
    const hardTotal = questions.filter(q => q.difficulty === 'Hard').length
    const hardCompleted = questions.filter(q => q.difficulty === 'Hard' && q.completed).length

    return (
        <DashboardClient
            userName={user?.name || "User"}
            topics={topics}
            groupedByTopic={groupedByTopic}
            totalCompleted={totalCompleted}
            totalQuestions={totalQuestions}
            progressPercentage={progressPercentage}
            difficultyStats={{
                easy: { total: easyTotal, completed: easyCompleted },
                medium: { total: mediumTotal, completed: mediumCompleted },
                hard: { total: hardTotal, completed: hardCompleted },
            }}
            logoutAction={logoutAction}
        />
    )
}

async function logoutAction() {
    "use server"
    await signOut({ redirectTo: "/login" })
}
