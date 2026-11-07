import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/profile');

  return {
    title: t('profileTitle'),
    description: t('profileDescription'),
    robots: { index: false, follow: true },
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/profile'),
    },
    openGraph: {
      title: t('profileTitle'),
      description: t('profileDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl
    }
  };
}
