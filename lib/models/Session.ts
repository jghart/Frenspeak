import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
    userId: mongoose.Types.ObjectId;
    type: 'speaking' | 'listening';
    exam: 'TCF';
    taskType: 'task1' | 'task2' | 'task3';
    score?: number;
    duration?: number; // seconds
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SessionSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: ['speaking', 'listening'],
            required: true,
        },
        exam: {
            type: String,
            enum: ['TCF'],
            default: 'TCF',
        },
        taskType: {
            type: String,
            enum: ['task1', 'task2', 'task3'],
            required: true,
        },
        score: {
            type: Number,
            min: 0,
            max: 20,
        },
        duration: {
            type: Number,
        },
        completedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Session = mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);

export default Session;
