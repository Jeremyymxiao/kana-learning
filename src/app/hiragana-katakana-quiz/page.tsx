'use client';

import MainLayout from '@/components/layouts/main-layout';
import TestPanel from '@/components/japanese/test-panel';
import { useState } from 'react';

export default function KanaQuizPage() {
  const [showQuizHeader, setShowQuizHeader] = useState(true);

  return (
    <MainLayout currentTab="quiz">
      <main>
        <section 
          aria-labelledby="quiz-heading"
          className="container mx-auto px-4 py-8"
        >
          <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-4 md:p-6">
            {showQuizHeader && (
              <div className="mb-6">
                <h2 id="quiz-heading" className="text-3xl font-bold mb-2 text-center">
                  Kana Quiz
                </h2>
                <p className="text-lg text-gray-600 text-center">
                  Choose Kana type and quiz type to start practicing
                </p>
              </div>
            )}
            <div className="min-h-[600px]">
              <TestPanel onConfigChange={setShowQuizHeader} />
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}