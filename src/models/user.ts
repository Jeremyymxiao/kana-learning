import mongoose from 'mongoose';
import { UserRole } from '@/types/user';

export interface IUser extends mongoose.Document {
  email: string;
  username: string;
  passwordHash?: string;
  googleId?: string;
  image?: string;
  emailVerified?: Date;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  passwordHash: String,
  googleId: String,
  image: String,
  emailVerified: Date,
  role: { 
    type: String, 
    enum: Object.values(UserRole),
    default: UserRole.FREE 
  },
}, {
  timestamps: true,
});

// 防止模型重复注册
export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User; 