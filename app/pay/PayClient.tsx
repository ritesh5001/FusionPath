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

export default function PayClient() {
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
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-indigo-50/30 to-violet-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-violet-950 p-4">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={pageVariants}
                className="w-full max-w-lg"
            >
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-indigo-500/10 border border-white/20 dark:border-slate-700/50">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Unlock FusionPath</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">
                        Pay once to access the full Top 100 LeetCode dashboard.
                    </p>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 px-6 py-4 mb-8">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Price</p>
                            <p className="text-2xl font-semibold text-slate-900 dark:text-white">₹10</p>
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
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-6">
                        If you face issues, contact admin at nextgenfusion.dev@gmail.com.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
