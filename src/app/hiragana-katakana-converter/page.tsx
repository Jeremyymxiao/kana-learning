'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import MainLayout from '@/components/layouts/main-layout';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Converter() {
  const [hiragana, setHiragana] = useState('');
  const [katakana, setKatakana] = useState('');
  const [romaji, setRomaji] = useState('');
  const [lastChanged, setLastChanged] = useState<'hiragana' | 'katakana' | 'romaji' | null>(null);

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

        {/* 内容区域 */}
        <div className="relative">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
              {/* 标题部分 */}
              <div className="mb-8 text-center">
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
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#64748B] to-[#60A5FA] text-transparent bg-clip-text">
                  Japanese Text Converter
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Convert text between Hiragana, Katakana and Romaji
                </p>
              </div>

              {/* 转换器卡片 */}
              <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-xl">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hiragana
                      </label>
                      <Input
                        value={hiragana}
                        onChange={(e) => {
                          setHiragana(e.target.value);
                          setLastChanged('hiragana');
                        }}
                        placeholder="Enter hiragana..."
                        className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-14 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Katakana
                      </label>
                      <Input
                        value={katakana}
                        onChange={(e) => {
                          setKatakana(e.target.value);
                          setLastChanged('katakana');
                        }}
                        placeholder="Enter katakana..."
                        className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-14 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Romaji
                      </label>
                      <Input
                        value={romaji}
                        onChange={(e) => {
                          setRomaji(e.target.value);
                          setLastChanged('romaji');
                        }}
                        placeholder="Enter romaji..."
                        className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-14 text-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}