'use client';

import MainLayout from '@/components/layouts/main-layout';
import { GojuonTable } from "@/features/kana/components/gojuon-table";
import { useTranslations } from 'next-intl';

export default function ChartPage() {
  const t = useTranslations('ChartPage');

  return (
    <MainLayout currentTab="chart">
      <div className="relative min-h-screen bg-white dark:bg-[#1A1B2F]">
        {/* 全屏装饰背景 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* 左上角大块 */}
          <div className="absolute top-0 left-0 w-full h-[70%] bg-[#F59E0B] transform -skew-y-6 opacity-10"></div>
          {/* 右侧色块 */}
          <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-[#FCD34D] transform rotate-12 opacity-10"></div>
          {/* 左下角圆形 */}
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#FBBF24] rounded-full opacity-10"></div>
          {/* 右下角装饰 */}
          <div className="absolute bottom-[5%] right-[5%] w-[25%] h-[25%] bg-[#F97316] transform -rotate-12 opacity-10"></div>
          {/* 中间点缀 */}
          <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-[#FDE68A] rounded-full blur-3xl opacity-5"></div>
        </div>

        <div className="relative">
          <div className="container mx-auto px-4 py-12">
            {/* SEO-Optimized Header */}
            <header className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-transparent bg-clip-text">
                Complete Hiragana & Katakana Chart
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('description')}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-4xl mx-auto">
                Master Japanese hiragana and katakana with our comprehensive reference chart featuring 
                all 46 basic characters plus dakuten, handakuten, and combination sounds. Perfect for 
                beginners learning Japanese writing systems and advanced learners seeking quick reference.
              </p>
            </header>

            {/* Chart Section */}
            <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 mb-8">
              <section aria-label={t('title')}>
                <GojuonTable />
              </section>
            </div>

            {/* SEO Content Sections */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Hiragana Guide */}
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6">
                <h2 className="text-2xl font-bold text-[#F59E0B] mb-4">
                  Hiragana Chart Guide
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The hiragana chart contains 46 basic phonetic characters representing every sound in the 
                  Japanese language. These curved, flowing symbols are essential for writing native Japanese 
                  words, grammatical particles, and verb endings.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#F59E0B] mr-2">•</span>
                    <span><strong>Basic Hiragana:</strong> 46 fundamental characters from あ to ん</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F59E0B] mr-2">•</span>
                    <span><strong>Dakuten:</strong> 20 voiced sounds with ゛mark (が, ざ, だ, ば)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F59E0B] mr-2">•</span>
                    <span><strong>Handakuten:</strong> 5 semi-voiced sounds with ゜mark (ぱ, ぴ, ぷ, ぺ, ぽ)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F59E0B] mr-2">•</span>
                    <span><strong>Combinations:</strong> 33 contracted sounds (きゃ, しゅ, ちょ)</span>
                  </li>
                </ul>
              </div>

              {/* Katakana Guide */}
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6">
                <h2 className="text-2xl font-bold text-[#F97316] mb-4">
                  Katakana Chart Guide
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The katakana chart mirrors hiragana with 46 angular characters used primarily for 
                  foreign loanwords, emphasis, and technical terms. Mastering both scripts is crucial 
                  for complete Japanese literacy.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    <span><strong>Basic Katakana:</strong> 46 core characters from ア to ン</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    <span><strong>Foreign Words:</strong> Essential for English loanwords (コーヒー, パソコン)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    <span><strong>Scientific Terms:</strong> Used for technical and scientific vocabulary</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    <span><strong>Onomatopoeia:</strong> Perfect for sound effects and mimetic words</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Learning Tips Section */}
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 mb-8">
              <h2 className="text-3xl font-bold text-center mb-6 text-[#F59E0B]">
                Master Japanese Kana: Learning Tips
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#F59E0B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Daily Practice</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Spend 15-20 minutes daily with our hiragana and katakana charts to build muscle memory
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Stroke Order</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Follow proper stroke order for each hiragana and katakana character to improve writing
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FBBF24]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔊</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Audio Practice</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Listen to native pronunciation for each kana character to perfect your Japanese sounds
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
              <h2 className="text-3xl font-bold text-center mb-6 text-[#F97316]">
                Hiragana & Katakana Chart FAQ
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2 text-[#F59E0B]">
                    Q: How many characters are in the complete hiragana and katakana charts?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    A: Each chart contains 46 basic characters, 25 voiced sounds (dakuten), 5 semi-voiced sounds (handakuten), 
                    and 33 combination sounds, totaling over 100 unique characters per script system.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-[#F59E0B]">
                    Q: Should I learn hiragana or katakana first?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    A: Start with hiragana as it&apos;s more fundamental for basic Japanese grammar and vocabulary. 
                    Once comfortable with hiragana, progress to katakana for foreign loanwords and emphasis.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-[#F59E0B]">
                    Q: How long does it take to master both hiragana and katakana charts?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    A: With consistent daily practice using our hiragana and katakana charts, most learners achieve 
                    basic recognition within 2-4 weeks and full mastery within 6-8 weeks.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-[#F59E0B]">
                    Q: Are these hiragana and katakana charts suitable for complete beginners?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    A: Absolutely! Our comprehensive hiragana and katakana charts are designed for all skill levels, 
                    from absolute beginners to advanced learners seeking reference materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}