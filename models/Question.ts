import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuestion extends Document {
    number: number;
    title: string;
    link: string;
    topic: string;
    difficulty: string;
}

const QuestionSchema: Schema = new Schema({
    number: { type: Number, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
});

// Index for easier querying by number or topic
QuestionSchema.index({ number: 1 });
QuestionSchema.index({ topic: 1 });

const Question: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;
