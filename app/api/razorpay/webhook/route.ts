import dbConnect from "@/lib/mongodb"
import Payment from "@/models/Payment"
import User from "@/models/User"
import crypto from "crypto"

export const runtime = "nodejs"

export async function POST(req: Request) {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
    if (!webhookSecret) {
        return new Response("Webhook not configured", { status: 500 })
    }

    const signature = req.headers.get("x-razorpay-signature")
    const body = await req.text()

    const expected = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex")

    if (expected !== signature) {
        return new Response("Invalid signature", { status: 400 })
    }

    const payload = JSON.parse(body)
    const event = payload.event

    if (event === "payment.captured") {
        const orderId = payload.payload?.payment?.entity?.order_id
        const paymentId = payload.payload?.payment?.entity?.id

        if (orderId && paymentId) {
            await dbConnect()
            const payment = await Payment.findOneAndUpdate(
                { orderId },
                { status: "paid", paymentId },
                { new: true }
            )

            if (payment?.userId) {
                await User.findByIdAndUpdate(payment.userId, {
                    isPaid: true,
                    paidAt: new Date(),
                    paymentId,
                })
            }
        }
    }

    return Response.json({ received: true })
}
