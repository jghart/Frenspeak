import mongoose, { Schema, Document } from 'mongoose';

export interface IListeningItem extends Document {
    difficulty: 'A2' | 'B1' | 'B2';
    topic: string;
    audioUrl?: string;
    transcript: string;
    question: string;
    options: string[];
    correctOptionIndex: number;
    category: 'announcement' | 'conversation' | 'instruction';
    createdAt: Date;
    updatedAt: Date;
}

const ListeningItemSchema: Schema = new Schema(
    {
        difficulty: {
            type: String,
            enum: ['A2', 'B1', 'B2'],
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        audioUrl: {
            type: String,
        },
        transcript: {
            type: String,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        options: {
            type: [String],
            required: true,
            validate: [(val: string[]) => val.length >= 3 && val.length <= 5, 'Must have 3-5 options'],
        },
        correctOptionIndex: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: ['announcement', 'conversation', 'instruction'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ListeningItem = mongoose.models.ListeningItem || mongoose.model<IListeningItem>('ListeningItem', ListeningItemSchema);

export default ListeningItem;
