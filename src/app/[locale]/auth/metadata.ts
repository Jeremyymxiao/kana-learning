import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/auth`;
  
  return {
    title: t('authTitle'),
    description: t('authDescription'),
    keywords: [
      "login",
      "sign in",
      "account",
      "authentication",
      "user access",
      "japanese learning account"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/auth`,
        'de': `${baseUrl}/de/auth`,
        'fr': `${baseUrl}/fr/auth`,
        'pt': `${baseUrl}/pt/auth`,
        'es': `${baseUrl}/es/auth`
      }
    },
    openGraph: {
      title: t('authTitle'),
      description: t('authDescription'),
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: ["en_US", "de_DE", "fr_FR", "pt_PT", "es_ES"],
      siteName: t('siteName'),
      url: canonicalUrl
    }
  };
}