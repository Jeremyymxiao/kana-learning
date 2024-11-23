'use client';

import MainLayout from '@/components/layouts/main-layout';
import { GojuonTable } from "@/components/japanese/gojuon-table";

export default function ChartPage() {
  return (
    <MainLayout currentTab="chart">
      <main 
        className="container mx-auto px-2 sm:px-4 py-6 sm:py-8"
        role="main"
        aria-labelledby="chart-title"
      >
        <header className="mb-6 sm:mb-8">
          <h1 
            id="chart-title" 
            className="text-2xl sm:text-3xl font-bold text-center"
          >
            Japanese Kana Chart
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mt-2">
            Interactive Hiragana and Katakana learning chart with audio pronunciation
          </p>
        </header>

        <section 
          aria-label="Gojuon Table"
          className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg"
        >
          <GojuonTable />
        </section>
      </main>
    </MainLayout>
  );
}