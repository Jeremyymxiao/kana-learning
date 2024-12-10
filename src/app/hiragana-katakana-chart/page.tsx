'use client';

import MainLayout from '@/components/layouts/main-layout';
import { GojuonTable } from "@/components/japanese/gojuon-table";

export default function ChartPage() {
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
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-transparent bg-clip-text">
                Japanese Kana Chart
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 text-center">
                Interactive Hiragana and Katakana learning chart with audio pronunciation
              </p>
            </header>

            <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
              <section aria-label="Gojuon Table">
                <GojuonTable />
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}