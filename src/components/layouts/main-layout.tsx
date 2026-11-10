'use client';

import { ReactNode, useEffect } from 'react';
import { NavBar } from "@/features/kana/components/nav-bar";
import Footer from './footer';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigation } from '@/features/kana/components/navigation-provider';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname, Link } from '../../../i18n.config';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/tracking';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AuthUser } from '@/types/auth';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface MainLayoutProps {
  children: ReactNode;
  currentTab?: string;
  /** 首页等需要全宽视觉世界的页面：跳过容器的 padding 与最大宽度 */
  fullBleed?: boolean;
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
  const t = useTranslations('Navigation');

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

  // 未登录：注册是主行动，登录次之——两者都必须能在首屏点得到。
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        asChild
        onClick={() => trackEvent('login_click', { location: 'nav' })}
      >
        <Link href="/login">{t('login')}</Link>
      </Button>
      <Button
        size="sm"
        asChild
        onClick={() => trackEvent('signup_click', { location: 'nav' })}
      >
        <Link href="/register">{t('register')}</Link>
      </Button>
    </div>
  );
};

export default function MainLayout({
  children,
  fullBleed = false,
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
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <AuthButtons user={user} loading={loading} signOut={signOut} />
          </div>
        }
      />
      <main
        className={
          fullBleed
            ? 'flex-grow pt-16'
            : 'flex-grow container mx-auto px-4 py-8 mt-16'
        }
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}