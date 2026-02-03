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
        console.error("Razorpay order failed", error)
        return Response.json(
            { error: "Razorpay order failed" },
            { status: 500 }
        )
    }
}
