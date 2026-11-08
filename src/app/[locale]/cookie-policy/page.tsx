export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toISOString().slice(0, 10)}</p>

      <div className="prose dark:prose-invert max-w-none">
        <p>
          LearnKana (learnkana.pro) is a free Japanese learning site. This page explains exactly
          which cookies and similar browser storage technologies we use, why we use them, and how
          you can change your mind at any time. We have deliberately kept our analytics small: there
          are four services in total, and only two of them run before you make a choice.
        </p>

        <h2>1. Your choice</h2>
        <p>
          When you first visit the site, a banner at the bottom of the page asks whether you accept
          analytics cookies. Until you answer, the optional services below are not started at all.
          Your answer is stored locally in your browser under the key{' '}
          <code>learnkana.consent.v1</code>. We do not send that value to our servers.
        </p>

        <h2>2. Services that run without cookies</h2>
        <p>
          These two services are privacy-friendly and do not create advertising profiles. They run
          regardless of your choice because they do not set or read cookies on your device.
        </p>
        <ul>
          <li>
            <strong>Vercel Analytics</strong> — first-party aggregate traffic measurement provided by
            our hosting provider Vercel. It records page views and referrers in an aggregated form
            and does not use cookies or fingerprinting. Purpose: understanding which lessons are
            useful and which pages fail. Cookies: no.
          </li>
          <li>
            <strong>Umami</strong> — a self-hosted, open-source analytics tool operated on our own
            domain (umami.jeremyym0612.work). It stores one anonymous session identifier and measures
            page views, referrers and device type. Purpose: traffic and content statistics. Cookies:
            no — it uses a session identifier stored in the browser, not a cookie.
          </li>
        </ul>

        <h2>3. Services that only run after you accept</h2>
        <ul>
          <li>
            <strong>Google Analytics 4</strong> (measurement ID G-0M56J3EFEE) — records page views and
            events such as starting a quiz or clicking a sign-up link, so we can see where learners
            get stuck. Cookies: yes, first-party <code>_ga</code> and <code>_ga_*</code> cookies with
            a lifetime of up to 13 months, set by Google. Google may process this data on servers
            outside your country.
          </li>
          <li>
            <strong>Microsoft Clarity</strong> (project ID qtqh6nav4v) — anonymised heatmaps and
            session replays used to spot interface problems. Inputs in forms are masked by default.
            Cookies: yes, first-party <code>_clck</code> and <code>_clsk</code> cookies, up to 12
            months. Purpose: usability research.
          </li>
        </ul>

        <h2>4. Advertising cookies</h2>
        <p>
          We do not run advertising cookies on this site. There is no ad network embedded, no
          remarketing pixel and no sale of personal data to advertisers. If this ever changes, we
          will ask for your consent again before any advertising script is loaded.
        </p>

        <h2>5. Essential storage</h2>
        <p>
          A small number of strictly necessary items keep the site working: your theme preference
          (light or dark), your interface language, and your Firebase authentication session if you
          sign in. These are required for the service to function and are not used for tracking.
        </p>

        <h2>6. How to withdraw or change your consent</h2>
        <p>You can change your decision at any time in either of these ways:</p>
        <ol>
          <li>
            Clear the consent record in your browser: open the developer tools console and run{' '}
            <code>localStorage.removeItem(&apos;learnkana.consent.v1&apos;)</code>, then reload the
            page. The consent banner will appear again and no optional service will start until you
            answer.
          </li>
          <li>
            Use your browser&apos;s cookie settings to delete the <code>_ga</code>, <code>_ga_*</code>,{' '}
            <code>_clck</code> and <code>_clsk</code> cookies, or to block third-party cookies
            entirely. Clearing site data also removes the stored answer.
          </li>
        </ol>
        <p>
          You can also install Google&apos;s Analytics opt-out add-on or Microsoft&apos;s opt-out
          tools. Declining analytics does not restrict any learning feature — charts, quizzes, the
          converter and the AI chat all work exactly the same.
        </p>

        <h2>7. Contact</h2>
        <p>
          Questions about this policy or about data we hold? Write to{' '}
          <a href="mailto:privacy@learnkana.pro">privacy@learnkana.pro</a>. See also our{' '}
          <a href="/privacy-policy">Privacy Policy</a> and{' '}
          <a href="/terms-of-service">Terms of Service</a>.
        </p>
      </div>
    </div>
  );
}
