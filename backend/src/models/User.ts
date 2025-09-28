import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    profile: {
        avatar?: string;
        bio?: string;
        academicBackground?: string;
        goals?: string;
    };
    preferences: {
        theme: 'light' | 'dark' | 'system';
        notifications: boolean;
    };
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profile: {
        avatar: String,
        bio: String,
        academicBackground: String,
        goals: String,
    },
    preferences: {
        theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
        notifications: { type: Boolean, default: true },
    },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
