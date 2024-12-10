'use client';

import MainLayout from '@/components/layouts/main-layout';
import TestPanel from '@/components/japanese/test-panel';
import { useState } from 'react';

export default function KanaQuizPage() {
  const [showQuizHeader, setShowQuizHeader] = useState(true);

  return (
    <MainLayout currentTab="quiz">
      <div className="relative min-h-screen bg-white dark:bg-[#1A1B2F]">
        {/* 全屏装饰背景 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* 左上角大块 */}
          <div className="absolute top-0 left-0 w-full h-[70%] bg-[#60A5FA] transform -skew-y-6 opacity-10"></div>
          {/* 右侧浅绿色块 */}
          <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-[#34D399] transform rotate-12 opacity-10"></div>
          {/* 左下角圆形 */}
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#93C5FD] rounded-full opacity-10"></div>
          {/* 右下角装饰 */}
          <div className="absolute bottom-[5%] right-[5%] w-[25%] h-[25%] bg-[#6EE7B7] transform -rotate-12 opacity-10"></div>
          {/* 中间点缀 */}
          <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-[#BAE6FD] rounded-full blur-3xl opacity-5"></div>
        </div>

        {/* 内容区域 */}
        <div className="relative">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="p-8">
                  {showQuizHeader && (
                    <div className="mb-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#60A5FA] to-[#34D399] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                      </div>
                      <h2 
                        id="quiz-heading" 
                        className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#60A5FA] to-[#34D399] text-transparent bg-clip-text"
                      >
                        Kana Quiz
                      </h2>
                      <p className="text-xl text-gray-600 dark:text-gray-300">
                        Choose Kana type and quiz type to start practicing
                      </p>
                    </div>
                  )}
                  <div className="min-h-[600px]">
                    <TestPanel onConfigChange={setShowQuizHeader} />
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