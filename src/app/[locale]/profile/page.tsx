'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import MainLayout from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const locale = useLocale();

  useEffect(() => {
    if (!loading && !user) {
      const loginPath = locale === 'en' ? '/login' : `/${locale}/login`;
      router.push(loginPath);
    }
  }, [user, loading, router, locale]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto p-6">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Display Name</label>
                <p className="mt-1">{user.displayName || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email Verified</label>
                <p className="mt-1">{user.emailVerified ? 'Yes' : 'No'}</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  const settingsPath = locale === 'en' ? '/settings' : `/${locale}/settings`;
                  router.push(settingsPath);
                }}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Days Studied</label>
                <p className="mt-1">0 days</p>
              </div>
              <div>
                <label className="text-sm font-medium">Quizzes Completed</label>
                <p className="mt-1">0 quizzes</p>
              </div>
              <div>
                <label className="text-sm font-medium">Practice Sessions</label>
                <p className="mt-1">0 sessions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 