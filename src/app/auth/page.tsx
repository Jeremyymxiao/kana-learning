'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/providers/AuthProvider';

function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <h2 className="mt-4 text-gray-600">加载中...</h2>
        </div>
      </div>
    </div>
  );
}

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>(
    (searchParams?.get('mode') as 'login' | 'register' | 'reset') || 'login'
  );

  useEffect(() => {
    if (user) {
      const returnTo = searchParams?.get('returnTo') || '/';
      router.push(returnTo);
    }
  }, [user, router, searchParams]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === 'login' ? '登录账号' : mode === 'register' ? '注册新账号' : '重置密码'}
        </h2>
        
        <div className="mt-2 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <>
              还没有账号？{' '}
              <button
                onClick={() => setMode('register')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                立即注册
              </button>
              {' | '}
              <button
                onClick={() => setMode('reset')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                忘记密码
              </button>
            </>
          ) : mode === 'register' ? (
            <>
              已有账号？{' '}
              <button
                onClick={() => setMode('login')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                立即登录
              </button>
            </>
          ) : (
            <>
              记起密码了？{' '}
              <button
                onClick={() => setMode('login')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                返回登录
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm mode={mode} />
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AuthContent />
    </Suspense>
  );
} 