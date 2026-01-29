"use client"

import { motion } from "framer-motion"
import { pageVariants, buttonVariants } from "@/lib/animations"

interface LoginClientProps {
    signInAction: (formData: FormData) => Promise<void>
    googleSignInAction: () => Promise<void>
    githubSignInAction: () => Promise<void>
}

export default function LoginClient({ signInAction, googleSignInAction, githubSignInAction }: LoginClientProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-indigo-50/30 to-violet-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-violet-950 p-4">
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
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
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
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium mb-4">
                            <span>🔥</span>
                            <span>Top 100 Questions</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                            FusionPath
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Master LeetCode, Crack Interviews
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
                            "100 most asked interview questions",
                            "Organized by topic & difficulty",
                            "Track your solving progress",
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
                                    <svg className="w-3 h-3 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                {feature}
                            </div>
                        ))}
                    </motion.div>

                    {/* Sign in form */}
                    <motion.form
                        action={signInAction}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full rounded-xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                minLength={6}
                                className="w-full rounded-xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="••••••••"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            variants={buttonVariants}
                            initial="idle"
                            whileHover="hover"
                            whileTap="tap"
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold text-base shadow-lg shadow-slate-900/20 dark:shadow-white/10 hover:shadow-xl transition-shadow duration-300"
                        >
                            Sign in
                        </motion.button>
                    </motion.form>

                    <div className="my-6 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                        <span className="h-px flex-1 bg-slate-200/60 dark:bg-slate-700/60" />
                        or
                        <span className="h-px flex-1 bg-slate-200/60 dark:bg-slate-700/60" />
                    </div>

                    <div className="grid gap-3">
                        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                            Continue with
                        </p>
                        <motion.form action={googleSignInAction}>
                            <motion.button
                                type="submit"
                                variants={buttonVariants}
                                initial="idle"
                                whileHover="hover"
                                whileTap="tap"
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-slate-900 rounded-2xl font-semibold text-base shadow-lg shadow-slate-900/10 hover:shadow-xl transition-shadow duration-300 dark:bg-slate-900 dark:text-white dark:shadow-indigo-500/10"
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
                        <motion.form action={githubSignInAction}>
                            <motion.button
                                type="submit"
                                variants={buttonVariants}
                                initial="idle"
                                whileHover="hover"
                                whileTap="tap"
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/90 text-slate-900 rounded-2xl font-semibold text-base shadow-lg shadow-slate-900/10 hover:shadow-xl transition-shadow duration-300 border border-slate-200/70 dark:bg-slate-950 dark:text-white dark:border-slate-700/60"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M12 1.5a10.5 10.5 0 00-3.32 20.46c.53.1.73-.23.73-.51v-1.98c-2.96.65-3.58-1.27-3.58-1.27-.48-1.22-1.17-1.55-1.17-1.55-.96-.66.08-.65.08-.65 1.06.08 1.62 1.1 1.62 1.1.95 1.62 2.5 1.15 3.1.88.1-.7.37-1.15.67-1.41-2.36-.27-4.84-1.18-4.84-5.24 0-1.16.41-2.11 1.1-2.86-.12-.27-.48-1.36.1-2.83 0 0 .9-.29 2.94 1.09a10.2 10.2 0 015.36 0c2.04-1.38 2.94-1.09 2.94-1.09.58 1.47.22 2.56.1 2.83.68.75 1.1 1.7 1.1 2.86 0 4.07-2.49 4.97-4.86 5.23.38.33.72.98.72 1.98v2.93c0 .28.2.62.74.51A10.5 10.5 0 0012 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Continue with GitHub
                            </motion.button>
                        </motion.form>
                    </div>

                    <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                        Don’t have an account? <a href="/signup" className="font-semibold text-indigo-600 dark:text-indigo-300">Create one</a>
                    </div>

                    {/* Footer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6"
                    >
                        Forgot password? Contact admin at nextgenfusion.dev@gmail.com
                    </motion.p>
                </div>
            </motion.div>
        </div>
    )
}
