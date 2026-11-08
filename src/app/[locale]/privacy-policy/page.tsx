'use client';

import MainLayout from '@/components/layouts/main-layout';

export default function PrivacyPolicyPage() {
  return (
    <MainLayout
      currentTab="privacy"
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Last updated: {new Date().toISOString().slice(0, 10)}
        </p>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. What this policy covers</h2>
            <p>
              LearnKana (learnkana.pro) is a free Japanese learning site. This policy describes what
              we collect, which third parties are involved, and what you can do about it. We do not
              sell personal data and we do not run an advertising business.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Accounts and authentication</h2>
            <p>
              Account sign-in is optional and handled by <strong>Firebase Authentication</strong>{' '}
              (Google). You can register with an email address or sign in with Google. Firebase
              receives your email address, a user identifier, and — for Google sign-in — your basic
              profile name and avatar. We do not receive or store your password. Signing in is only
              needed to keep progress across devices; every learning tool works without an account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. What we store</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>MongoDB</strong> — if you create an account, we store your user record
                (account identifier, email, display name) and your saved progress in our own database.
              </li>
              <li>
                <strong>Browser storage</strong> — your theme preference, interface language, quiz
                progress for guests, and your analytics consent choice.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. AI chat and text analysis</h2>
            <p>
              The AI tutor and the Japanese text analyzer can send the text you type to third-party
              APIs to generate a reply or reading aid. <strong>DeepSeek API</strong> is used for chat
              completions; the message content you send is transmitted to that provider and processed
              under their terms. Japanese text analysis uses a dictionary that runs on our server.
              Do not paste passwords, private documents or sensitive personal data into the chat.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Analytics</h2>
            <p>We use four analytics services, described in detail in our Cookie Policy:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Vercel Analytics</strong> — cookieless, aggregate traffic measurement.
              </li>
              <li>
                <strong>Umami</strong> — cookieless, self-hosted page-view statistics.
              </li>
              <li>
                <strong>Google Analytics 4</strong> — only after you accept analytics cookies; sets
                first-party <code>_ga</code> cookies.
              </li>
              <li>
                <strong>Microsoft Clarity</strong> — only after you accept; anonymised heatmaps and
                session replays with form inputs masked.
              </li>
            </ul>
            <p>
              Declining turns Google Analytics and Microsoft Clarity off completely. We do not use
              advertising or remarketing cookies, and no ad network script is loaded on this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Hosting and logs</h2>
            <p>
              The site is hosted by Vercel and served through their global network. Like any web
              server, our infrastructure may process technical logs (IP address, user agent,
              requested URL) for security, abuse prevention and reliability. These logs are retained
              for a short, operationally necessary period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Your rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Ask which personal data we hold about you</li>
              <li>Request correction or deletion of your account and progress</li>
              <li>Withdraw analytics consent at any time</li>
              <li>Use every learning feature without an account</li>
            </ul>
            <p>
              To withdraw consent, clear <code>learnkana.consent.v1</code> from your browser storage
              (or delete cookies) and reload the page; the consent banner will appear again.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
            <p>
              For privacy questions or deletion requests, contact us at:
              <a href="mailto:privacy@learnkana.pro" className="text-blue-500 hover:text-blue-600 ml-2">
                privacy@learnkana.pro
              </a>
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
