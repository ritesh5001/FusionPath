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
    progressVariants,
    buttonVariants,
} from "@/lib/animations"

interface DashboardClientProps {
    userName: string
    days: number[]
    groupedByDay: Record<number, any[]>
    totalCompleted: number
    totalQuestions: number
    progressPercentage: number
}

export default function DashboardClient({
    userName,
    days,
    groupedByDay,
    totalCompleted,
    totalQuestions,
    progressPercentage,
}: DashboardClientProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-violet-50/30 dark:from-slate-950 dark:via-indigo-950/20 dark:to-violet-950/30">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-200/20 dark:bg-violet-900/10 rounded-full blur-3xl" />
            </div>

            <motion.main
                initial="hidden"
                animate="visible"
                variants={pageVariants}
                className="relative p-4 md:p-8 lg:p-12"
            >
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header Section */}
                    <motion.div
                        variants={headerVariants}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
                    >
                        <div className="space-y-2">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-violet-800 dark:from-white dark:via-indigo-200 dark:to-violet-200 bg-clip-text text-transparent"
                            >
                                30-Day DSA Tracker
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

                        {/* Stats Card */}
                        <motion.div
                            variants={statsVariants}
                            className="w-full lg:w-auto"
                        >
                            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-indigo-500/5 dark:shadow-indigo-500/5 border border-white/50 dark:border-slate-700/50">
                                <div className="flex items-center gap-4">
                                    {/* Circular Progress */}
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <svg className="w-20 h-20 transform -rotate-90">
                                            <circle
                                                cx="40"
                                                cy="40"
                                                r="36"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="none"
                                                className="text-slate-100 dark:text-slate-800"
                                            />
                                            <motion.circle
                                                cx="40"
                                                cy="40"
                                                r="36"
                                                stroke="url(#progressGradient)"
                                                strokeWidth="8"
                                                fill="none"
                                                strokeLinecap="round"
                                                initial={{ strokeDasharray: "226.2", strokeDashoffset: 226.2 }}
                                                animate={{ strokeDashoffset: 226.2 - (226.2 * progressPercentage) / 100 }}
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
                                            <span className="text-lg font-bold text-slate-900 dark:text-white">{progressPercentage}%</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {totalCompleted} / {totalQuestions}
                                        </div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">
                                            Problems Solved
                                        </div>

                                        {/* Linear Progress Bar */}
                                        <div className="w-32 md:w-40 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                                                variants={progressVariants}
                                                initial="hidden"
                                                animate="visible"
                                                custom={progressPercentage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Day Cards */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-6"
                    >
                        {days.map((day, index) => {
                            const dayQuestions = groupedByDay[day]
                            const dayCompleted = dayQuestions.filter(q => q.completed).length
                            const dayTotal = dayQuestions.length
                            const dayProgress = Math.round((dayCompleted / dayTotal) * 100)

                            return (
                                <motion.div
                                    key={day}
                                    variants={cardVariants}
                                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                >
                                    <Card className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/50 dark:border-slate-700/50 shadow-lg shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 transition-shadow duration-300 overflow-hidden">
                                        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50/50 to-indigo-50/30 dark:from-slate-800/50 dark:to-indigo-900/20">
                                            <CardTitle className="text-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30">
                                                        {day}
                                                    </span>
                                                    <div>
                                                        <span className="font-semibold text-slate-900 dark:text-white">Day {day}</span>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                                                            {dayCompleted}/{dayTotal} completed
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-medium px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-300 shadow-sm">
                                                        {groupedByDay[day][0]?.topic}
                                                    </span>
                                                    {dayProgress === 100 && (
                                                        <span className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full text-emerald-700 dark:text-emerald-300">
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                            Done
                                                        </span>
                                                    )}
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="space-y-2">
                                                {groupedByDay[day].map((q, qIndex) => (
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
                    {days.length === 0 && (
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
                            <p className="text-slate-500 dark:text-slate-400 mb-6">Please seed the database to get started.</p>
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
                                    Seed Database
                                </motion.button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </motion.main>
        </div>
    )
}
