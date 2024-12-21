import { User } from 'firebase/auth';

export interface AuthUser extends User {
  additionalInfo?: {
    preferredLanguage?: string;
    studyLevel?: string;
    // 可以根据需要添加更多用户信息字段
  };
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<AuthUser['additionalInfo']>) => Promise<void>;
} 