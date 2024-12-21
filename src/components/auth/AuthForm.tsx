'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface AuthFormProps {
  mode: 'login' | 'register' | 'reset';
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get('returnTo') || '/';

  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'register' && password !== confirmPassword) {
        throw new Error('密码不匹配');
      }

      switch (mode) {
        case 'login':
          await signInWithEmail(email, password);
          break;
        case 'register':
          await signUpWithEmail(email, password);
          break;
        case 'reset':
          await resetPassword(email);
          // 显示成功消息并返回登录页面
          alert('重置密码邮件已发送，请查收');
          router.push('/auth?mode=login');
          return;
      }

      // 登录或注册成功后跳转
      router.push(returnTo);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithGoogle();
      router.push(returnTo);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              required
            />
          </div>

          {mode !== 'reset' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">密码</Label>
                {mode === 'login' && (
                  <Link
                    href="/auth?mode=reset"
                    className="text-sm text-primary hover:underline"
                  >
                    忘记密码？
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                required
              />
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入密码"
                required
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? '处理中...'
              : mode === 'login'
              ? '登录'
              : mode === 'register'
              ? '注册'
              : '重置密码'}
          </Button>
        </form>

        {mode !== 'reset' && (
          <>
            <div className="relative my-4">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-muted-foreground">
                或
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading ? '处理中...' : `使用 Google 账号${mode === 'login' ? '登录' : '注册'}`}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

function getErrorMessage(error: any): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('user-not-found')) {
      return '用户不存在';
    }
    if (message.includes('wrong-password')) {
      return '密码错误';
    }
    if (message.includes('email-already-in-use')) {
      return '该邮箱已被注册';
    }
    if (message.includes('weak-password')) {
      return '密码强度太弱，请使用至少6个字符';
    }
    if (message.includes('invalid-email')) {
      return '邮箱格式不正确';
    }
    if (message.includes('too-many-requests')) {
      return '登录尝试次数过多，请稍后再试';
    }
    
    return error.message;
  }
  
  return '操作失败，请稍后重试';
} 