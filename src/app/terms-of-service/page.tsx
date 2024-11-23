'use client';

import MainLayout from '@/components/layouts/main-layout';
import { useRouter } from 'next/navigation';

export default function TermsOfServicePage() {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === 'gojuon') {
      router.push('/');
    } else if (tab === 'test') {
      router.push('/test');
    }
  };

  return (
    <MainLayout 
      currentTab="terms"
      onTabChange={handleTabChange}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using LearnKana ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p>
              LearnKana is an educational platform providing Japanese language learning tools, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Interactive Hiragana and Katakana learning materials</li>
              <li>Japanese text conversion tools</li>
              <li>Practice exercises and quizzes</li>
              <li>Educational content and guides</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p>Users of the Service agree to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Provide accurate information when required</li>
              <li>Use the Service for lawful purposes only</li>
              <li>Not interfere with the Service's functionality</li>
              <li>Not attempt to access restricted areas of the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p>
              All content on LearnKana, including but not limited to text, graphics, logos, and audio content, is protected by copyright and other intellectual property rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Privacy Policy</h2>
            <p>
              Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" without any warranties, expressed or implied. We do not guarantee that the Service will be error-free or uninterrupted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
              <a href="mailto:contact@learnkana.pro" className="text-blue-500 hover:text-blue-600 ml-2">
                contact@learnkana.pro
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes through the Service.
            </p>
          </section>

          <div className="text-sm text-gray-600 dark:text-gray-400 mt-12 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}