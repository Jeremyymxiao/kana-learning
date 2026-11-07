import AnalyzerPageContent from './page-content';
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
      <AnalyzerPageContent />

      {/* Server-rendered SEO content */}
      <section className="bg-gray-50 dark:bg-[#1A1B2F]/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              How the Japanese Text Analyzer Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[#8B5CF6]">Paste Japanese Text</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter any Japanese text containing kanji characters. The analyzer
                  accepts up to 5,000 characters at a time.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[#EC4899]">Auto-Analyze</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our analyzer automatically identifies kanji and adds furigana
                  (hiragana reading aids) above each character.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[#A78BFA]">Read with Confidence</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  See the hiragana pronunciation above every kanji, making it easy
                  to read and learn new vocabulary.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="font-bold text-lg mb-2">What is furigana?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Furigana are small hiragana characters placed above kanji to show their pronunciation.
                  They are commonly used in Japanese textbooks, manga, and children&apos;s books to help
                  readers learn kanji readings.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="font-bold text-lg mb-2">What types of text can I analyze?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You can paste any Japanese text — news articles, manga dialogue, textbook passages,
                  or your own writing. The tool works best with standard Japanese text containing kanji.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="font-bold text-lg mb-2">Is this tool free?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes! The Japanese Text Analyzer is completely free to use with no limits on
                  the number of analyses you can perform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
