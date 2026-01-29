import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import Payment from "@/models/Payment"
import Razorpay from "razorpay"

export const runtime = "nodejs"

export async function POST() {
    const session = await auth()
    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
        return new Response("Razorpay not configured", { status: 500 })
    }

    const amount = 10 * 100
    const currency = "INR"

    try {
        const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })
        const shortUserId = String(session.user.id).slice(-10)
        const shortTimestamp = Date.now().toString().slice(-8)
        const receipt = `fp_${shortUserId}_${shortTimestamp}`
        const order = await razorpay.orders.create({
            amount,
            currency,
            receipt,
        })

        await dbConnect()
        await Payment.create({
            userId: session.user.id,
            orderId: order.id,
            amount,
            currency,
            status: "created",
        })

        return Response.json({
            orderId: order.id,
            amount,
            currency,
            keyId,
        })
    } catch (error) {
        let message = error instanceof Error ? error.message : "Unknown error"
        const details = typeof error === "object" && error !== null ? (error as Record<string, unknown>) : null
        const razorpayError = (details?.error as Record<string, unknown>) ?? null
        if (message === "Unknown error") {
            try {
                message = JSON.stringify(error)
            } catch {
                message = "Unknown error"
            }
        }

        console.error("Razorpay order failed", {
            message,
            razorpayError,
        })

        return Response.json(
            {
                error: "Razorpay order failed",
                message,
                razorpayError,
            },
            { status: 500 }
        )
    }
}
