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
          <h2 className="mt-4 text-gray-600">Loading...</h2>
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
    const returnTo = searchParams?.get('returnTo') || '/';
    if (user && window.location.pathname === '/auth') {
      router.replace(returnTo);
    }
  }, [user, router, searchParams]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Reset Password'}
        </h2>
        
        <div className="mt-2 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign Up
              </button>
              {' | '}
              <button
                onClick={() => setMode('reset')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot Password
              </button>
            </>
          ) : mode === 'register' ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Remember your password?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Back to Sign In
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