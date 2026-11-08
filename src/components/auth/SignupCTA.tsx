'use client';

import { Link } from '../../../i18n.config';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/tracking';

interface SignupCTAProps {
  context: string;
  className?: string;
}

/**
 * 结果页/练习结束后的「保存进度」入口。
 * 未登录时才展示——这是当前全站唯一能通往注册的转化路径。
 */
export function SignupCTA({ context, className }: SignupCTAProps) {
  const { user, loading } = useAuth();

  if (loading || user) return null;

  return (
    <div
      className={
        className ??
        'rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20'
      }
    >
      <p className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
        Save your progress
      </p>
      <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
        Create a free account to keep your streak and review mistakes across devices.
      </p>
      <Button asChild className="w-full" onClick={() => trackEvent('signup_cta_click', { context })}>
        <Link href="/register">Create free account</Link>
      </Button>
    </div>
  );
}
