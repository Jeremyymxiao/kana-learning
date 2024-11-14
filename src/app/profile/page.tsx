'use client';

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import NavBar from '@/components/japanese/nav-bar';

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen p-8">
        <NavBar />
        <Card>
          <CardHeader>
            <CardTitle>未登录</CardTitle>
          </CardHeader>
          <CardContent>
            <p>请先登录以查看个人资料</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen p-8 pt-20">
        <Card>
          <CardHeader>
            <CardTitle>个人资料</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              {session.user?.image && (
                <img 
                  src={session.user.image} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{session.user?.name}</h2>
                <p className="text-gray-600">{session.user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium">学习统计</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">完成测试</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">正确率</p>
                    <p className="text-2xl font-bold">0%</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => signOut({ callbackUrl: '/' })}
                variant="outline"
                className="w-full"
              >
                退出登录
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}