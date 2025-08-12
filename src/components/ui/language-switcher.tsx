'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'de', name: 'DE' },
  { code: 'fr', name: 'FR' },
  { code: 'pt', name: 'PT' },
  { code: 'es', name: 'ES' },
];

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      // Get current path safely
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
      
      // Remove current locale prefix if it exists
      const segments = currentPath.split('/').filter(Boolean);
      const hasLocale = segments.length > 0 && ['en', 'de', 'fr', 'pt', 'es'].includes(segments[0]);
      const targetPath = hasLocale ? '/' + segments.slice(1).join('/') : currentPath;
      
      if (nextLocale === 'en') {
        // English uses root URLs
        router.replace(targetPath);
      } else {
        // Other languages use locale prefix
        router.replace(targetPath === '/' ? `/${nextLocale}` : `/${nextLocale}${targetPath}`);
      }
    });
  }

  return (
    <Select
      defaultValue={locale}
      onValueChange={onSelectChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[80px] bg-background border-0 hover:bg-accent">
        <div className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <SelectValue placeholder="EN" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center">
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}