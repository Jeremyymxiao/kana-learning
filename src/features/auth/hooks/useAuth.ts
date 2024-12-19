import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginCredentials, RegisterData, AuthState, User } from '../types'

export const useAuth = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: status === 'loading',
    error: null,
    session
  })

  useEffect(() => {
    console.log('useAuth - session:', session);
    console.log('useAuth - status:', status);
  }, [session, status]);

  // 登录
  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; user?: User }> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      console.log('Attempting login with credentials:', { email: credentials.email });
      
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: true,
        callbackUrl: '/'
      })

      console.log('Login result:', result);
      return { success: true }
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: error instanceof Error ? error.message : '登录失败' }
      }))
      return { success: false }
    }
  }, [])

  // 注册
  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; user?: User }> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      console.log('Attempting registration with data:', { email: data.email, username: data.username });
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      console.log('Registration result:', result);

      if (!response.ok) {
        throw new Error(result.error || '注册失败')
      }

      // 注册成功后直接登录并重定向
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/'
      })

      return { success: true, user: result.user }
    } catch (error) {
      console.error('Registration error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: error instanceof Error ? error.message : '注册失败' }
      }))
      return { success: false }
    }
  }, [])

  // 登出
  const logout = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      console.log('Attempting logout');
      
      await signOut({ 
        redirect: true,
        callbackUrl: '/'
      })
    } catch (error) {
      console.error('Logout error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: error instanceof Error ? error.message : '登出失败' }
      }))
    }
  }, [])

  return {
    user: session?.user ? {
      id: session.user.id,
      email: session.user.email!,
      username: session.user.username,
      role: session.user.role,
      image: session.user.image
    } : null,
    isLoading: status === 'loading',
    error: state.error,
    login,
    register,
    logout
  }
} 