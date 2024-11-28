'use client';

import { LoginForm } from '@/components/auth/login-form';
import MainLayout from '@/components/layouts/main-layout';

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to continue your Japanese learning journey
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </MainLayout>
  );
}