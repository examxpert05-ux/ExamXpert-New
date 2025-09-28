import mongoose, { Document, Schema } from 'mongoose';

export interface ITest extends Document {
    user: mongoose.Types.ObjectId;
    exam: string;
    questions: mongoose.Types.ObjectId[];
    answers: number[];
    score: number;
    timeSpent: number;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const TestSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    exam: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    answers: [{ type: Number }],
    score: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 },
    completedAt: Date,
}, { timestamps: true });

export default mongoose.model<ITest>('Test', TestSchema);
