'use client';

import MainLayout from '@/components/layouts/main-layout';
import { GojuonTable } from "@/components/japanese/gojuon-table";
import { useRouter } from 'next/navigation';

export default function ChartPage() {
  const router = useRouter();

  return (
    <MainLayout currentTab="chart">
      <main 
        className="container mx-auto px-4 py-8"
        role="main"
        aria-labelledby="chart-title"
      >
        <header className="mb-8">
          <h1 
            id="chart-title" 
            className="text-3xl font-bold text-center"
          >
            Japanese Kana Chart
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
            Interactive Hiragana and Katakana learning chart with audio pronunciation
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
            Click on any character to hear its pronunciation
          </p>
        </header>

        <section 
          aria-label="Gojuon Table"
          className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-2 sm:p-6"
        >
          <GojuonTable />
        </section>

        <nav 
          className="mt-8 text-center"
          aria-label="Chart navigation"
        >
        </nav>
      </main>
    </MainLayout>
  );
}