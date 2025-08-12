'use client';

import { Suspense } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import { AuthForm } from '@/components/auth/AuthForm';

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join LearnKana to start your Japanese learning journey
            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <AuthForm mode="register" />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
}