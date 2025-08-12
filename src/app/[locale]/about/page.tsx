'use client';

import MainLayout from '@/components/layouts/main-layout';
import { GithubIcon, TwitterIcon, MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  return (
    <MainLayout currentTab="about">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">{t('mission')}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t('missionText')}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">{t('features')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">{t('interactiveLearning')}</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• {t('dynamicChart')}</li>
                    <li>• {t('realTimeFeedback')}</li>
                    <li>• {t('customizablePaths')}</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">{t('comprehensiveTesting')}</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• {t('quizFormats')}</li>
                    <li>• {t('adaptiveDifficulty')}</li>
                    <li>• {t('performanceAnalytics')}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">{t('whyChoose')}</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li>✓ {t('researchBased')}</li>
                  <li>✓ {t('regularUpdates')}</li>
                  <li>✓ {t('communityDriven')}</li>
                  <li>✓ {t('crossPlatform')}</li>
                  <li>✓ {t('freeOpenSource')}</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">{t('connect')}</h2>
              <div className="flex flex-wrap gap-6 justify-center">
                <a href="https://github.com/yourusername" className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:opacity-90 transition-opacity">
                  <GithubIcon className="w-5 h-5" />
                  <span>{t('github')}</span>
                </a>
                <a href="https://twitter.com/yourusername" className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                  <TwitterIcon className="w-5 h-5" />
                  <span>{t('twitter')}</span>
                </a>
                <a href="mailto:contact@learnkana.com" className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                  <MailIcon className="w-5 h-5" />
                  <span>{t('emailUs')}</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}