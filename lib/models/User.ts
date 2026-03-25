import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    name?: string;
    targetExam: 'TCF';
    targetDate?: Date;
    dailyGoalMinutes: number;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            trim: true,
        },
        targetExam: {
            type: String,
            enum: ['TCF'],
            default: 'TCF',
        },
        targetDate: {
            type: Date,
        },
        dailyGoalMinutes: {
            type: Number,
            default: 30,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;