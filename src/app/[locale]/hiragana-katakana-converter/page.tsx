'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import MainLayout from '@/components/layouts/main-layout';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from 'next-intl';

export default function Converter() {
  const [hiragana, setHiragana] = useState('');
  const [katakana, setKatakana] = useState('');
  const [romaji, setRomaji] = useState('');
  const [lastChanged, setLastChanged] = useState<'hiragana' | 'katakana' | 'romaji' | null>(null);
  const t = useTranslations('ConverterPage');

  useEffect(() => {
    if (!lastChanged) return;

    const convert = async () => {
      try {
        const response = await fetch('/api/convert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: lastChanged === 'hiragana' ? hiragana : 
                  lastChanged === 'katakana' ? katakana : romaji,
            sourceType: lastChanged
          }),
        });

        if (!response.ok) throw new Error('转换失败');

        const data = await response.json();
        
        if (lastChanged !== 'hiragana') setHiragana(data.hiragana);
        if (lastChanged !== 'katakana') setKatakana(data.katakana);
        if (lastChanged !== 'romaji') setRomaji(data.romaji);
      } catch (error) {
        console.error('转换错误:', error);
      }
    };

    convert();
  }, [hiragana, katakana, romaji, lastChanged]);

  return (
    <MainLayout>
      <div className="relative min-h-screen bg-white dark:bg-[#1A1B2F]">
        {/* 装饰背景 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* 左上角大块 */}
          <div className="absolute top-0 left-0 w-full h-[70%] bg-[#64748B] transform -skew-y-6 opacity-10"></div>
          {/* 右侧块 */}
          <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-[#60A5FA] transform rotate-12 opacity-10"></div>
          {/* 左下角圆形 */}
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#64748B] rounded-full opacity-10"></div>
          {/* 右下角装饰 */}
          <div className="absolute bottom-[5%] right-[5%] w-[25%] h-[25%] bg-[#60A5FA] transform -rotate-12 opacity-10"></div>
          {/* 中间点缀 */}
          <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-[#93C5FD] rounded-full blur-3xl opacity-5"></div>
        </div>

        <div className="relative">
          <div className="container mx-auto px-4 py-12">
            {/* SEO-Optimized Header */}
            <div className="max-w-4xl mx-auto mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#64748B] to-[#60A5FA] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#64748B] to-[#60A5FA] text-transparent bg-clip-text">
                Hiragana Katakana Romaji Converter
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                {t('description')}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                Instantly convert between Japanese hiragana, katakana, and romaji with our accurate 
                text converter. Perfect for students, translators, and anyone learning Japanese writing systems.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Main Converter */}
              <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-xl mb-8">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('hiragana')}
                      </label>
                      <Input
                        value={hiragana}
                        onChange={(e) => {
                          setHiragana(e.target.value);
                          setLastChanged('hiragana');
                        }}
                        placeholder={t('inputPlaceholder')}
                        className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-14 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('katakana')}
                      </label>
                      <Input
                        value={katakana}
                        onChange={(e) => {
                          setKatakana(e.target.value);
                          setLastChanged('katakana');
                        }}
                        placeholder={t('inputPlaceholder')}
                        className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-14 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('romaji')}
                      </label>
                      <Input
                        value={romaji}
                        onChange={(e) => {
                          setRomaji(e.target.value);
                          setLastChanged('romaji');
                        }}
                        placeholder={t('inputPlaceholder')}
                        className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-14 text-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Content Sections */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Hiragana Conversion */}
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6">
                  <h2 className="text-2xl font-bold text-[#64748B] mb-4">
                    Hiragana Converter Features
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Convert hiragana text to katakana and romaji instantly. Our hiragana converter handles 
                    all 46 basic characters plus dakuten, handakuten, and combination sounds perfectly.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-[#64748B] mr-2">•</span>
                      <span><strong>Hiragana to Katakana:</strong> Perfect for loanword conversion</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#64748B] mr-2">•</span>
                      <span><strong>Hiragana to Romaji:</strong> Latin alphabet pronunciation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#64748B] mr-2">•</span>
                      <span><strong>Real-time:</strong> Instant conversion as you type</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#64748B] mr-2">•</span>
                      <span><strong>100% Accurate:</strong> Based on standard Hepburn romanization</span>
                    </li>
                  </ul>
                </div>

                {/* Katakana Conversion */}
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6">
                  <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">
                    Katakana Converter Benefits
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Transform katakana text to hiragana and romaji seamlessly. Essential for processing 
                    foreign loanwords, scientific terms, and emphasis in Japanese text.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-[#60A5FA] mr-2">•</span>
                      <span><strong>Katakana to Hiragana:</strong> Native pronunciation guide</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#60A5FA] mr-2">•</span>
                      <span><strong>Katakana to Romaji:</strong> Perfect for beginners</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#60A5FA] mr-2">•</span>
                      <span><strong>Business Ready:</strong> Handle technical vocabulary</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#60A5FA] mr-2">•</span>
                      <span><strong>Cross-platform:</strong> Works on all devices</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Romaji Conversion Guide */}
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 mb-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#64748B]">
                  Romaji to Japanese Converter Guide
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#64748B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Type Romaji</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Enter Latin alphabet text like &quot;konnichiwa&quot; to get こんにちは
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#60A5FA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Instant Conversion</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Real-time conversion to both hiragana and katakana simultaneously
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Copy & Use</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      One-click copying for immediate use in documents and messages
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#60A5FA]">
                  Hiragana Katakana Converter FAQ
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#64748B]">
                      Q: How accurate is this hiragana katakana converter?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      A: Our converter uses standard Hepburn romanization system for 100% accuracy. 
                      It handles all 46 basic characters, dakuten, handakuten, and combination sounds perfectly.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#64748B]">
                      Q: Can I convert romaji to both hiragana and katakana simultaneously?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      A: Yes! Simply type romaji in the romaji field and get instant conversion to both 
                      hiragana and katakana. Perfect for learning the differences between scripts.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#64748B]">
                      Q: Does this converter work with long vowels and special characters?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      A: Absolutely! Our converter properly handles long vowels (ā, ī, ū, ē, ō), 
                      sokuon (small tsu), and yōon (contracted sounds) for complete accuracy.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#64748B]">
                      Q: Is this hiragana katakana converter free to use?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      A: Yes! Our Japanese text converter is completely free with no limits on usage. 
                      Perfect for students, teachers, and professionals working with Japanese text.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}