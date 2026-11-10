'use client';

import MainLayout from '@/components/layouts/main-layout';
import { Link } from '../../../i18n.config';
import { articles } from '@/data/articles';
import { curriculum } from '@/data/curriculum';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/tracking';
import { ArrowUpRight } from 'lucide-react';

const FIRST_ROW = [
  { kana: 'あ', romaji: 'a' },
  { kana: 'い', romaji: 'i' },
  { kana: 'う', romaji: 'u' },
  { kana: 'え', romaji: 'e' },
  { kana: 'お', romaji: 'o' },
];

const FEATURES = [
  {
    id: 'ai-tutor',
    titleKey: 'aiTutor',
    descKey: 'aiTutorDesc',
    href: '/chat',
  },
  {
    id: 'charts',
    titleKey: 'kanaCharts',
    descKey: 'kanaChartsDesc',
    href: '/hiragana-katakana-chart',
  },
  {
    id: 'practice',
    titleKey: 'kanaPractice',
    descKey: 'kanaPracticeDesc',
    href: '/hiragana-katakana-quiz',
  },
  {
    id: 'converter',
    titleKey: 'textConverter',
    descKey: 'textConverterDesc',
    href: '/hiragana-katakana-converter',
  },
] as const;

export default function PageContent() {
  const t = useTranslations('HomePage');
  const tc = useTranslations('Course');
  const tn = useTranslations('Navigation');

  const uniqueKana = new Set(curriculum.flatMap((unit) => unit.kana));
  const lessonCount = curriculum.reduce((sum, unit) => sum + unit.lessons.length, 0);
  const stations = [...curriculum].sort((a, b) => a.order - b.order);
  const latestArticles = articles.slice(0, 4);

  return (
    <MainLayout>
      <div className="kl-home">
        {/* ── 01 · Station board ─────────────────────────────────────── */}
        <section className="kl-hero" aria-labelledby="kl-hero-title">
          <div className="kl-wrap kl-hero-grid">
            <div className="kl-hero-copy">
              <p className="kl-vertical" aria-hidden="true">
                仮名線
              </p>
              <h1 id="kl-hero-title" className="kl-display kl-hero-title">
                {t('heroTitle')}
              </h1>
              <p className="kl-hero-sub">{t('heroSubtitle')}</p>

              <div className="kl-hero-actions">
                <Link
                  href="/hiragana-katakana-quiz?start=hiragana&rows=a&type=choice"
                  onClick={() => trackEvent('start_quiz_click', { location: 'home_hero' })}
                  className="kl-seal"
                >
                  {t('startStation')}
                  <ArrowUpRight aria-hidden="true" className="kl-seal-icon" />
                </Link>
                <Link href="/course" className="kl-textlink">
                  {t('viewRoute')}
                </Link>
              </div>

              <p className="kl-signin">
                {t('alreadyLearning')}{' '}
                <Link href="/login" className="kl-signin-link">
                  {tn('login')}
                </Link>
                {' · '}
                <Link href="/register" className="kl-signin-link">
                  {tn('register')}
                </Link>
              </p>

              <p className="kl-facts">
                {t('routeNote', {
                  stations: stations.length,
                  lessons: lessonCount,
                  kana: uniqueKana.size,
                })}
              </p>
            </div>

            <div className="kl-hero-kana" aria-hidden="true">
              <span className="kl-glyph" lang="ja">あ</span>
              <span className="kl-glyph-caption">a</span>
              <span className="kl-platform">1</span>
            </div>
          </div>
          <div className="kl-hero-rule" />
        </section>

        {/* ── Kana systems ───────────────────────────────────────────── */}
        <section className="kl-section kl-systems" aria-labelledby="kl-systems-title">
          <div className="kl-wrap">
            <header className="kl-section-head">
              <h2 id="kl-systems-title" className="kl-display kl-h2">
                {t('masterBothKana')}
              </h2>
            </header>
            <div className="kl-systems-grid">
              <div className="kl-system">
                <span className="kl-system-glyph" lang="ja" aria-hidden="true">あ</span>
                <h3 className="kl-display kl-h3">{t('hiraganaTitle')}</h3>
                <p className="kl-lede">{t('hiraganaDescription')}</p>
                <Link href="/hiragana-katakana-chart" className="kl-textlink">
                  {t('learnHiragana')}
                </Link>
              </div>
              <div className="kl-system">
                <span className="kl-system-glyph" lang="ja" aria-hidden="true">ア</span>
                <h3 className="kl-display kl-h3">{t('katakanaTitle')}</h3>
                <p className="kl-lede">{t('katakanaDescription')}</p>
                <Link href="/hiragana-katakana-chart" className="kl-textlink">
                  {t('learnKatakana')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 · The route ─────────────────────────────────────────── */}
        <section className="kl-section kl-route" aria-labelledby="kl-route-title">
          <div className="kl-wrap">
            <header className="kl-section-head">
              <h2 id="kl-route-title" className="kl-display kl-h2">
                {t('routeTitle')}
              </h2>
              <p className="kl-lede">{t('routeSubtitle')}</p>
            </header>

            <ol className="kl-stations" style={{ ['--stations' as string]: stations.length }}>
              {stations.map((unit, index) => (
                <li
                  key={unit.id}
                  className="kl-station"
                  style={{ ['--i' as string]: index }}
                >
                  <Link href="/course" className="kl-station-link">
                    <span className="kl-station-no">{String(unit.order).padStart(2, '0')}</span>
                    <span className="kl-station-body">
                      <span className="kl-station-title">
                        {tc(`units.${unit.id}.title`)}
                      </span>
                      <span className="kl-station-goal">{tc(`units.${unit.id}.goal`)}</span>
                    </span>
                    <span className="kl-station-count" lang="ja">
                      {unit.kana.slice(0, 6).join('')}
                      {unit.kana.length > 6 ? '…' : ''}
                    </span>
                    <ArrowUpRight aria-hidden="true" className="kl-station-arrow" />
                  </Link>
                </li>
              ))}
            </ol>

            <div className="kl-route-foot">
              <Link href="/course" className="kl-textlink">
                {t('viewRoute')}
              </Link>
              <span className="kl-rule-fill" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ── 03 · One row at a time ─────────────────────────────────── */}
        <section className="kl-section kl-practice" aria-labelledby="kl-practice-title">
          <div className="kl-wrap">
            <header className="kl-section-head">
              <h2 id="kl-practice-title" className="kl-display kl-h2">
                {t('practiceTitle')}
              </h2>
              <p className="kl-lede">{t('practiceLede')}</p>
            </header>

            <div className="kl-row">
              {FIRST_ROW.map((item) => (
                <Link
                  key={item.kana}
                  href="/hiragana-katakana-quiz?start=hiragana&rows=a&type=choice"
                  className="kl-kana"
                  onClick={() => trackEvent('practice_row_click', { kana: item.kana })}
                >
                  <span lang="ja">{item.kana}</span>
                  <span className="kl-kana-romaji">{item.romaji}</span>
                </Link>
              ))}
            </div>

            <p className="kl-footnote">
              <Link href="/hiragana-katakana-quiz?start=hiragana&rows=a&type=choice" className="kl-textlink">
                {t('startStation')}
              </Link>
            </p>
          </div>
        </section>

        {/* ── Desk / what you get ────────────────────────────────────── */}
        <section className="kl-section kl-tools" aria-labelledby="kl-tools-title">
          <div className="kl-wrap kl-tools-grid">
            <header className="kl-section-head kl-section-head-tight">
              <h2 id="kl-tools-title" className="kl-display kl-h2">
                {t('featuresTitle')}
              </h2>
            </header>
            <ul className="kl-index">
              {FEATURES.map((feature) => (
                <li key={feature.id}>
                  <Link href={feature.href} className="kl-index-link kl-index-link-rich">
                    <span className="kl-index-body">
                      <span className="kl-index-name">{t(feature.titleKey)}</span>
                      <span className="kl-index-desc">{t(feature.descKey)}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="kl-index-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 05 · Reading ───────────────────────────────────────────── */}
        <section className="kl-section kl-reading" aria-labelledby="kl-reading-title">
          <div className="kl-wrap kl-tools-grid">
            <header className="kl-section-head kl-section-head-tight">
              <h2 id="kl-reading-title" className="kl-display kl-h2">
                {t('learningGuidesTitle')}
              </h2>
            </header>
            <ul className="kl-index">
              {latestArticles.map((article) => (
                <li key={article.id}>
                  <Link href={`/learn/${article.slug}`} className="kl-index-link">
                    <span className="kl-index-name">{article.title}</span>
                    <ArrowUpRight aria-hidden="true" className="kl-index-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 06 · Questions ─────────────────────────────────────────── */}
        <section className="kl-section kl-faq" aria-labelledby="kl-faq-title">
          <div className="kl-wrap">
            <header className="kl-section-head">
              <h2 id="kl-faq-title" className="kl-display kl-h2">
                {t('faqTitle')}
              </h2>
            </header>
            <div className="kl-faq-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <details key={n} className="kl-faq-item" open={n <= 2}>
                  <summary>
                    <span className="kl-faq-q">{t(`faq${n}Question`)}</span>
                  </summary>
                  <p>{t(`faq${n}Answer`)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 07 · Close ─────────────────────────────────────────────── */}
        <section className="kl-close" aria-labelledby="kl-close-title">
          <div className="kl-wrap kl-close-grid">
            <div>
              <h2 id="kl-close-title" className="kl-display kl-close-title">
                {t('closeTitle')}
              </h2>
              <p className="kl-lede">{t('closeBody')}</p>
              <p className="kl-close-note">{t('heroDescription')}</p>
              <Link
                href="/hiragana-katakana-quiz?start=hiragana&rows=a&type=choice"
                className="kl-seal"
                onClick={() => trackEvent('start_quiz_click', { location: 'home_close' })}
              >
                {t('startStation')}
                <ArrowUpRight aria-hidden="true" className="kl-seal-icon" />
              </Link>
            </div>
            <span className="kl-close-glyph" aria-hidden="true" lang="ja">
              い
            </span>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
