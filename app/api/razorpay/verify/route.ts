import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import Payment from "@/models/Payment"
import User from "@/models/User"
import crypto from "crypto"

export const runtime = "nodejs"

export async function POST(req: Request) {
    const session = await auth()
    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 })
    }

    const { orderId, paymentId, signature } = await req.json()
    if (!orderId || !paymentId || !signature) {
        return new Response("Invalid payload", { status: 400 })
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
        return new Response("Razorpay not configured", { status: 500 })
    }

    const expected = crypto
        .createHmac("sha256", keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex")

    if (expected !== signature) {
        return new Response("Invalid signature", { status: 400 })
    }

    await dbConnect()
    await Payment.findOneAndUpdate(
        { orderId, userId: session.user.id },
        { status: "paid", paymentId },
        { new: true }
    )

    await User.findByIdAndUpdate(session.user.id, {
        isPaid: true,
        paidAt: new Date(),
        paymentId,
    })

    return Response.json({ success: true })
}
