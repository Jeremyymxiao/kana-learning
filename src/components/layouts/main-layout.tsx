'use client';

import { ReactNode, useEffect } from 'react';
import { NavBar } from "@/features/kana/components/nav-bar";
import Footer from './footer';
import { useAuth } from '@/providers/AuthProvider';
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
import { AuthUser } from '@/types/auth';

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

const AuthButtons: React.FC<{ user: AuthUser | null; loading: boolean; signOut: () => Promise<void> }> = ({
  user,
  loading,
  signOut
}) => {
  const router = useRouter();

  if (loading) {
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
                {user.email?.[0].toUpperCase() || 'U'}
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
            await signOut();
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
      onClick={() => router.push('/auth?mode=login')}
    >
      Login
    </Button>
  );
};

export default function MainLayout({
  children,
}: MainLayoutProps) {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const { setCurrentTab } = useNavigation();

  useEffect(() => {
    const baseRoute = '/' + pathname.split('/')[1];
    const tab = ROUTE_TO_TAB[baseRoute] || 'home';
    setCurrentTab(tab);
  }, [pathname, setCurrentTab]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar 
        authButtons={
          <div className="flex items-center space-x-4">
            <AuthButtons user={user} loading={loading} signOut={signOut} />
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