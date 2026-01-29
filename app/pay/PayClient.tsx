"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { motion } from "framer-motion"
import { buttonVariants, pageVariants } from "@/lib/animations"

declare global {
    interface Window {
        Razorpay: any
    }
}

interface PayClientProps {
    logoutAction: () => Promise<void>
}

export default function PayClient({ logoutAction }: PayClientProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const startCheckout = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/razorpay/order", { method: "POST" })
            if (!response.ok) throw new Error("Failed to create order")
            const data = await response.json()

            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: "FusionPath",
                description: "Access to Top 100 LeetCode Questions",
                order_id: data.orderId,
                handler: async (payment: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
                    const verify = await fetch("/api/razorpay/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            orderId: payment.razorpay_order_id,
                            paymentId: payment.razorpay_payment_id,
                            signature: payment.razorpay_signature,
                        }),
                    })

                    if (verify.ok) {
                        router.push("/dashboard")
                    } else {
                        alert("Payment verification failed. Please contact support.")
                    }
                },
                theme: {
                    color: "#4f46e5",
                },
            }

            const razorpay = new window.Razorpay(options)
            razorpay.open()
        } catch {
            alert("Unable to start payment. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/30 to-violet-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-violet-950 p-4">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={pageVariants}
                className="mx-auto w-full max-w-5xl"
            >
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-indigo-500/10 border border-white/20 dark:border-slate-700/50">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="inline-flex items-center rounded-full bg-indigo-100/80 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200 px-3 py-1 text-xs font-semibold tracking-wide">
                                One-time unlock
                            </span>
                            <span className="inline-flex items-center rounded-full bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200 px-3 py-1 text-xs font-semibold tracking-wide">
                                Lifetime access
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                            Unlock FusionPath and finish the Top 100 with focus and momentum.
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8">
                            FusionPath turns scattered practice into a clear, motivating journey. Track progress,
                            revisit weak areas, and stay consistent with a dashboard that keeps you moving forward.
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2 mb-8">
                            {[
                                "Guided Top 100 roadmap",
                                "Progress saved across devices",
                                "Topic-wise clarity & focus",
                                "Stay accountable with streaks",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-4 py-3"
                                >
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl bg-indigo-50/80 dark:bg-indigo-500/10 border border-indigo-100/70 dark:border-indigo-500/30 p-5 mb-8">
                            <p className="text-sm text-indigo-900 dark:text-indigo-100 font-semibold mb-2">
                                Why people buy FusionPath
                            </p>
                            <ul className="text-sm text-indigo-800/80 dark:text-indigo-200/80 space-y-2">
                                <li>• Stop guessing what to solve next.</li>
                                <li>• Build confidence with visible wins.</li>
                                <li>• Turn interview prep into a clear plan.</li>
                            </ul>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 mb-8">
                            {[
                                { title: "1-time payment", sub: "No subscriptions" },
                                { title: "Secure checkout", sub: "Powered by Razorpay" },
                                { title: "Instant access", sub: "Unlocks dashboard" },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-4 py-4"
                                >
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        {item.sub}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-6 py-5">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                Quick answers
                            </p>
                            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                <p><span className="font-medium">Is this a subscription?</span> No, it’s a one-time unlock.</p>
                                <p><span className="font-medium">How fast do I get access?</span> Immediately after payment verification.</p>
                                <p><span className="font-medium">What if payment fails?</span> You won’t be charged. Try again or contact support.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-6">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-indigo-500/10 border border-white/20 dark:border-slate-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Unlock now</h3>
                                <form action={logoutAction} method="post">
                                    <button
                                        type="submit"
                                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                                    >
                                        Log out
                                    </button>
                                </form>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                                One-time payment, lifetime dashboard access.
                            </p>
                            <div className="flex items-center justify-between rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 px-6 py-4 mb-6">
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Price</p>
                                    <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹10</p>
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                                    One-time
                                </span>
                            </div>
                            <motion.button
                                type="button"
                                variants={buttonVariants}
                                initial="idle"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={startCheckout}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold text-base shadow-lg shadow-slate-900/20 dark:shadow-white/10 hover:shadow-xl transition-shadow duration-300 disabled:opacity-60"
                            >
                                {loading ? "Starting checkout..." : "Pay ₹10 to Continue"}
                            </motion.button>
                            <div className="mt-6 space-y-3 text-xs text-slate-500 dark:text-slate-400">
                                <p>🔒 Secure payment • Card / UPI / Netbanking</p>
                                <p>✅ After payment, you are redirected to your dashboard.</p>
                                <p>Need help? Email nextgenfusion.dev@gmail.com</p>
                                <p>
                                    <a href="/refund-policy" className="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Refund policy</a>
                                    <span className="mx-2">•</span>
                                    <a href="/privacy-policy" className="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Privacy policy</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
