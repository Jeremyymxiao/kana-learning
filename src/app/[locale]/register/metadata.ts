import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/register');

  return {
    title: t('registerTitle'),
    description: t('registerDescription'),
    robots: { index: false, follow: true },
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/register'),
    },
    openGraph: {
      title: t('registerTitle'),
      description: t('registerDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl
    }
  };
}
