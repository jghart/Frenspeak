import mongoose, { Schema, Document } from 'mongoose';

export interface IDailyStats extends Document {
    userId: mongoose.Types.ObjectId;
    date: string; // YYYY-MM-DD format
    minutesPracticed: number;
    speakingTasksDone: number;
    listeningItemsDone: number;
    speakingScore?: number;
    listeningAccuracy?: number;
    streakCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const DailyStatsSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        date: {
            type: String,
            required: true,
        },
        minutesPracticed: {
            type: Number,
            default: 0,
        },
        speakingTasksDone: {
            type: Number,
            default: 0,
        },
        listeningItemsDone: {
            type: Number,
            default: 0,
        },
        speakingScore: {
            type: Number,
        },
        listeningAccuracy: {
            type: Number,
        },
        streakCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for efficient lookups
DailyStatsSchema.index({ userId: 1, date: 1 }, { unique: true });

const DailyStats = mongoose.models.DailyStats || mongoose.model<IDailyStats>('DailyStats', DailyStatsSchema);

export default DailyStats;
