'use client';

import MainLayout from '@/components/layouts/main-layout';

export default function ContactUsPage() {
  return (
    <MainLayout 
      currentTab="contact"
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:xym0645@gmail.com" className="text-blue-500 hover:text-blue-600">
                    xym0645@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Feedback & Suggestions</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We value your feedback and suggestions. Please reach out if you have:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Feature suggestions</li>
                <li>Bug reports</li>
                <li>Usage feedback</li>
                <li>Collaboration inquiries</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                Feel free to contact us via email. We aim to respond within 24 hours.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Follow Us</h2>
              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/yourusername" className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:opacity-90 transition-opacity">
                  <span>GitHub</span>
                </a>
                <a href="https://twitter.com/yourusername" className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}