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
              <span className="text-[#FF7E67] block">
                AI-Powered
              </span>
              <span className="text-white block mb-4">
                Free Hiragana & Katakana Quiz
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-12">
              Master Japanese kana with our interactive Hiragana & Katakana Quiz platform featuring AI assistance and custom learning paths.
            </p>

            {/* CTA Button */}
            <div className="mb-16">
              <Link 
                href="/hiragana-katakana-quiz"
                className="inline-flex items-center px-8 py-4 text-xl font-bold bg-gradient-to-r from-[#FF7E67] to-[#FFD600] text-[#1A1B2F] rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl group"
              >
                Start Hiragana & Katakana Quiz
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 功能预览列表 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
              <div className="flex items-center gap-2 text-white/60">
                <MessageSquare className="w-8 h-8" />
                <span className="text-2xl md:text-1xl">AI-Powered Hiragana & Katakana Quiz</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <PenTool className="w-8 h-8" />
                <span className="text-2xl md:text-1xl">Interactive Kana Practice</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Table className="w-8 h-8" />
                <span className="text-2xl md:text-1xl">Visual Learning Charts</span>
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
                Complete Hiragana & Katakana Quiz Tools
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AI Chat Feature */}
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
                        Start Kana Quiz
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
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Complete Hiragana & Katakana Charts</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Reference our Hiragana & Katakana Quiz charts with native and nature audio pronunciation to reinforce your kana recognition skills.
                      </p>
                      <div className="flex items-center text-[#FFD600] font-semibold text-sm">
                        Explore Kana Chart
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
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Hiragana & Katakana Quiz Practice</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Test your knowledge with our adaptive Hiragana & Katakana Quiz featuring recognition exercises, stroke order practice, and progress tracking.
                      </p>
                      <div className="flex items-center text-[#00D6A4] font-semibold text-sm">
                        Take Kana Quiz
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
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white">Japanese Text Converter</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Convert text between Japanese writing systems to support your Hiragana & Katakana Quiz study and reinforce character recognition.
                      </p>
                      <div className="flex items-center text-[#FF7E67] font-semibold text-sm">
                        Convert Japanese Text
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
                Hiragana & Katakana Quiz Study Guide
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
                        Hiragana Quiz ひらがな
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Master hiragana with our specialized Hiragana & Katakana Quiz designed for native Japanese words and grammatical elements.
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
                        Katakana Quiz カタカナ
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                        Practice katakana with our focused Hiragana & Katakana Quiz modules for foreign loanwords and technical terms.
                      </p>
                      <div className="text-3xl font-japanese text-[#FFD600] dark:text-[#FFD600]/80 tracking-wider">
                        ア イ ウ エ オ
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Study Both section - condensed content for better SEO */}
                <div className="group md:col-span-2">
                  <div className="relative bg-gradient-to-br from-[#00D6A4] to-[#2B7FFF] p-1 rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl h-full">
                      <h3 className="text-xl font-bold mb-4 text-[#1A1B2F] dark:text-white">
                        Why Use Our Hiragana & Katakana Quiz Tool?
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-bold text-[#00D6A4] mb-2">Free Access</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Our Hiragana & Katakana Quiz platform is completely free with no hidden costs or premium limitations. All features are accessible to everyone, making quality Japanese learning available to all.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#00D6A4] mb-2">AI Assistance</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Get personalized feedback on your Hiragana & Katakana Quiz practice with our intelligent AI tutor. Our system detects common mistake patterns and provides tailored corrections to accelerate your learning.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#00D6A4] mb-2">Progress Tracking</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Monitor your learning journey with detailed analytics in our Hiragana & Katakana Quiz system. Visualize your improvement over time and identify specific characters that need more practice.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#00D6A4] mb-2">Multiple Quiz Modes</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Our Hiragana & Katakana Quiz offers diverse practice methods including recognition, recall, listening, and writing exercises. This multi-modal approach strengthens different aspects of kana memory and helps you develop well-rounded proficiency.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#00D6A4] mb-2">Native Audio</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Every character in our Hiragana & Katakana Quiz includes high-quality native speaker pronunciations. Train your ear with authentic Japanese sounds while mastering the written forms for complete language immersion.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#00D6A4] mb-2">Community Support</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Join thousands of learners using our Hiragana & Katakana Quiz system daily. Share progress, compete on leaderboards, and participate in our active learning community to stay motivated throughout your Japanese learning journey.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles Section - streamlined for better SEO focus */}
        <section 
          aria-labelledby="articles-heading"
          className="relative py-24 bg-white dark:bg-[#1A1B2F] overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 id="articles-heading" className="text-4xl md:text-5xl font-bold mb-16 text-[#1A1B2F] dark:text-white text-center">
                Hiragana & Katakana Quiz Learning Guides
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link href="/learn/hiragana-basics" className="group h-full">
                  <div className="relative bg-gradient-to-br from-[#2B7FFF] via-[#00D6A4] to-[#FFD600] p-1 rounded-3xl transition-transform duration-300 group-hover:scale-[1.02] h-full">
                    <article className="relative h-full bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl flex flex-col">
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white group-hover:text-[#2B7FFF]">
                        Hiragana Quiz Basics Guide
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                        Master the fundamentals of hiragana with our dedicated quiz practice system.
                      </p>
                    </article>
                  </div>
                </Link>

                <Link href="/learn/katakana-guide" className="group h-full">
                  <div className="relative bg-gradient-to-br from-[#FFD600] via-[#FF7E67] to-[#2B7FFF] p-1 rounded-3xl transition-transform duration-300 group-hover:scale-[1.02] h-full">
                    <article className="relative h-full bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl flex flex-col">
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white group-hover:text-[#FFD600]">
                        Katakana Quiz Practice Guide
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                        Learn how to effectively use our katakana quizzes for rapid character memorization.
                      </p>
                    </article>
                  </div>
                </Link>

                <Link href="/learn/hiragana-vs-katakana" className="group h-full">
                  <div className="relative bg-gradient-to-br from-[#FF7E67] via-[#2B7FFF] to-[#00D6A4] p-1 rounded-3xl transition-transform duration-300 group-hover:scale-[1.02] h-full">
                    <article className="relative h-full bg-white dark:bg-[#1A1B2F]/80 backdrop-blur-xl p-6 rounded-3xl flex flex-col">
                      <h3 className="text-xl font-bold mb-2 text-[#1A1B2F] dark:text-white group-hover:text-[#FF7E67]">
                        Combined Hiragana & Katakana Quiz Strategy
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                        Discover the optimal approach to mastering both kana systems with our integrated quiz platform.
                      </p>
                    </article>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Streamlined FAQ Section */}
        <section 
          aria-labelledby="faq-heading"
          className="relative py-24 bg-white dark:bg-[#1A1B2F] overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold mb-16 text-[#1A1B2F] dark:text-white text-center">
                Hiragana & Katakana Quiz FAQ
              </h2>

              <div className="space-y-6">
                <div className="group">
                  <details className="relative">
                    <summary className="relative bg-white/50 dark:bg-[#1A1B2F]/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer list-none border border-gray-200/20 dark:border-white/10">
                      <h3 className="text-xl font-semibold text-[#1A1B2F] dark:text-white">
                        How does the Hiragana & Katakana Quiz tool help beginners?
                      </h3>
                    </summary>
                    <div className="relative bg-white/30 dark:bg-[#1A1B2F]/30 backdrop-blur-sm mt-1 p-6 rounded-xl border border-gray-200/20 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300">
                        Our Hiragana & Katakana Quiz platform offers progressive difficulty levels, visual mnemonics, and instant feedback to make learning Japanese characters accessible to complete beginners. The quiz system adapts to your learning pace, ensuring you master each character before moving to more complex ones.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="group">
                  <details className="relative">
                    <summary className="relative bg-white/50 dark:bg-[#1A1B2F]/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer list-none border border-gray-200/20 dark:border-white/10">
                      <h3 className="text-xl font-semibold text-[#1A1B2F] dark:text-white">
                        Is the Hiragana & Katakana Quiz system scientifically designed?
                      </h3>
                    </summary>
                    <div className="relative bg-white/30 dark:bg-[#1A1B2F]/30 backdrop-blur-sm mt-1 p-6 rounded-xl border border-gray-200/20 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300">
                        Yes, our Hiragana & Katakana Quiz employs spaced repetition and active recall techniques proven by cognitive science to optimize character memorization and retention. We've collaborated with language learning experts to design a quiz system that maximizes learning efficiency while minimizing study time.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="group">
                  <details className="relative">
                    <summary className="relative bg-white/50 dark:bg-[#1A1B2F]/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer list-none border border-gray-200/20 dark:border-white/10">
                      <h3 className="text-xl font-semibold text-[#1A1B2F] dark:text-white">
                        How often should I practice with the Hiragana & Katakana Quiz?
                      </h3>
                    </summary>
                    <div className="relative bg-white/30 dark:bg-[#1A1B2F]/30 backdrop-blur-sm mt-1 p-6 rounded-xl border border-gray-200/20 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300">
                        For optimal results, we recommend using our Hiragana & Katakana Quiz system for 15-20 minutes daily rather than infrequent longer sessions. This consistent practice helps reinforce neural pathways and build long-term memory. Our quiz tool will track your progress and suggest personalized practice schedules based on your learning patterns.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="group">
                  <details className="relative">
                    <summary className="relative bg-white/50 dark:bg-[#1A1B2F]/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer list-none border border-gray-200/20 dark:border-white/10">
                      <h3 className="text-xl font-semibold text-[#1A1B2F] dark:text-white">
                        Can the Hiragana & Katakana Quiz help with stroke order?
                      </h3>
                    </summary>
                    <div className="relative bg-white/30 dark:bg-[#1A1B2F]/30 backdrop-blur-sm mt-1 p-6 rounded-xl border border-gray-200/20 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300">
                        Absolutely! Our Hiragana & Katakana Quiz features dedicated stroke order practice modes with animated demonstrations and interactive tracing exercises. The system analyzes your stroke order and provides instant feedback to help you develop proper writing habits from the beginning. This is essential for developing natural, fluid handwriting in Japanese.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="group">
                  <details className="relative">
                    <summary className="relative bg-white/50 dark:bg-[#1A1B2F]/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer list-none border border-gray-200/20 dark:border-white/10">
                      <h3 className="text-xl font-semibold text-[#1A1B2F] dark:text-white">
                        What makes your Hiragana & Katakana Quiz different from other learning tools?
                      </h3>
                    </summary>
                    <div className="relative bg-white/30 dark:bg-[#1A1B2F]/30 backdrop-blur-sm mt-1 p-6 rounded-xl border border-gray-200/20 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300">
                        Our Hiragana & Katakana Quiz stands out through its AI-powered personalization and comprehensive approach. Unlike basic flashcard apps, we offer context-aware learning that adapts to your strengths and weaknesses. Our quiz system creates custom learning paths, provides detailed analytics on your progress, and offers multiple quiz modes (recognition, recall, writing, etc.) to strengthen different aspects of your kana knowledge.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="group">
                  <details className="relative">
                    <summary className="relative bg-white/50 dark:bg-[#1A1B2F]/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer list-none border border-gray-200/20 dark:border-white/10">
                      <h3 className="text-xl font-semibold text-[#1A1B2F] dark:text-white">
                        Can I track my progress with the Hiragana & Katakana Quiz system?
                      </h3>
                    </summary>
                    <div className="relative bg-white/30 dark:bg-[#1A1B2F]/30 backdrop-blur-sm mt-1 p-6 rounded-xl border border-gray-200/20 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300">
                        Yes, comprehensive progress tracking is a core feature of our Hiragana & Katakana Quiz platform. You'll get detailed analytics showing your mastery level for each character, accuracy rates, response times, and learning trends over time. Our dashboard visualizes your progress with intuitive charts and highlights characters that need additional practice, ensuring efficient and targeted study sessions.
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