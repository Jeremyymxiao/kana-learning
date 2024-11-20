'use client';

import MainLayout from '@/components/layouts/main-layout';
import { useRouter } from 'next/navigation';
import { GithubIcon, TwitterIcon, MailIcon } from 'lucide-react';

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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              About LearnKana
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Your Journey to Japanese Language Mastery Starts Here
            </p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                LearnKana is dedicated to revolutionizing the way people learn Japanese writing systems. We believe that learning Japanese should be accessible, enjoyable, and effective. Our platform combines modern technology with proven learning methodologies to create an immersive and interactive learning experience.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">Core Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Dynamic Gojuon chart with audio pronunciation</li>
                    <li>• Real-time feedback and progress tracking</li>
                    <li>• Customizable learning paths</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Comprehensive Testing</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Multiple quiz formats</li>
                    <li>• Adaptive difficulty levels</li>
                    <li>• Detailed performance analytics</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">Why Choose LearnKana?</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li>✓ Research-based learning methodology</li>
                  <li>✓ Regular updates and new content</li>
                  <li>✓ Community-driven improvements</li>
                  <li>✓ Cross-platform accessibility</li>
                  <li>✓ Free and open-source</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">Connect With Us</h2>
              <div className="flex flex-wrap gap-6 justify-center">
                <a href="https://github.com/yourusername" className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:opacity-90 transition-opacity">
                  <GithubIcon className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a href="https://twitter.com/yourusername" className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                  <TwitterIcon className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
                <a href="mailto:contact@learnkana.com" className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                  <MailIcon className="w-5 h-5" />
                  <span>Email Us</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}