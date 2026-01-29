"use client"

import { motion } from "framer-motion"
import { pageVariants, buttonVariants } from "@/lib/animations"

interface SignupClientProps {
    signUpAction: (formData: FormData) => Promise<void>
}

export default function SignupClient({ signUpAction }: SignupClientProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-indigo-50/30 to-violet-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-violet-950 p-4">
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
                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/5 border border-white/20 dark:border-slate-700/50">
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
                                    d="M12 11c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm10 8a8 8 0 00-16 0"
                                />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                            Create your account
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Track your LeetCode progress in one place.
                        </p>
                    </motion.div>

                    <motion.form
                        action={signUpAction}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Full name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full rounded-xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Your name"
                            />
                        </div>
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
                            Create account
                        </motion.button>
                    </motion.form>

                    <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                        Already have an account? <a href="/login" className="font-semibold text-indigo-600 dark:text-indigo-300">Sign in</a>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6"
                    >
                        Password reset is handled manually. Contact admin at nextgenfusion.dev@gmail.com
                    </motion.p>
                </div>
            </motion.div>
        </div>
    )
}
