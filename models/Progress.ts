import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgress extends Document {
    userId: mongoose.Types.ObjectId;
    questionId: string;
    isCompleted: boolean;
    completedAt?: Date;
}

const ProgressSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questionId: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date }
});

// Setup compound index for unique progress per user per question
ProgressSchema.index({ userId: 1, questionId: 1 }, { unique: true });

const Progress: Model<IProgress> = mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);

export default Progress;
