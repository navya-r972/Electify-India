import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  preferences: {
    language: string;
    audioEnabled: boolean;
    blindReadEnabled: boolean;
  };
  progress: {
    completedModules: string[];
    inProgressModules: string[];
    totalModules: number;
    lastModule: string;
    xp: number;
    streak: number;
    level: number;
  };
  recentlyViewed: Array<{
    title: string;
    type: string;
    url: string;
    timestamp: Date;
  }>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  preferences: {
    language: { type: String, default: 'English' },
    audioEnabled: { type: Boolean, default: true },
    blindReadEnabled: { type: Boolean, default: false },
  },
  progress: {
    completedModules: { type: [String], default: [] },
    inProgressModules: { type: [String], default: [] },
    totalModules: { type: Number, default: 7 },
    lastModule: { type: String, default: '' },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 1 },
    level: { type: Number, default: 1 },
  },
  recentlyViewed: [{
    title: String,
    type: String,
    url: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
