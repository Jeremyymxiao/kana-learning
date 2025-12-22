import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/profile`;
  
  return {
    title: t('profileTitle'),
    description: t('profileDescription'),
    keywords: [
      "user profile",
      "learning progress",
      "account settings",
      "personal dashboard",
      "japanese learning stats"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/profile`,
        'de': `${baseUrl}/de/profile`,
        'fr': `${baseUrl}/fr/profile`,
        'pt': `${baseUrl}/pt/profile`,
        'es': `${baseUrl}/es/profile`
      }
    },
    openGraph: {
      title: t('profileTitle'),
      description: t('profileDescription'),
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: ["en_US", "de_DE", "fr_FR", "pt_PT", "es_ES"],
      siteName: t('siteName'),
      url: canonicalUrl
    }
  };
}