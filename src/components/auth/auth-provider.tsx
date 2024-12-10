'use client';

import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { User, AuthError, LoginCredentials, RegisterData } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; user?: User }>;
  register: (data: RegisterData) => Promise<{ success: boolean; user?: User }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    user: User | null;
    isLoading: boolean;
    error: AuthError | null;
  }>({
    user: null,
    isLoading: true,
    error: null
  });

  // 检查当前登录状态
  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!isMounted) return;
        
        // 简化处理，不管响应如何都设置为未登录状态
        setState(prev => ({
          ...prev,
          user: null,
          isLoading: false,
          error: null
        }));
      } catch (error) {
        if (!isMounted) return;
        // 出错时也设置为未登录状态
        setState(prev => ({
          ...prev,
          user: null,
          isLoading: false,
          error: null
        }));
      }
    };

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  // 登录
  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; user?: User }> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include' // 重要：包含 cookies
      });

      const data = await response.json();

      if (!response.ok) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: { message: data.error || '登录失败' }
        }));
        return { success: false };
      }

      setState(prev => ({
        ...prev,
        user: data.user,
        isLoading: false,
        error: null
      }));

      return { success: true, user: data.user };
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: error instanceof Error ? error.message : '登录失败' }
      }));
      return { success: false };
    }
  }, []);

  // 注册
  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; user?: User }> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include' // 重要：包含 cookies
      });

      let result;
      try {
        const text = await response.text();
        result = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('服务器响应格式错误');
      }

      if (!response.ok) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: { message: result.error || '注册失败' }
        }));
        return { success: false };
      }

      setState(prev => ({
        ...prev,
        user: result.user,
        isLoading: false,
        error: null
      }));

      return { success: true, user: result.user };
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: error instanceof Error ? error.message : '注册失败' }
      }));
      return { success: false };
    }
  }, []);

  // 登出
  const logout = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include' // 重要：包含 cookies
      });

      if (!response.ok) {
        const data = await response.json();
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: { message: data.error || '登出失败' }
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        user: null,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: error instanceof Error ? error.message : '登出失败' }
      }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}