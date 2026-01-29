'use client'

import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { toggleTask } from "@/actions/updateProgress"
import { useTransition } from "react"
import { listItemVariants } from "@/lib/animations"

interface QuestionRowProps {
    question: {
        _id: string
        questionId?: string
        title: string
        link: string
        topic: string
        day: number
        completed: boolean
    }
    index?: number
}

export function QuestionRow({ question, index = 0 }: QuestionRowProps) {
    const [isPending, startTransition] = useTransition()

    return (
        <motion.div
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-200 border ${
                question.completed
                    ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30'
                    : 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-600'
            } ${isPending ? 'opacity-70' : ''}`}
        >
            <div className="flex items-center gap-4">
                <Checkbox
                    id={question._id}
                    checked={question.completed}
                    onCheckedChange={(checked) => {
                        startTransition(() => {
                            toggleTask(question._id, checked === true)
                        })
                    }}
                    disabled={isPending}
                    className="h-5 w-5 rounded-md border-2 border-slate-300 dark:border-slate-600 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-indigo-500 data-[state=checked]:to-violet-600 data-[state=checked]:border-transparent transition-all duration-200"
                />
                <div className="flex flex-col gap-0.5">
                    <a
                        href={question.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium transition-colors duration-200 ${
                            question.completed
                                ? 'text-slate-400 dark:text-slate-500 line-through decoration-slate-300 dark:decoration-slate-600'
                                : 'text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                    >
                        <span className="group-hover:underline underline-offset-2">{question.title}</span>
                        <svg
                            className="inline-block w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </a>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {isPending && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-4 h-4"
                    >
                        <svg className="animate-spin text-indigo-500" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    </motion.div>
                )}

                {question.completed && !isPending && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Done
                    </motion.span>
                )}
            </div>
        </motion.div>
    )
}
