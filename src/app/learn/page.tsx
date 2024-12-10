'use client';

import MainLayout from '@/components/layouts/main-layout';
import { articles } from '@/data/articles';
import Link from 'next/link';

export default function LearnPage() {
  return (
    <MainLayout>
      <div className="relative min-h-screen bg-white dark:bg-[#1A1B2F]">
        {/* 装饰性背景 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* 左上角大块 */}
          <div className="absolute top-0 left-0 w-full h-[70%] bg-[#4CAF50] transform -skew-y-6 opacity-10"></div>
          {/* 右侧浅绿色块 */}
          <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-[#81C784] transform rotate-12 opacity-10"></div>
          {/* 左下角圆形 */}
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#A5D6A7] rounded-full opacity-10"></div>
          {/* 右下角装饰 */}
          <div className="absolute bottom-[5%] right-[5%] w-[25%] h-[25%] bg-[#C8E6C9] transform -rotate-12 opacity-10"></div>
          {/* 中间点缀 */}
          <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-[#E8F5E9] rounded-full blur-3xl opacity-5"></div>
        </div>

        {/* 内容区域 */}
        <div className="relative">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#2E7D32] to-[#66BB6A] text-transparent bg-clip-text">
                  Learn Japanese Writing Systems
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Explore comprehensive guides and tutorials about Japanese writing
                </p>
              </header>

              <section 
                className="grid gap-6"
                aria-label="Articles list"
              >
                {articles.map(article => (
                  <article 
                    key={article.id} 
                    className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                    aria-labelledby={`article-title-${article.id}`}
                  >
                    <div className="p-6">
                      <h2 
                        id={`article-title-${article.id}`}
                        className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100"
                      >
                        <Link href={`/learn/${article.slug}`} className="hover:text-[#43A047] dark:hover:text-[#81C784] transition-colors">
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {article.description}
                      </p>
                      <Link
                        href={`/learn/${article.slug}`}
                        className="inline-flex items-center text-[#43A047] dark:text-[#81C784] hover:text-[#2E7D32] dark:hover:text-[#A5D6A7] font-medium transition-colors"
                      >
                        Read More 
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}