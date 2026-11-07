import MainLayout from '@/components/layouts/main-layout';
import { MessageSquare, Table, PenTool, ArrowRight, Repeat, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { articles } from '@/data/articles';

export default function RootPage() {
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

        <div className="relative container mx-auto px-4 pt-20 sm:pt-28 md:pt-32 pb-14 sm:pb-18 md:pb-20">
          {/* 主标题区域 */}
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-[1.05]">
              <span className="text-[#FF7E67] block">
                AI-Powered
              </span>
              <span className="text-white block mb-4">
                Free Hiragana & Katakana Quiz
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-3xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12">
              Master Japanese kana with our interactive Hiragana & Katakana Quiz platform featuring AI assistance and custom learning paths.
            </p>

            {/* CTA Button */}
            <div className="mb-8 sm:mb-12">
              <Link 
                href="/hiragana-katakana-quiz"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#FF7E67] to-[#FFD600] text-[#1A1B2F] rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl group"
              >
                Start Hiragana & Katakana Quiz
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 功能预览列表 */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10 md:gap-16 text-center">
              <Link
                href="/chat"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                <span className="text-base sm:text-lg md:text-xl">AI Tutor</span>
              </Link>
              <Link
                href="/hiragana-katakana-quiz"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <PenTool className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                <span className="text-base sm:text-lg md:text-xl">Kana Practice</span>
              </Link>
              <Link
                href="/hiragana-katakana-chart"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <Table className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                <span className="text-base sm:text-lg md:text-xl">Kana Charts</span>
              </Link>
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
                Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AI Tutor Feature */}
                <Link href="/chat" className="group">
                  <div className="relative bg-gradient-to-br from-[#2B7FFF] to-[#00D6A4] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#2B7FFF] rounded-xl flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">AI Tutor for Hiragana & Katakana Quiz</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Get personalized help with our Hiragana & Katakana Quiz assistant for writing practice, pronunciation guidance, and interactive exercises.
                      </p>
                      <div className="flex items-center text-[#2B7FFF] font-semibold text-sm">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Kana Charts Feature */}
                <Link href="/hiragana-katakana-chart" className="group">
                  <div className="relative bg-gradient-to-br from-[#FFD600] to-[#FF7E67] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#FFD600] rounded-xl flex items-center justify-center mb-4">
                        <Table className="w-6 h-6 text-[#1A1B2F]" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Complete Hiragana & Katakana Charts</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Reference our Hiragana & Katakana Quiz charts with native and nature audio pronunciation to reinforce your kana recognition skills.
                      </p>
                      <div className="flex items-center text-[#FFD600] font-semibold text-sm">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Kana Practice Feature */}
                <Link href="/hiragana-katakana-quiz" className="group">
                  <div className="relative bg-gradient-to-br from-[#00D6A4] to-[#2B7FFF] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#00D6A4] rounded-xl flex items-center justify-center mb-4">
                        <PenTool className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Hiragana & Katakana Quiz Practice</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Test your knowledge with our adaptive Hiragana & Katakana Quiz featuring recognition exercises, stroke order practice, and progress tracking.
                      </p>
                      <div className="flex items-center text-[#00D6A4] font-semibold text-sm">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Text Converter Feature */}
                <Link href="/hiragana-katakana-converter" className="group">
                  <div className="relative bg-gradient-to-br from-[#FF7E67] to-[#FFD600] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <div className="w-12 h-12 bg-[#FF7E67] rounded-xl flex items-center justify-center mb-4">
                        <Repeat className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Japanese Text Converter</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Convert text between Japanese writing systems to support your Hiragana & Katakana Quiz study and reinforce character recognition.
                      </p>
                      <div className="flex items-center text-[#FF7E67] font-semibold text-sm">
                        Learn More
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
        <section className="py-24 bg-gray-50 dark:bg-[#1A1B2F]/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#1A1B2F] dark:text-white">
                Master Both Kana Systems
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-[#1A1B2F] p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-[#FF7E67]">Hiragana</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The fundamental Japanese phonetic script used for native words, particles, and verb conjugations.
                  </p>
                  <Link href="/hiragana-katakana-chart" className="text-[#FF7E67] font-semibold hover:underline">
                    Learn Hiragana →
                  </Link>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-[#2B7FFF]">Katakana</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Used for foreign loanwords, emphasis, and technical terms in Japanese writing.
                  </p>
                  <Link href="/hiragana-katakana-chart" className="text-[#2B7FFF] font-semibold hover:underline">
                    Learn Katakana →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-24 bg-white dark:bg-[#1A1B2F]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#1A1B2F] dark:text-white">
                Learning Guides
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Link href="/learn" className="group">
                  <div className="bg-gradient-to-br from-[#2B7FFF]/10 to-[#00D6A4]/10 p-6 rounded-2xl hover:shadow-lg transition-all">
                    <BookOpen className="w-12 h-12 mb-4 text-[#2B7FFF]" />
                    <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Hiragana Quiz Basics Guide</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Master the fundamentals of hiragana with our dedicated quiz practice system.</p>
                    <span className="text-[#2B7FFF] font-semibold">Learn More →</span>
                  </div>
                </Link>
                <Link href="/learn" className="group">
                  <div className="bg-gradient-to-br from-[#FFD600]/10 to-[#FF7E67]/10 p-6 rounded-2xl hover:shadow-lg transition-all">
                    <BookOpen className="w-12 h-12 mb-4 text-[#FFD600]" />
                    <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Katakana Quiz Practice Guide</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Learn how to effectively use our katakana quizzes for rapid character memorization.</p>
                    <span className="text-[#FFD600] font-semibold">Learn More →</span>
                  </div>
                </Link>
                <Link href="/hiragana-katakana-quiz" className="group">
                  <div className="bg-gradient-to-br from-[#00D6A4]/10 to-[#2B7FFF]/10 p-6 rounded-2xl hover:shadow-lg transition-all">
                    <BookOpen className="w-12 h-12 mb-4 text-[#00D6A4]" />
                    <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Combined Hiragana & Katakana Quiz Strategy</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Discover the optimal approach to mastering both kana systems with our integrated quiz platform.</p>
                    <span className="text-[#00D6A4] font-semibold">Learn More →</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gray-50 dark:bg-[#1A1B2F]/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#1A1B2F] dark:text-white">
                Hiragana & Katakana Quiz FAQ
              </h2>
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">How does the Hiragana & Katakana Quiz tool help beginners?</h3>
                  <p className="text-gray-600 dark:text-gray-300">Our Hiragana & Katakana Quiz platform offers progressive difficulty levels, visual mnemonics, and instant feedback to make learning Japanese characters accessible to complete beginners. The quiz system adapts to your learning pace, ensuring you master each character before moving to more complex ones.</p>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">Is the Hiragana & Katakana Quiz system scientifically designed?</h3>
                  <p className="text-gray-600 dark:text-gray-300">Yes, our Hiragana & Katakana Quiz employs spaced repetition and active recall techniques proven by cognitive science to optimize character memorization and retention. We&apos;ve collaborated with language learning experts to design a quiz system that maximizes learning efficiency while minimizing study time.</p>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">How often should I practice with the Hiragana & Katakana Quiz?</h3>
                  <p className="text-gray-600 dark:text-gray-300">For optimal results, we recommend using our Hiragana & Katakana Quiz system for 15-20 minutes daily rather than infrequent longer sessions. This consistent practice helps reinforce neural pathways and build long-term memory. Our quiz tool will track your progress and suggest personalized practice schedules based on your learning patterns.</p>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">Can the Hiragana & Katakana Quiz help with stroke order?</h3>
                  <p className="text-gray-600 dark:text-gray-300">Absolutely! Our Hiragana & Katakana Quiz features dedicated stroke order practice modes with animated demonstrations and interactive tracing exercises. The system analyzes your stroke order and provides instant feedback to help you develop proper writing habits from the beginning. This is essential for developing natural, fluid handwriting in Japanese.</p>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">What makes your Hiragana & Katakana Quiz different from other learning tools?</h3>
                  <p className="text-gray-600 dark:text-gray-300">Our Hiragana & Katakana Quiz stands out through its AI-powered personalization and comprehensive approach. Unlike basic flashcard apps, we offer context-aware learning that adapts to your strengths and weaknesses. Our quiz system creates custom learning paths, provides detailed analytics on your progress, and offers multiple quiz modes (recognition, recall, writing, etc.) to strengthen different aspects of your kana knowledge.</p>
                </div>
                <div className="bg-white dark:bg-[#1A1B2F] p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1B2F] dark:text-white">Can I track my progress with the Hiragana & Katakana Quiz system?</h3>
                  <p className="text-gray-600 dark:text-gray-300">Yes, comprehensive progress tracking is a core feature of our Hiragana & Katakana Quiz platform. You&apos;ll get detailed analytics showing your mastery level for each character, accuracy rates, response times, and learning trends over time. Our dashboard visualizes your progress with intuitive charts and highlights characters that need additional practice, ensuring efficient and targeted study sessions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}