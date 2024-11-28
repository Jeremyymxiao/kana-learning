import { useState, useCallback, useEffect } from 'react';
import { User, LoginCredentials, RegisterData, AuthError } from '@/types/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  });

  // 检查当前登录状态
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (response.ok) {
          const data = await response.json();
          setState(prev => ({
            ...prev,
            user: data.user,
            isLoading: false
          }));
        } else {
          setState(prev => ({
            ...prev,
            user: null,
            isLoading: false
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          user: null,
          isLoading: false,
          error: { message: '验证用户状态失败' }
        }));
      }
    };

    checkAuth();
  }, []);

  // 登录
  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; user?: User }> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '登录失败');
      }

      setState(prev => ({
        ...prev,
        user: data.user,
        isLoading: false
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
        body: JSON.stringify(data)
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
        throw new Error(result.error || '注册失败');
      }

      setState(prev => ({
        ...prev,
        user: result.user,
        isLoading: false
      }));

      return { success: true, user: result.user };
    } catch (error) {
      console.error('Registration error:', error);
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
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('登出失败');
      }

      setState(prev => ({
        ...prev,
        user: null,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: error instanceof Error ? error.message : '登出失败' }
      }));
    }
  }, []);

  return {
    ...state,
    login,
    register,
    logout
  };
};