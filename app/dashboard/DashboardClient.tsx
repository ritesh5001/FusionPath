"use client"

import { motion } from "framer-motion"
import { QuestionRow } from "@/components/QuestionRow"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    pageVariants,
    staggerContainer,
    cardVariants,
    headerVariants,
    statsVariants,
    buttonVariants,
} from "@/lib/animations"
import { TOPICS } from "@/lib/data"

interface DifficultyStats {
    easy: { total: number; completed: number }
    medium: { total: number; completed: number }
    hard: { total: number; completed: number }
}

interface DashboardClientProps {
    userName: string
    topics: string[]
    groupedByTopic: Record<string, any[]>
    totalCompleted: number
    totalQuestions: number
    progressPercentage: number
    difficultyStats: DifficultyStats
    logoutAction: () => Promise<void>
}

export default function DashboardClient({
    userName,
    topics,
    groupedByTopic,
    totalCompleted,
    totalQuestions,
    progressPercentage,
    difficultyStats,
    logoutAction,
}: DashboardClientProps) {
    const getTopicData = (topicName: string) => {
        return TOPICS.find(t => t.name === topicName) || { icon: "📝", color: "from-gray-500 to-gray-600" }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-violet-50/30 dark:from-slate-950 dark:via-indigo-950/20 dark:to-violet-950/30">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-200/20 dark:bg-violet-900/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-200/10 dark:bg-cyan-900/5 rounded-full blur-3xl" />
            </div>

            <motion.main
                initial="hidden"
                animate="visible"
                variants={pageVariants}
                className="relative p-4 md:p-8 lg:p-12"
            >
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header Section */}
                    <motion.div
                        variants={headerVariants}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-6"
                    >
                        <div className="space-y-2">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-medium"
                            >
                                <span>🔥</span>
                                <span>Top 100 LeetCode Questions</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-violet-800 dark:from-white dark:via-indigo-200 dark:to-violet-200 bg-clip-text text-transparent"
                            >
                                FusionPath
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-slate-500 dark:text-slate-400 text-lg"
                            >
                                Welcome back, <span className="font-medium text-slate-700 dark:text-slate-300">{userName}</span>
                            </motion.p>
                        </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:items-start w-full lg:w-auto">
                                <motion.div
                                    variants={statsVariants}
                                    className="w-full"
                                >
                                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-indigo-500/5 dark:shadow-indigo-500/5 border border-white/50 dark:border-slate-700/50">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                            {/* Circular Progress */}
                                            <div className="relative w-24 h-24 flex-shrink-0">
                                                <svg className="w-24 h-24 transform -rotate-90">
                                                    <circle
                                                        cx="48"
                                                        cy="48"
                                                        r="42"
                                                        stroke="currentColor"
                                                        strokeWidth="8"
                                                        fill="none"
                                                        className="text-slate-100 dark:text-slate-800"
                                                    />
                                                    <motion.circle
                                                        cx="48"
                                                        cy="48"
                                                        r="42"
                                                        stroke="url(#progressGradient)"
                                                        strokeWidth="8"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        initial={{ strokeDasharray: "264", strokeDashoffset: 264 }}
                                                        animate={{ strokeDashoffset: 264 - (264 * progressPercentage) / 100 }}
                                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                                                    />
                                                    <defs>
                                                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                            <stop offset="0%" stopColor="#6366f1" />
                                                            <stop offset="100%" stopColor="#8b5cf6" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-xl font-bold text-slate-900 dark:text-white">{progressPercentage}%</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                                        {totalCompleted} / {totalQuestions}
                                                    </div>
                                                    <div className="text-sm text-slate-500 dark:text-slate-400">
                                                        Problems Solved
                                                    </div>
                                                </div>

                                                {/* Difficulty breakdown */}
                                                <div className="flex gap-4 text-xs">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                        <span className="text-slate-600 dark:text-slate-400">Easy</span>
                                                        <span className="font-semibold text-slate-900 dark:text-white">{difficultyStats.easy.completed}/{difficultyStats.easy.total}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                                        <span className="text-slate-600 dark:text-slate-400">Med</span>
                                                        <span className="font-semibold text-slate-900 dark:text-white">{difficultyStats.medium.completed}/{difficultyStats.medium.total}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                        <span className="text-slate-600 dark:text-slate-400">Hard</span>
                                                        <span className="font-semibold text-slate-900 dark:text-white">{difficultyStats.hard.completed}/{difficultyStats.hard.total}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.form
                                    action={logoutAction}
                                    method="post"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                                    className="w-full sm:w-auto flex justify-end"
                                >
                                    <motion.button
                                        type="submit"
                                        variants={buttonVariants}
                                        initial="idle"
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl font-semibold shadow-xl shadow-red-500/40 hover:shadow-2xl transition-shadow duration-300"
                                        aria-label="Sign out"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                                            <path d="M7 8v-2a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h1a2 2 0 002-2v-2" />
                                        </svg>
                                        Sign out
                                    </motion.button>
                                </motion.form>
                            </div>
                    </motion.div>

                    {/* Topic Cards */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-6"
                    >
                        {topics.map((topic, index) => {
                            const topicQuestions = groupedByTopic[topic]
                            const topicCompleted = topicQuestions.filter(q => q.completed).length
                            const topicTotal = topicQuestions.length
                            const topicProgress = Math.round((topicCompleted / topicTotal) * 100)
                            const topicData = getTopicData(topic)

                            return (
                                <motion.div
                                    key={topic}
                                    variants={cardVariants}
                                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                >
                                    <Card className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/50 dark:border-slate-700/50 shadow-lg shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 transition-shadow duration-300 overflow-hidden">
                                        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                            <CardTitle className="text-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                                <div className="flex items-center gap-3">
                                                    <span className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${topicData.color} text-white text-xl shadow-lg`}>
                                                        {topicData.icon}
                                                    </span>
                                                    <div>
                                                        <span className="font-semibold text-slate-900 dark:text-white">{topic}</span>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                                                            {topicCompleted}/{topicTotal} completed
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {/* Progress bar for topic */}
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className={`h-full bg-gradient-to-r ${topicData.color} rounded-full`}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${topicProgress}%` }}
                                                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + index * 0.1 }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 w-10">
                                                            {topicProgress}%
                                                        </span>
                                                    </div>
                                                    {topicProgress === 100 && (
                                                        <span className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full text-emerald-700 dark:text-emerald-300">
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                            Complete
                                                        </span>
                                                    )}
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="space-y-2">
                                                {groupedByTopic[topic].map((q, qIndex) => (
                                                    <QuestionRow key={q._id} question={q} index={qIndex} />
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Empty State */}
                    {topics.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-20"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6">
                                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">No questions found</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">Seed the database to load the Top 100 LeetCode Questions.</p>
                            <form action="/api/seed" method="GET" target="_blank">
                                <motion.button
                                    variants={buttonVariants}
                                    initial="idle"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-shadow"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Load 100 Questions
                                </motion.button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </motion.main>
        </div>
    )
}
