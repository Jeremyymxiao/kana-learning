'use client';

import MainLayout from '@/components/layouts/main-layout';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
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
      currentTab="about"
      onTabChange={handleTabChange}
    >
      <div className="container mx-auto px-2 sm:px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            About Gojuon
          </h1>
          
          <div className="prose dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Gojuon is an online tool designed to help users learn the Japanese Gojuon (fifty sounds) chart. Our mission is to make learning Japanese simpler and more enjoyable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Interactive Gojuon Chart Learning</li>
                <li>Pronunciation Practice</li>
                <li>Test Mode</li>
                <li>Progress Tracking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions or suggestions, please feel free to contact us.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}