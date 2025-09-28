import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
    exam: string;
    subject: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    year?: number;
    marks: number;
    createdAt: Date;
    updatedAt: Date;
}

const QuestionSchema: Schema = new Schema({
    exam: { type: String, required: true },
    subject: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    year: Number,
    marks: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model<IQuestion>('Question', QuestionSchema);
