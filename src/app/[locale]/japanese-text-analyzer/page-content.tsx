'use client';

import { useState, useCallback, useRef } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function AnalyzerPageContent() {
  const [inputText, setInputText] = useState('');
  const [resultHtml, setResultHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations('AnalyzerPage');

  const analyzeText = useCallback(async (text: string) => {
    if (!text.trim()) {
      setResultHtml('');
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/furigana', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to analyze text');
      }

      const data = await response.json();
      setResultHtml(data.html);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      analyzeText(value);
    }, 500);
  }, [analyzeText]);

  const handleAnalyzeClick = useCallback(() => {
    analyzeText(inputText);
  }, [analyzeText, inputText]);

  return (
    <MainLayout currentTab="analyzer">
      <div className="relative min-h-screen bg-white dark:bg-[#1A1B2F]">
        {/* Decorative background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[70%] bg-[#8B5CF6] transform -skew-y-6 opacity-10"></div>
          <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-[#EC4899] transform rotate-12 opacity-10"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#A78BFA] rounded-full opacity-10"></div>
          <div className="absolute bottom-[5%] right-[5%] w-[25%] h-[25%] bg-[#F472B6] transform -rotate-12 opacity-10"></div>
          <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-[#C4B5FD] rounded-full blur-3xl opacity-5"></div>
        </div>

        <div className="relative">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-transparent bg-clip-text">
                  {t('title')}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {t('description')}
                </p>
              </div>

              {/* Input Card */}
              <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-xl mb-6">
                <CardContent className="p-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('inputLabel')}
                  </label>
                  <textarea
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder={t('inputPlaceholder')}
                    className="w-full h-40 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-lg font-japanese resize-none focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                    maxLength={5000}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500">
                      {inputText.length} / 5000
                    </span>
                    <Button
                      onClick={handleAnalyzeClick}
                      disabled={isLoading || !inputText.trim()}
                      className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:opacity-90 text-white"
                    >
                      {isLoading ? t('analyzing') : t('analyzeButton')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Result Card */}
              {(resultHtml || error) && (
                <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-xl mb-8">
                  <CardContent className="p-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('resultLabel')}
                    </label>
                    {error ? (
                      <p className="text-red-500">{error}</p>
                    ) : (
                      <div
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-2xl leading-loose font-japanese"
                        dangerouslySetInnerHTML={{ __html: resultHtml }}
                      />
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
