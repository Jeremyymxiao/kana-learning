'use client';

import { ReactNode, useEffect } from 'react';
import { NavBar } from "@/features/kana/components/nav-bar";
import Footer from './footer';
import { useAuthContext } from '@/features/auth/components/auth-provider';
import { useNavigation } from '@/features/kana/components/navigation-provider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { User } from '@/features/auth/types';

interface MainLayoutProps {
  children: ReactNode;
  currentTab?: string;
}

const ROUTE_TO_TAB: Record<string, string> = {
  '/': 'home',
  '/chat': 'chat',
  '/hiragana-katakana-quiz': 'quiz',
  '/hiragana-katakana-chart': 'chart',
  '/hiragana-katakana-converter': 'converter',
  '/learn': 'learn'
};

const AuthButtons: React.FC<{ user: User | null; isLoading: boolean; logout: () => Promise<void> }> = ({
  user,
  isLoading,
  logout
}) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={async () => {
            await logout();
            router.push('/');
          }}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={() => router.push('/login')}
    >
      Login
    </Button>
  );
};

export default function MainLayout({
  children,
}: MainLayoutProps) {
  const auth = useAuthContext();
  const pathname = usePathname();
  const { setCurrentTab } = useNavigation();

  useEffect(() => {
    const baseRoute = '/' + pathname.split('/')[1];
    const tab = ROUTE_TO_TAB[baseRoute] || 'home';
    setCurrentTab(tab);
  }, [pathname, setCurrentTab]);

  useEffect(() => {
    console.log('Auth state:', {
      user: auth.user,
      isLoading: auth.isLoading,
      error: auth.error
    });
  }, [auth.user, auth.isLoading, auth.error]);

  if (!auth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">认证上下文未初始化</h2>
          <p className="text-gray-600">请确保应用被正确包裹在 AuthProvider 中</p>
        </div>
      </div>
    );
  }

  const { user, isLoading, logout } = auth;

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar 
        authButtons={
          <div className="flex items-center space-x-4">
            <AuthButtons user={user} isLoading={isLoading} logout={logout} />
          </div>
        }
      />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}