import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
    userId: string;
    orderId: string;
    paymentId?: string;
    amount: number;
    currency: string;
    status: "created" | "paid" | "failed";
}

const PaymentSchema: Schema = new Schema(
    {
        userId: { type: String, required: true, index: true },
        orderId: { type: String, required: true, unique: true },
        paymentId: { type: String },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    },
    { timestamps: true }
);

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
