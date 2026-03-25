import mongoose, { Schema, Document } from 'mongoose';

export interface ITurn extends Document {
    sessionId: mongoose.Types.ObjectId;
    role: 'examiner' | 'user';
    text: string;
    audioUrl?: string;
    score?: number;
    feedbackText?: string;
    wordCount?: number;
    keywordsMatched?: string[];
    createdAt: Date;
}

const TurnSchema: Schema = new Schema(
    {
        sessionId: {
            type: Schema.Types.ObjectId,
            ref: 'Session',
            required: true,
            index: true,
        },
        role: {
            type: String,
            enum: ['examiner', 'user'],
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        audioUrl: {
            type: String,
        },
        score: {
            type: Number,
            min: 0,
            max: 20,
        },
        feedbackText: {
            type: String,
        },
        wordCount: {
            type: Number,
        },
        keywordsMatched: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Turn = mongoose.models.Turn || mongoose.model<ITurn>('Turn', TurnSchema);

export default Turn;
