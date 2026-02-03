import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import Payment from "@/models/Payment"
import Razorpay from "razorpay"

export const runtime = "nodejs"

export async function POST() {
    console.log("1. Starting Razorpay order creation...")
    const session = await auth()
    if (!session?.user?.id) {
        console.log("Error: Unauthorized user")
        return new Response("Unauthorized", { status: 401 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    console.log("2. Checking env vars...")
    if (!keyId || !keySecret) {
        console.error("Error: Razorpay keys missing in .env")
        return new Response("Razorpay not configured (Keys Missing)", { status: 500 })
    }

    const amount = 10 * 100
    const currency = "INR"

    try {
        console.log("3. Initializing Razorpay instance...")
        const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })
        const shortUserId = String(session.user.id).slice(-10)
        const shortTimestamp = Date.now().toString().slice(-8)
        const receipt = `fp_${shortUserId}_${shortTimestamp}`

        console.log("4. Creating Razorpay order...", { amount, currency, receipt })
        const order = await razorpay.orders.create({
            amount,
            currency,
            receipt,
        })
        console.log("5. Razorpay order created:", order.id)

        console.log("6. Connecting to MongoDB...")
        await dbConnect()

        console.log("7. Saving Payment record to DB...")
        await Payment.create({
            userId: session.user.id,
            orderId: order.id,
            amount,
            currency,
            status: "created",
        })
        console.log("8. Payment record saved successfully")

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

        console.error("CRITICAL ERROR in Razorpay order flow:", {
            message,
            stack: error instanceof Error ? error.stack : undefined,
            razorpayError,
        })

        return Response.json(
            {
                error: "Razorpay order failed",
                stage: "Check server logs for stage (Razorpay vs DB)",
                message,
                razorpayError,
            },
            { status: 500 }
        )
    }
}
