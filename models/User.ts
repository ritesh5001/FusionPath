import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name?: string;
    email?: string;
    image?: string;
    emailVerified?: Date;
    passwordHash?: string;
    isPaid?: boolean;
    paidAt?: Date;
    paymentId?: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    image: { type: String },
    emailVerified: { type: Date },
    passwordHash: { type: String },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentId: { type: String },
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
