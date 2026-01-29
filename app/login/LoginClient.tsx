"use client"

import { motion } from "framer-motion"
import { pageVariants, buttonVariants } from "@/lib/animations"

interface LoginClientProps {
    signInAction: () => Promise<void>
}

export default function LoginClient({ signInAction }: LoginClientProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-violet-950 p-4">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-200/30 dark:bg-violet-900/20 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={pageVariants}
                className="relative w-full max-w-md"
            >
                {/* Main card */}
                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/5 border border-white/20 dark:border-slate-700/50">
                    {/* Logo/Icon */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                        className="flex justify-center mb-8"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                            30-Day DSA Tracker
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Master Data Structures & Algorithms
                        </p>
                    </motion.div>

                    {/* Features list */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                        className="space-y-3 mb-10"
                    >
                        {[
                            "Structured 30-day learning path",
                            "Track your daily progress",
                            "Curated problems by topic",
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                {feature}
                            </div>
                        ))}
                    </motion.div>

                    {/* Sign in button */}
                    <motion.form
                        action={signInAction}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                    >
                        <motion.button
                            type="submit"
                            variants={buttonVariants}
                            initial="idle"
                            whileHover="hover"
                            whileTap="tap"
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold text-base shadow-lg shadow-slate-900/20 dark:shadow-white/10 hover:shadow-xl transition-shadow duration-300"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </motion.button>
                    </motion.form>

                    {/* Footer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="text-center text-xs text-slate-400 dark:text-slate-500 mt-8"
                    >
                        By signing in, you agree to our Terms of Service
                    </motion.p>
                </div>
            </motion.div>
        </div>
    )
}
