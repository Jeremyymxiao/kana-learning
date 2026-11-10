import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { curriculum } from '@/data/curriculum';
import {
  generateHreflangs,
  getCanonicalUrl,
  getOgLocale,
  getAlternateOgLocales,
  BASE_URL,
} from '@/lib/seo-utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Course' });
  const tm = await getTranslations({ locale, namespace: 'Metadata' });

  const title = t('title');
  const description = t('subtitle');
  const canonicalUrl = getCanonicalUrl(locale, '/course');
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=article&locale=${locale}`;

  return {
    title,
    description,
    keywords: [
      'hiragana course',
      'katakana course',
      'learning path',
      'japanese kana curriculum',
      'hiragana study plan',
      'katakana study plan',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/course'),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: tm('siteName'),
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@learnkana',
    },
  };
}

/**
 * ItemList（7 个 LearningResource）+ BreadcrumbList。
 * 单元名称/目标全部来自 i18n，避免结构化数据和服务端渲染文案漂移。
 */
export async function generateStructuredData({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Course' });
  const tn = await getTranslations({ locale, namespace: 'Navigation' });
  const canonicalUrl = getCanonicalUrl(locale, '/course');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: t('title'),
        description: t('subtitle'),
        url: canonicalUrl,
        numberOfItems: curriculum.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: curriculum.map((unit) => ({
          '@type': 'ListItem',
          position: unit.order,
          item: {
            '@type': 'LearningResource',
            '@id': `${canonicalUrl}#${unit.id}`,
            name: t(`units.${unit.id}.title`),
            description: t(`units.${unit.id}.goal`),
            url: `${canonicalUrl}#${unit.id}`,
            inLanguage: locale,
            educationalLevel: 'Beginner',
            learningResourceType: 'Lesson',
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: tn('home'), item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: t('title'), item: canonicalUrl },
        ],
      },
    ],
  };
}
