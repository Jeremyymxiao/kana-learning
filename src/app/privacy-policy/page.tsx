'use client';

import MainLayout from '@/components/layouts/main-layout';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicyPage() {
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
      currentTab="privacy"
      onTabChange={handleTabChange}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information Collection</h2>
            <p>
              LearnKana collects minimal user information to provide and improve our service. We may collect:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Usage data (pages visited, time spent, interactions)</li>
              <li>Device information (browser type, operating system)</li>
              <li>IP address and approximate location</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use of Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Improve our educational content and tools</li>
              <li>Analyze user behavior and optimize user experience</li>
              <li>Maintain and secure our platform</li>
              <li>Communicate important updates</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
            <p>
              We implement industry-standard security measures to protect your information. All data is encrypted and stored securely.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Cookies and Tracking</h2>
            <p>
              We use essential cookies to maintain basic functionality. Analytics cookies are used only with your consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <p>
              We may use third-party services for:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Analytics (Google Analytics)</li>
              <li>Content Delivery Networks (CDN)</li>
              <li>Error tracking and monitoring</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. User Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Access your personal data</li>
              <li>Request data deletion</li>
              <li>Opt-out of analytics tracking</li>
              <li>Update your preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <p>
              For privacy-related inquiries, please contact us at:
              <a href="mailto:privacy@learnkana.pro" className="text-blue-500 hover:text-blue-600 ml-2">
                privacy@learnkana.pro
              </a>
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