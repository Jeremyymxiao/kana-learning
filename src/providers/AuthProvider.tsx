
'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { AuthContextType, AuthUser } from '@/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    console.log('AuthProvider initialized');
    let unsubscribe: (() => void) | undefined;

    const handleAuth = async () => {
      try {
        console.log('Checking redirect result...');
        const result = await getRedirectResult(auth);
        console.log('Redirect result:', result);
        
        if (result) {
          console.log('Setting user from redirect result');
          setUser(result.user as AuthUser);
          setLoading(false);
        } else {
          console.log('Setting up auth state listener');
          unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Auth state changed:', user);
            if (user) {
              setUser(user as AuthUser);
            } else {
              setUser(null);
            }
            setLoading(false);
          });
        }
      } catch (error) {
        console.error('Auth Error:', error);
        setError((error as Error).message);
        setLoading(false);
      }
    };

    handleAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log('Starting Google sign in...');
      setError(null);
      setLoading(true);
      
      // 在重定向之前保存当前 URL
      const currentPath = window.location.pathname + window.location.search;
      sessionStorage.setItem('redirectPath', currentPath);
      
      // 设置自定义参数
      googleProvider.setCustomParameters({
        prompt: 'select_account',
        access_type: 'offline'
      });
      
      console.log('Redirecting to Google...');
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error('Google sign in error:', error);
      setError((error as Error).message);
      setLoading(false);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user as AuthUser);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user as AuthUser);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<AuthUser['additionalInfo']>) => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');
      
      // 这里可以添加更新用户额外信息的逻辑
      // 比如使用 Firebase Realtime Database 或 Firestore
      
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          additionalInfo: {
            ...prev.additionalInfo,
            ...data,
          },
        };
      });
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 