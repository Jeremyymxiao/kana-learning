'use client';

import MainLayout from '@/components/layouts/main-layout';
import { MessageSquare, Table, PenTool, ArrowRight, Repeat, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { articles } from '@/data/articles';

export default function LandingPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <header 
        className="relative bg-[#1A1B2F] dark:bg-[#1A1B2F] overflow-hidden"
        role="banner"
      >
        {/* 大面积色块装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-[70%] bg-[#2B7FFF] transform -skew-y-6"></div>
          <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-[#FFD600] transform rotate-12 opacity-90"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#FF7E67] rounded-full opacity-80"></div>
          <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-[#00D6A4] transform -rotate-12 opacity-90"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32 pb-20">
          {/* 主标题区域 */}
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-7xl md:text-8xl font-bold mb-8">
              <span className="text-white block mb-4">
                Master Japanese
              </span>
              <span className="text-[#FFD600] block mb-4">
                Hiragana ひらがな
              </span>
              <span className="text-[#FF7E67] block">
                Katakana カタカナ
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-16">
              Experience our AI-powered self-developed platform for mastering Japanese writing systems.
            </p>

            {/* 功能预览列表 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
              <div className="flex items-center gap-2 text-white/60">
                <MessageSquare className="w-8 h-8" />
                <span className="text-2xl md:text-1xl">AI-Powered Tutor</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <PenTool className="w-8 h-8" />
                <span className="text-2xl md:text-1xl">Interactive Practice</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Table className="w-8 h-8" />
                <span className="text-2xl md:text-1xl">Visual Learning</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Features Section */}
        <section 
          aria-labelledby="features-heading"
          className="py-24 bg-white dark:bg-[#1A1B2F]"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-16 text-[#1A1B2F] dark:text-white text-center">
                Tools for Hiragana and Katakana Learning
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AI Chat Feature */}
                <Link href="/chat" className="group">
                  <div className="relative bg-gradient-to-br from-[#2B7FFF] to-[#00D6A4] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#2B7FFF] rounded-xl flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">AI Tutor</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Get personalized help with Hiragana and Katakana writing, pronunciation, and practice exercises.
                      </p>
                      <div className="flex items-center text-[#2B7FFF] font-semibold text-sm">
                        Start Learning
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Interactive Chart Feature */}
                <Link href="/hiragana-katakana-chart" className="group">
                  <div className="relative bg-gradient-to-br from-[#FFD600] to-[#FF7E67] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#FFD600] rounded-xl flex items-center justify-center mb-4">
                        <Table className="w-6 h-6 text-[#1A1B2F]" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Hiragana & Katakana Chart (五十音図)</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Master Japanese syllabaries with our interactive chart featuring native audio pronunciation.
                      </p>
                      <div className="flex items-center text-[#FFD600] font-semibold text-sm">
                        View Chart
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Quiz Feature */}
                <Link href="/hiragana-katakana-quiz" className="group">
                  <div className="relative bg-gradient-to-br from-[#00D6A4] to-[#2B7FFF] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#00D6A4] rounded-xl flex items-center justify-center mb-4">
                        <PenTool className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Practical Quiz</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Test your knowledge with various quiz types including stroke order and character recognition.
                      </p>
                      <div className="flex items-center text-[#00D6A4] font-semibold text-sm">
                        Start Practice
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Converter Feature */}
                <Link href="/hiragana-katakana-converter" className="group">
                  <div className="relative bg-gradient-to-br from-[#FF7E67] to-[#FFD600] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#FF7E67] rounded-xl flex items-center justify-center mb-4">
                        <Repeat className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Text Converter</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Convert text between Hiragana, Katakana, and Romaji with instant results.
                      </p>
                      <div className="flex items-center text-[#FF7E67] font-semibold text-sm">
                        Convert Text
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

         {/* Kana Introduction Section */}
         <section 
          aria-labelledby="kana-intro-heading"
          className="relative py-24 bg-[#1A1B2F] dark:bg-[#1A1B2F] overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[#2B7FFF] transform rotate-12 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-[#FFD600] transform -rotate-12 opacity-10"></div>
          </div>

          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 id="kana-intro-heading" className="text-4xl md:text-5xl font-bold mb-16 text-white text-center">
                Japanese Writing Systems Introduction
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Hiragana Card */}
                <div className="group">
                  <div className="relative bg-gradient-to-br from-[#2B7FFF] to-[#00D6A4] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#2B7FFF] rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl font-japanese text-white">あ</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">
                        Hiragana ひらがな
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        The basic Japanese phonetic script, used for native Japanese words and grammatical elements.
                      </p>
                      <div className="text-3xl font-japanese text-[#2B7FFF] dark:text-[#2B7FFF]/80 tracking-wider">
                        あ い う え お
                      </div>
                    </div>
                  </div>
                </div>

                {/* Katakana Card */}
                <div className="group">
                  <div className="relative bg-gradient-to-br from-[#FFD600] to-[#FF7E67] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#FFD600] rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl font-japanese text-[#1A1B2F]">ア</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">
                        Katakana カタカナ
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Used for foreign loanwords, scientific terms, and emphasis in Japanese writing.
                      </p>
                      <div className="text-3xl font-japanese text-[#FFD600] dark:text-[#FFD600]/80 tracking-wider">
                        ア イ ウ エ オ
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dakuten Card */}
                <div className="group">
                  <div className="relative bg-gradient-to-br from-[#00D6A4] to-[#2B7FFF] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full flex flex-col">
                      <div className="w-12 h-12 bg-[#00D6A4] rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl font-japanese text-white">が</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">
                        Dakuten/Handakuten 浊音/半浊音
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base flex-grow min-h-[3rem]">
                        Special marks (゛and ゜) that modify the pronunciation of kana characters.
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm block mb-1">Dakuten:</span>
                          <span className="text-2xl font-japanese text-[#00D6A4] dark:text-[#00D6A4]/80">
                            か → が
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm block mb-1">Handakuten:</span>
                          <span className="text-2xl font-japanese text-[#00D6A4] dark:text-[#00D6A4]/80">
                            は → ぱ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Youon Card */}
                <div className="group">
                  <div className="relative bg-gradient-to-br from-[#FF7E67] to-[#FFD600] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full flex flex-col">
                      <div className="w-12 h-12 bg-[#FF7E67] rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl font-japanese text-white">きょ</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">
                        Youon 拗音
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base flex-grow min-h-[3rem]">
                        Special kana combinations using small や, ゆ, or よ to create new sounds.
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm block mb-1">Hiragana:</span>
                          <span className="text-2xl font-japanese text-[#FF7E67] dark:text-[#FF7E67]/80">
                            きょ
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm block mb-1">Katakana:</span>
                          <span className="text-2xl font-japanese text-[#FF7E67] dark:text-[#FF7E67]/80">
                            キョ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section 
          aria-labelledby="articles-heading"
          className="relative py-24 bg-white dark:bg-[#1A1B2F] overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-[30%] h-[40%] bg-[#2B7FFF] transform -skew-y-12 opacity-5"></div>
            <div className="absolute bottom-0 right-0 w-[40%] h-[50%] bg-[#FFD600] transform skew-y-12 opacity-5"></div>
          </div>

          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 id="articles-heading" className="text-4xl md:text-5xl font-bold mb-16 text-[#1A1B2F] dark:text-white text-center">
                Latest Learning Guides
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.slice(0, 3).map(article => (
                  <Link 
                    key={article.id} 
                    href={`/learn/${article.slug}`}
                    className="group h-full"
                  >
                    <div className="relative bg-gradient-to-br from-[#2B7FFF] via-[#00D6A4] to-[#FFD600] p-1 rounded-3xl transition-transform duration-300 group-hover:scale-[1.02] h-full">
                      <article className="relative h-full bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl flex flex-col">
                        <div className="w-12 h-12 bg-[#2B7FFF] rounded-xl flex items-center justify-center mb-4">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white group-hover:text-[#2B7FFF] dark:group-hover:text-[#2B7FFF] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-base flex-grow line-clamp-2">
                          {article.description}
                        </p>
                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map(tag => (
                              <span 
                                key={tag}
                                className="px-3 py-1 text-sm rounded-full bg-[#2B7FFF]/10 dark:bg-[#2B7FFF]/20 text-[#2B7FFF]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section 
          aria-labelledby="faq-heading"
          className="relative py-24 bg-white dark:bg-[#1A1B2F] overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#2B7FFF] transform rotate-12 opacity-5"></div>
            <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[#FFD600] transform -rotate-12 opacity-5"></div>
          </div>

          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold mb-16 text-[#1A1B2F] dark:text-white text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {/* FAQ Item 1 */}
                <div className="group">
                  <details className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#2B7FFF] to-[#00D6A4] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <summary className="relative bg-white/50 dark:bg-[#1A1B2F]/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer list-none border border-gray-200/20 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[#1A1B2F] dark:text-white pr-8">
                          How can the AI chat assistant help me learn Japanese?
                        </h3>
                        <span className="text-[#2B7FFF] transition-transform duration-300 group-open:rotate-180">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </summary>
                    <div className="relative bg-white/30 dark:bg-[#1A1B2F]/30 backdrop-blur-sm mt-1 p-6 rounded-xl border border-gray-200/20 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300">
                        Our AI chat assistant provides personalized help with pronunciation, grammar explanations, and writing practice. You can ask questions about kana characters, get instant feedback on your writing, and practice basic conversations in Japanese.
                      </p>
                    </div>
                  </details>
                </div>

                {/* FAQ Item 2 */}
                <div className="group">
                  <details className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD600] to-[#FF7E67] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <summary className="relative bg-white/50 dark:bg-[#1A1B2F]/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer list-none border border-gray-200/20 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[#1A1B2F] dark:text-white pr-8">
                          What learning tools are available on the platform?
                        </h3>
                        <span className="text-[#FFD600] transition-transform duration-300 group-open:rotate-180">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </summary>
                    <div className="relative bg-white/30 dark:bg-[#1A1B2F]/30 backdrop-blur-sm mt-1 p-6 rounded-xl border border-gray-200/20 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300">
                        We offer several interactive tools: an AI chat assistant for personalized learning, an interactive kana chart with audio pronunciation, practice quizzes with different modes (multiple choice, matching, dictation), and a Japanese text converter for switching between writing systems.
                      </p>
                    </div>
                  </details>
                </div>

                {/* FAQ Item 3 */}
                <div className="group">
                  <details className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00D6A4] to-[#2B7FFF] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <summary className="relative bg-white/50 dark:bg-[#1A1B2F]/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer list-none border border-gray-200/20 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[#1A1B2F] dark:text-white pr-8">
                          How does the Japanese text converter work?
                        </h3>
                        <span className="text-[#00D6A4] transition-transform duration-300 group-open:rotate-180">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </summary>
                    <div className="relative bg-white/30 dark:bg-[#1A1B2F]/30 backdrop-blur-sm mt-1 p-6 rounded-xl border border-gray-200/20 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300">
                        Our converter allows you to transform text between different Japanese writing systems. You can convert between Hiragana, Katakana, Romaji, and even English. Simply input your text, select your desired conversion options, and get instant results.
                      </p>
                    </div>
                  </details>
                </div>

                {/* FAQ Item 4 */}
                <div className="group">
                  <details className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7E67] to-[#FFD600] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <summary className="relative bg-white/50 dark:bg-[#1A1B2F]/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer list-none border border-gray-200/20 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[#1A1B2F] dark:text-white pr-8">
                          Is this platform suitable for complete beginners?
                        </h3>
                        <span className="text-[#FF7E67] transition-transform duration-300 group-open:rotate-180">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </summary>
                    <div className="relative bg-white/30 dark:bg-[#1A1B2F]/30 backdrop-blur-sm mt-1 p-6 rounded-xl border border-gray-200/20 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300">
                        Yes! Our platform is designed for learners of all levels, especially beginners. We start with basic kana characters and provide comprehensive guides for both Hiragana and Katakana. The interactive tools and AI assistant help make learning Japanese accessible and enjoyable.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </section>
      
      </main>
    </MainLayout>
  );
}