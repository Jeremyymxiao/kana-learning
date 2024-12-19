'use client';

import { createContext, useContext } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: { message: string } | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log('AuthProvider - session:', session);
  console.log('AuthProvider - status:', status);

  const logout = async () => {
    try {
      await signOut({ 
        redirect: true,
        callbackUrl: '/'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user: session?.user ? {
      id: session.user.id,
      email: session.user.email!,
      username: session.user.username,
      role: session.user.role,
      image: session.user.image
    } : null,
    isLoading: status === "loading",
    error: null,
    logout
  };

  console.log('AuthProvider - value:', value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}