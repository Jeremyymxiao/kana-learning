'use client';

import MainLayout from '@/components/layouts/main-layout';
import { MessageSquare, Table, PenTool, ArrowRight, Repeat, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function LandingPage() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <header 
        className="relative bg-[#1A1B2F] dark:bg-[#1A1B2F] overflow-hidden"
        role="banner"
      >
        {/* 大面积色块装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-[70%] bg-[#2B7FFF] transform -skew-y-6"></div>
          <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-[#FFD600] transform rotate-12 opacity-90"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#FF7E67] rounded-full opacity-80"></div>
          <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-[#00D6A4] transform -rotate-12 opacity-90"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-20 sm:pt-28 md:pt-32 pb-14 sm:pb-18 md:pb-20">
          {/* 主标题区域 */}
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-[1.05]">
              <span className="text-[#FF7E67] block">
                {t('aiPowered')}
              </span>
              <span className="text-white block mb-4">
                {t('freeHiraganaKatakana')}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-3xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12">
              {t('heroDescription')}
            </p>

            {/* CTA Button */}
            <div className="mb-8 sm:mb-12">
              <Link 
                href={`/${locale}/hiragana-katakana-quiz`}
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#FF7E67] to-[#FFD600] text-[#1A1B2F] rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl group"
              >
                {t('startQuiz')}
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 功能预览列表 */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10 md:gap-16 text-center">
              <Link href={`/${locale}/chat`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                <span className="text-base sm:text-lg md:text-xl">{t('aiTutor')}</span>
              </Link>
              <Link href={`/${locale}/hiragana-katakana-quiz`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <PenTool className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                <span className="text-base sm:text-lg md:text-xl">{t('kanaPractice')}</span>
              </Link>
              <Link href={`/${locale}/hiragana-katakana-chart`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Table className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                <span className="text-base sm:text-lg md:text-xl">{t('kanaCharts')}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Features Section */}
        <section 
          aria-labelledby="features-heading"
          className="py-24 bg-white dark:bg-[#1A1B2F]"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-16 text-[#1A1B2F] dark:text-white text-center">
                {t('featuresTitle')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AI Tutor Feature */}
                <Link href={`/${locale}/chat`} className="group">
                  <div className="relative bg-gradient-to-br from-[#2B7FFF] to-[#00D6A4] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#2B7FFF] rounded-xl flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">{t('aiTutor')}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        {t('aiTutorDesc')}
                      </p>
                      <div className="flex items-center text-[#2B7FFF] font-semibold text-sm">
                        {t('learnMore')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Kana Charts Feature */}
                <Link href={`/${locale}/hiragana-katakana-chart`} className="group">
                  <div className="relative bg-gradient-to-br from-[#FFD600] to-[#FF7E67] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#FFD600] rounded-xl flex items-center justify-center mb-4">
                        <Table className="w-6 h-6 text-[#1A1B2F]" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">{t('kanaCharts')}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        {t('kanaChartsDesc')}
                      </p>
                      <div className="flex items-center text-[#FFD600] font-semibold text-sm">
                        {t('learnMore')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Kana Practice Feature */}
                <Link href={`/${locale}/hiragana-katakana-quiz`} className="group">
                  <div className="relative bg-gradient-to-br from-[#00D6A4] to-[#2B7FFF] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#00D6A4] rounded-xl flex items-center justify-center mb-4">
                        <PenTool className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">{t('kanaPractice')}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        {t('kanaPracticeDesc')}
                      </p>
                      <div className="flex items-center text-[#00D6A4] font-semibold text-sm">
                        {t('learnMore')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Text Converter Feature */}
                <Link href={`/${locale}/hiragana-katakana-converter`} className="group">
                  <div className="relative bg-gradient-to-br from-[#FF7E67] to-[#FFD600] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#FF7E67] rounded-xl flex items-center justify-center mb-4">
                        <Repeat className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">{t('textConverter')}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        {t('textConverterDesc')}
                      </p>
                      <div className="flex items-center text-[#FF7E67] font-semibold text-sm">
                        {t('learnMore')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Kana Introduction Section */}
        <section className="py-24 bg-gray-50 dark:bg-[#1A1B2F]/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#1A1B2F] dark:text-white">
                Master Both Kana Systems
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-[#1A1B2F] p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-[#FF7E67]">Hiragana</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The fundamental Japanese phonetic script used for native words, particles, and verb conjugations.
                  </p>
                  <Link href={`/${locale}/hiragana-katakana-chart`} className="text-[#FF7E67] font-semibold hover:underline">
                    Learn Hiragana →
                  </Link>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-[#2B7FFF]">Katakana</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Used for foreign loanwords, emphasis, and technical terms in Japanese writing.
                  </p>
                  <Link href={`/${locale}/hiragana-katakana-chart`} className="text-[#2B7FFF] font-semibold hover:underline">
                    Learn Katakana →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-24 bg-white dark:bg-[#1A1B2F]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#1A1B2F] dark:text-white">
                Learning Guides
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Link href={`/${locale}/learn`} className="group">
                  <div className="bg-gradient-to-br from-[#2B7FFF]/10 to-[#00D6A4]/10 p-6 rounded-2xl hover:shadow-lg transition-all">
                    <BookOpen className="w-12 h-12 mb-4 text-[#2B7FFF]" />
                    <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">{t('hiraganaGuide')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{t('hiraganaGuideDesc')}</p>
                    <span className="text-[#2B7FFF] font-semibold">Learn More →</span>
                  </div>
                </Link>
                <Link href={`/${locale}/learn`} className="group">
                  <div className="bg-gradient-to-br from-[#FFD600]/10 to-[#FF7E67]/10 p-6 rounded-2xl hover:shadow-lg transition-all">
                    <BookOpen className="w-12 h-12 mb-4 text-[#FFD600]" />
                    <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">{t('katakanaGuide')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{t('katakanaGuideDesc')}</p>
                    <span className="text-[#FFD600] font-semibold">Learn More →</span>
                  </div>
                </Link>
                <Link href={`/${locale}/hiragana-katakana-quiz`} className="group">
                  <div className="bg-gradient-to-br from-[#00D6A4]/10 to-[#2B7FFF]/10 p-6 rounded-2xl hover:shadow-lg transition-all">
                    <BookOpen className="w-12 h-12 mb-4 text-[#00D6A4]" />
                    <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">{t('combinedGuide')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{t('combinedGuideDesc')}</p>
                    <span className="text-[#00D6A4] font-semibold">Learn More →</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gray-50 dark:bg-[#1A1B2F]/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#1A1B2F] dark:text-white">
                {t('faqTitle')}
              </h2>
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">{t('faq1Question')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('faq1Answer')}</p>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">{t('faq2Question')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('faq2Answer')}</p>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">{t('faq3Question')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('faq3Answer')}</p>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">{t('faq4Question')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('faq4Answer')}</p>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">{t('faq5Question')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('faq5Answer')}</p>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">{t('faq6Question')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('faq6Answer')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}