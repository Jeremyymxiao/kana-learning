'use client';

import MainLayout from '@/components/layouts/main-layout';
import { MessageSquare, Table, PenTool, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { articles } from '@/data/articles';

export default function LandingPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <header 
        className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-28 overflow-hidden"
        role="banner"
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
              AI-Powered
            </span>
            <span className="text-slate-800 dark:text-white"> Japanese</span>
            <span className="block mt-6 text-slate-800 dark:text-white">
              Hiragana & Katakana Learning
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12">
            Master Japanese Kana with personalized AI tutoring and interactive learning tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/chat" 
              className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-500 dark:hover:to-indigo-500 rounded-full overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center">
                Start Chatting
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="/hiragana-katakana-chart" 
              className="group inline-flex items-center justify-center px-8 py-3 font-bold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              View Kana Chart
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      <main>

        {/* Features Section */}
        <section 
          aria-labelledby="features-heading"
          className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/50"
        >
          <div className="container mx-auto px-4">
            <h2 id="features-heading" className="text-4xl font-bold text-center mb-12">
              Master Japanese with Powerful Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* AI Chat Feature */}
              <Link href="/chat" className="group h-full">
                <div className="relative h-full transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                  <div className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                      <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">AI Language Assistant</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Get instant help with pronunciation, grammar, and writing practice from our AI tutor.
                    </p>
                    <span className="text-purple-600 dark:text-purple-400 inline-flex items-center mt-auto">
                      Start chatting <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Interactive Chart Feature */}
              <Link href="/hiragana-katakana-chart" className="group h-full">
                <div className="relative h-full transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                  <div className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                      <Table className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Interactive Hiragana Chart</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Learn with our interactive Hiragana & Katakana chart featuring clear visuals and native audio pronunciation.
                    </p>
                    <span className="text-blue-600 dark:text-blue-400 inline-flex items-center mt-auto">
                      View chart <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Quiz Feature */}
              <Link href="/hiragana-katakana-quiz" className="group h-full">
                <div className="relative h-full transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                  <div className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mb-4">
                      <PenTool className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Practice Quizzes</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Test your hiragana & katakana knowledge with various quiz types and track your learning progress.
                    </p>
                    <span className="text-green-600 dark:text-green-400 inline-flex items-center mt-auto">
                      Start quiz <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

         {/* Kana Introduction Section */}
         <section 
          aria-labelledby="kana-intro-heading"
          className="container mx-auto px-4 py-16"
        >
          <h2 id="kana-intro-heading" className="text-4xl font-bold text-center mb-12">
            Japanese Alphabet System
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Hiragana Card */}
            <div className="group h-full">
              <div className="relative h-full transition-transform duration-300 group-hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <article className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-japanese text-blue-600 dark:text-blue-400">あ</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Hiragana ひらがな</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Hiragana is the basic Japanese phonetic script. It represents every sound in the Japanese language and is primarily used for native Japanese words, grammatical elements, and word endings.
                  </p>
                  <div className="text-3xl font-japanese text-blue-600/80 dark:text-blue-400/80">
                    あ い う え お
                  </div>
                </article>
              </div>
            </div>

            {/* Katakana Card */}
            <div className="group h-full">
              <div className="relative h-full transition-transform duration-300 group-hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <article className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-japanese text-indigo-600 dark:text-indigo-400">ア</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Katakana カタカナ</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Katakana is another Japanese phonetic script, mainly used for foreign words, scientific terms, and emphasis. It has the same sounds as Hiragana but different characters.
                  </p>
                  <div className="text-3xl font-japanese text-indigo-600/80 dark:text-indigo-400/80">
                    ア イ ウ エ オ
                  </div>
                </article>
              </div>
            </div>

            {/* Dakuten/Handakuten Card */}
            <div className="group h-full">
              <div className="relative h-full transition-transform duration-300 group-hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <article className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-japanese text-purple-600 dark:text-purple-400">が</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Dakuten/Handakuten 濁点・半濁点</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Dakuten (゛) and Handakuten (゜) are diacritical marks added to kana to create voiced and semi-voiced sounds. Dakuten changes k→g, s→z, t→d, and h→b, while Handakuten changes h→p.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-2xl font-japanese">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm block">Dakuten:</span>
                      <span className="text-purple-600/80 dark:text-purple-400/80">か → が</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm block">Handakuten:</span>
                      <span className="text-purple-600/80 dark:text-purple-400/80">は → ぱ</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            {/* Youon Card */}
            <div className="group h-full">
              <div className="relative h-full transition-transform duration-300 group-hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <article className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-japanese text-pink-600 dark:text-pink-400">きょ</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Youon 拗音</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Youon are contracted sounds in Japanese, formed by combining a i-row kana with a small や, ゆ, or よ. These create new sounds that are essential in Japanese pronunciation.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-2xl font-japanese">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm block">Hiragana:</span>
                      <span className="text-pink-600/80 dark:text-pink-400/80">きょ</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm block">Katakana:</span>
                      <span className="text-pink-600/80 dark:text-pink-400/80">キョ</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section 
          aria-labelledby="articles-heading"
          className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900"
        >
          <h2 id="articles-heading" className="text-3xl font-bold mb-10 text-center">
            Latest Learning Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {articles.slice(0, 3).map(article => (
              <Link 
                key={article.id} 
                href={`/learn/${article.slug}`}
                className="group relative"
              >
                <div className="relative h-full transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                  <article className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 text-sm flex items-center">
                      Read More 
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </article>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/learn"
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
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
                How can the AI chat assistant help me learn Japanese?
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Our AI chat assistant provides personalized help with pronunciation, grammar explanations, and writing practice. You can ask questions about kana characters, get instant feedback on your writing, and practice basic conversations in Japanese.
              </p>
            </details>

            {/* FAQ Item 2 */}
            <details className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6">
              <summary className="text-xl font-semibold cursor-pointer">
                What learning tools are available on the platform?
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                We offer several interactive tools: an AI chat assistant for personalized learning, an interactive kana chart with audio pronunciation, practice quizzes with different modes (multiple choice, matching, dictation), and a Japanese text converter for switching between writing systems.
              </p>
            </details>

            {/* FAQ Item 3 */}
            <details className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6">
              <summary className="text-xl font-semibold cursor-pointer">
                How does the Japanese text converter work?
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Our converter allows you to transform text between different Japanese writing systems. You can convert between Hiragana, Katakana, Romaji, and even English. Simply input your text, select your desired conversion options, and get instant results.
              </p>
            </details>

            {/* FAQ Item 4 */}
            <details className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6">
              <summary className="text-xl font-semibold cursor-pointer">
                Is this platform suitable for complete beginners?
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Yes! Our platform is designed for learners of all levels, especially beginners. We start with basic kana characters and provide comprehensive guides for both Hiragana and Katakana. The interactive tools and AI assistant help make learning Japanese accessible and enjoyable.
              </p>
            </details>
          </div>
        </section>
      
      </main>
    </MainLayout>
  );
}