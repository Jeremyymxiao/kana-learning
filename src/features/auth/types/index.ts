import { Session } from 'next-auth'
import { UserRole } from '@/types/user'

export interface User {
  id: string
  email: string
  username: string
  role: UserRole
  image?: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  username: string
  password: string
}

export interface AuthError {
  message: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: AuthError | null
  session?: Session | null
} 