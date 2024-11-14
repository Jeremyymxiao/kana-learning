'use client'

// src/app/components/auth/login-form.tsx
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(event.currentTarget)
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn('google', { 
        callbackUrl: '/',
        redirect: true 
      });
      console.log('Google sign in result:', result);
    } catch (error) {
      console.error('Google sign in error:', error);
      setError('Google登录失败,请稍后重试');
    }
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError('')
  
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')
  
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        throw new Error(data.error || '注册失败')
      }
  
      // 注册成功后自动登录
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
  
      if (signInResult?.error) {
        setError(signInResult.error)
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('发生未知错误')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-semibold">{isRegister ? 'Create an account' : 'Login to account'}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Welcome to Kana Learning
      </p>
    </div>

    <form onSubmit={isRegister ? handleRegister : onSubmit} className="space-y-4">
      {isRegister && (
        <div className="space-y-2">
          <Input
            name="name"
            type="text"
            placeholder="Name"
            required={isRegister}
          />
        </div>
      )}
        <div className="space-y-2">
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        {error && (
          <div className="text-sm text-red-500">
            {error}
          </div>
        )}
        <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        >
        {isLoading 
            ? (isRegister ? 'Creating account...' : 'Logging in...') 
            : (isRegister ? 'Create account' : 'Login')}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleLogin}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        {isRegister ? 'Sign up with Google' : 'Login with Google'}
      </Button>

      <div className="text-center text-sm">
        <span className="text-gray-500 dark:text-gray-400">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        </span>
        <button 
            type="button"
            onClick={() => setIsRegister(!isRegister)} 
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
            {isRegister ? 'Login' : 'Create account'}
        </button>
        </div>

    </div>
  )
}