
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/mongodb"
import Question from "@/models/Question"
import Progress from "@/models/Progress"
import { QuestionRow } from "@/components/QuestionRow"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">30-Day DSA Tracker</h1>
                        <p className="text-gray-500">Welcome back, {data.user.name}</p>
                    </div>
                    <div className="text-left md:text-right bg-white p-4 rounded-lg shadow-sm border md:border-transparent w-full md:w-auto">
                        <div className="text-2xl font-bold text-indigo-600">{progressPercentage}% Completed</div>
                        <div className="text-sm text-gray-500">{totalCompleted} / {totalQuestions} Solved</div>

                        {/* Simple Progress Bar */}
                        <div className="w-full md:w-48 bg-gray-200 rounded-full h-2.5 mt-2">
                            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    {days.map(day => (
                        <Card key={day} className="w-full">
                            <CardHeader className="pb-2 border-b bg-gray-50/50">
                                <CardTitle className="text-lg flex justify-between items-center">
                                    <span>Day {day}</span>
                                    <span className="text-xs font-normal px-2 py-1 bg-white border rounded text-gray-500">
                                        {groupedByDay[day][0]?.topic}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-1">
                                    {groupedByDay[day].map(q => (
                                        <QuestionRow key={q._id} question={q} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {days.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-medium text-gray-900">No questions found</h3>
                        <p className="text-gray-500 mt-2">Please seed the database.</p>
                        {/* Optional Seed Button or instruction */}
                        <form action="/api/seed" method="GET" target="_blank">
                            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Seed Database</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
