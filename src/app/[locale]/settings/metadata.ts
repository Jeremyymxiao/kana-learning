import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/settings`;
  
  return {
    title: t('settingsTitle'),
    description: t('settingsDescription'),
    keywords: [
      "settings",
      "preferences",
      "customization",
      "language settings",
      "notification preferences",
      "learning options"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/settings`,
        'de': `${baseUrl}/de/settings`,
        'fr': `${baseUrl}/fr/settings`,
        'pt': `${baseUrl}/pt/settings`,
        'es': `${baseUrl}/es/settings`
      }
    },
    openGraph: {
      title: t('settingsTitle'),
      description: t('settingsDescription'),
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: ["en_US", "de_DE", "fr_FR", "pt_PT", "es_ES"],
      siteName: t('siteName'),
      url: canonicalUrl
    }
  };
}