import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuestion extends Document {
    title: string;
    link: string;
    day: number;
    topic: string;
}

const QuestionSchema: Schema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    day: { type: Number, required: true },
    topic: { type: String, required: true },
});

// Index for easier querying by day or topic
QuestionSchema.index({ day: 1 });
QuestionSchema.index({ topic: 1 });

const Question: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;
