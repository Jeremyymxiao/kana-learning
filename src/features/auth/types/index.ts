export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
}

export interface StudyRecord {
  id: string;
  userId: string;
  type: 'quiz' | 'practice';
  score?: number;
  details: Record<string, any>;
  createdAt: Date;
} 