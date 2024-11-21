'use client';

import MainLayout from '@/components/layouts/main-layout';
import TestPanel from '@/components/japanese/test-panel';
import { useState } from 'react';

export default function LandingPage() {
  const [showQuizHeader, setShowQuizHeader] = useState(true);

  return (
    <MainLayout currentTab="home">
      {/* Hero Section */}
      <header 
        className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10 overflow-hidden"
        role="banner"
      >
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Master Japanese Kana the Smart Way
          </h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Join thousands of learners mastering Japanese Kana with our interactive tools.
          </p>
        </div>
      </header>

      <main>
        {/* Quiz Section */}
        <section 
          aria-labelledby="quiz-heading"
          className="container mx-auto px-4 min-h-[500px] py-8"
        >
          <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-4 md:p-6 h-full">
            {showQuizHeader && (
              <div className="mb-6">
                <h2 id="quiz-heading" className="text-3xl font-bold mb-2 text-center">
                  Kana Quiz
                </h2>
                <p className="text-lg text-gray-600 text-center">
                  Choose the quiz type and level option you need to practice
                </p>
              </div>
            )}
            <TestPanel onConfigChange={setShowQuizHeader} />
          </div>
        </section>

        {/* Kana Introduction Section */}
        <section 
          aria-labelledby="kana-intro-heading"
          className="container mx-auto px-4 py-8"
        >
          <h2 id="kana-intro-heading" className="text-3xl font-bold mb-6 text-center">
            What are Hiragana and Katakana?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Hiragana ひらがな</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Hiragana is the basic Japanese phonetic script. It represents every sound in the Japanese language and is primarily used for native Japanese words, grammatical elements, and word endings.
              </p>
              <div className="text-3xl mb-4 font-japanese">
                あ い う え お
              </div>
            </article>

            {/* Katakana Card */}
            <article className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Katakana カタカナ</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Katakana is another Japanese phonetic script, mainly used for foreign words, scientific terms, and emphasis. It has the same sounds as Hiragana but different characters.
              </p>
              <div className="text-3xl mb-4 font-japanese">
                ア イ ウ エ オ
              </div>
            </article>
          </div>
        </section>

        {/* Features Section */}
        <section 
          aria-labelledby="features-heading"
          className="bg-gray-100 py-12"
        >
          <div className="container mx-auto px-4">
            <h2 id="features-heading" className="text-3xl font-bold mb-8 text-center">
              Why LearnKana?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
              {/* Interactive Chart Card */}
              <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Interactive Chart</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn with our interactive Gojuon chart featuring clear visuals and audio pronunciation.
                </p>
              </div>

              {/* Pronunciation Card */}
              <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Pronunciation Guide</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Master correct pronunciation with native audio examples and practice exercises.
                </p>
              </div>

              {/* Test Mode Card */}
              <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Test Mode</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Challenge yourself with various quiz types to reinforce your learning and track progress.
                </p>
              </div>

              {/* Learning Tips Card */}
              <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Learning Tips</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get helpful mnemonics and study strategies to make learning Kana easier and more effective.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section 
          aria-labelledby="faq-heading"
          className="container mx-auto px-4 py-16"
        >
          <h2 id="faq-heading" className="text-3xl font-bold mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <details className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6">
              <summary className="text-xl font-semibold cursor-pointer">
                How do I start?
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Simply select your test mode and type, then click &quot;Start the Quiz&quot; to begin. Our intuitive interface will guide you through the process.
              </p>
            </details>

            {/* FAQ Item 2 */}
            <details className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6">
              <summary className="text-xl font-semibold cursor-pointer">
                What test modes are available?
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                We offer choice, matching, and dictation exercises to suit different learning styles. Each mode is designed to reinforce your understanding in unique ways.
              </p>
            </details>

            {/* FAQ Item 3 */}
            <details className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6">
              <summary className="text-xl font-semibold cursor-pointer">
                How can I track my progress?
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Use our interactive tools and quizzes to continuously improve your skills. Each session provides detailed feedback and progress tracking.
              </p>
            </details>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}