// src/app/login/page.tsx
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            アカウントにログイン
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            かなラーニングへようこそ
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}