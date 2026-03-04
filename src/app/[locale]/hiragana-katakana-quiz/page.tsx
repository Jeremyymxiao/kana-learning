import QuizPageContent from './page-content';
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
      <QuizPageContent />

      {/* Server-rendered SEO content */}
      <section className="bg-gray-50 dark:bg-[#1A1B2F]/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              How Our Kana Quiz Works
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[#60A5FA]">Multiple Choice</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Select the correct romaji reading for each hiragana or katakana character.
                  Perfect for beginners building character recognition skills.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[#34D399]">Dictation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Type the romaji pronunciation for the displayed kana character.
                  Tests your recall ability and strengthens memory retention.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[#FBBF24]">Matching</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Match kana characters with their correct romaji readings in a timed challenge.
                  Great for improving speed and accuracy simultaneously.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[#F87171]">Spelling</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Write the correct kana character for a given romaji sound.
                  The most advanced mode for mastering Japanese writing.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="font-bold text-lg mb-2">What types of quizzes are available?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We offer four quiz types: multiple choice, dictation (type the answer), matching pairs,
                  and spelling (write the kana). Each mode targets different learning skills.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="font-bold text-lg mb-2">Can I choose which kana to practice?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes! You can select hiragana only, katakana only, or mixed mode. You can also
                  choose specific character groups like basic (seion), voiced (dakuon), or combination (youon) sounds.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                <h3 className="font-bold text-lg mb-2">Is the quiz free to use?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Absolutely! All quiz modes and features are completely free with no usage limits.
                  Practice as much as you need to master Japanese kana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
