import ChatPageContent from './page-content';
import { generateStructuredData } from './metadata';

export { generateMetadata } from './metadata';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const structuredData = generateStructuredData({ params: { locale } });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ChatPageContent />

      {/* Server-rendered SEO content */}
      <section className="bg-gray-50 dark:bg-[#1A1B2F]/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              What Can the AI Tutor Help With
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md text-center">
                <div className="w-12 h-12 bg-[#4F46E5]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔤</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Kana Practice</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ask about specific hiragana or katakana characters, their readings, and usage in words.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md text-center">
                <div className="w-12 h-12 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Grammar Tips</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Get explanations of Japanese grammar patterns and sentence structures.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md text-center">
                <div className="w-12 h-12 bg-[#4ADE80]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🗣️</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Pronunciation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Learn correct pronunciation for Japanese sounds and common words.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Example Prompts to Try
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 text-sm">&ldquo;How do I write my name in katakana?&rdquo;</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 text-sm">&ldquo;What is the difference between は and わ?&rdquo;</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 text-sm">&ldquo;Teach me the dakuten characters&rdquo;</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 text-sm">&ldquo;What are common Japanese greetings in hiragana?&rdquo;</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="font-bold text-lg mb-2">Is the AI chat assistant free?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes! Our AI Japanese learning assistant is completely free to use with no message limits.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="font-bold text-lg mb-2">What languages does the AI respond in?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The AI responds in English by default but can also communicate in Japanese when asked.
                  It can explain Japanese concepts using examples in both languages.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="font-bold text-lg mb-2">Is my chat history saved?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Chat history is saved locally in your browser so you can continue previous conversations.
                  You can clear your history at any time using the clear button.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
