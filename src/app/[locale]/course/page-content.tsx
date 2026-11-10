'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Keyboard,
  PenTool,
  Shuffle,
  Table,
  Trophy,
  Volume2,
} from 'lucide-react';
import MainLayout from '@/components/layouts/main-layout';
import { Link } from '../../../../i18n.config';
import { useTranslations } from 'next-intl';
import { curriculum, type Lesson } from '@/data/curriculum';
import { getMastery, getProgressSummary, loadProgress, type ProgressMap } from '@/lib/progress';
import { trackEvent } from '@/lib/tracking';

/** 单元 → 五十音图 tab（数据层没有 tab 字段，这里按课程设计映射）。 */
const CHART_TAB_BY_UNIT: Record<string, 'seion' | 'dakuon' | 'youon'> = {
  u4: 'dakuon',
  u5: 'youon',
};

const chartTabForUnit = (unitId: string): 'seion' | 'dakuon' | 'youon' =>
  CHART_TAB_BY_UNIT[unitId] ?? 'seion';

/**
 * 约定格式：`/hiragana-katakana-quiz?start=<kanaType>&rows=<a,ka,sa>&type=<quizType>`
 *
 * 兼容说明：当前 `QuizPanel.parseStartParam` 只解析 `start`（支持 `<kanaType>-<quizType>` 后缀），
 * 尚未读取 `type` 参数。因此非 choice 题型把题型写进 start 后缀，保证点课时直接进入对应题型；
 * `type` 参数仍然保留，等 quiz 侧支持后可去掉后缀。
 */
const quizHref = (quiz: NonNullable<Lesson['quiz']>): string => {
  const start =
    quiz.quizType === 'choice' ? quiz.kanaType : `${quiz.kanaType}-${quiz.quizType}`;
  const parts = [`start=${start}`];
  if (quiz.rows && quiz.rows.length > 0) parts.push(`rows=${quiz.rows.join(',')}`);
  parts.push(`type=${quiz.quizType}`);
  return `/hiragana-katakana-quiz?${parts.join('&')}`;
};

const lessonHref = (lesson: Lesson, unitId: string): string => {
  if (lesson.kind === 'chart') return `/hiragana-katakana-chart?tab=${chartTabForUnit(unitId)}`;
  if (lesson.kind === 'article' && lesson.articleSlug) return `/learn/${lesson.articleSlug}`;
  if (lesson.kind === 'quiz' && lesson.quiz) return quizHref(lesson.quiz);
  return '/course';
};

const lessonIcon = (lesson: Lesson) => {
  if (lesson.kind === 'chart') return Table;
  if (lesson.kind === 'article') return BookOpen;
  switch (lesson.quiz?.quizType) {
    case 'dictation':
      return Volume2;
    case 'matching':
      return Shuffle;
    case 'spelling':
      return Keyboard;
    default:
      return PenTool;
  }
};

/**
 * 按「给定假名池」统计掌握度。
 * 注意：`getProgressSummary` 的 `mastered` 是整张进度表的总数（不按池裁剪），
 * 因此这里用 `getMastery` 在池内重新计数，保证单元进度与总进度的分母/分子一致。
 */
const summarizePool = (kana: string[], map: ProgressMap) => {
  const pool = kana.map((hiragana) => ({ hiragana }));
  const summary = getProgressSummary(pool, map);
  const mastered = pool.filter(({ hiragana }) => getMastery(map[hiragana]) === 3).length;
  return { ...summary, mastered, total: pool.length };
};

/**
 * 语义化进度条。
 * `src/components/ui/progress.tsx` 没有把 `value` 传给 Radix Root，导致 role="progressbar"
 * 始终是 indeterminate、读屏拿不到数值；这里不改共享组件，在课程页用最小实现保证 aria-valuenow 正确。
 */
const ProgressBar = ({
  value,
  label,
  className = '',
}: {
  value: number;
  label: string;
  className?: string;
}) => (
  <div
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={value}
    aria-label={label}
    className={`w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 ${className}`}
  >
    <div
      className="h-full rounded-full bg-[#2E7D32] dark:bg-[#81C784] transition-[width] duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

export default function CoursePageContent() {
  const t = useTranslations('Course');

  // 进度只在客户端读取，首帧（SSR 与 hydration）统一渲染占位符，避免 hydration mismatch。
  const [progressMap, setProgressMap] = useState<ProgressMap | null>(null);

  useEffect(() => {
    setProgressMap(loadProgress());
  }, []);

  const coursePool = useMemo(
    () => Array.from(new Set(curriculum.flatMap((unit) => unit.kana))),
    []
  );

  const courseSummary = useMemo(
    () => (progressMap ? summarizePool(coursePool, progressMap) : null),
    [progressMap, coursePool]
  );

  const unitSummaries = useMemo(() => {
    if (!progressMap) return null;
    return Object.fromEntries(
      curriculum.map((unit) => [unit.id, summarizePool(unit.kana, progressMap)])
    ) as Record<string, ReturnType<typeof summarizePool>>;
  }, [progressMap]);

  const progressReady = progressMap !== null && courseSummary !== null;
  const totalKana = coursePool.length;
  const masteredKana = courseSummary?.mastered ?? 0;
  const percent = progressReady && totalKana > 0 ? Math.round((masteredKana / totalKana) * 100) : 0;
  const courseStarted = (courseSummary?.seen ?? 0) > 0;

  return (
    <MainLayout currentTab="learn">
      <div className="relative min-h-screen bg-white dark:bg-[#1A1B2F]">
        {/* 装饰性背景（与 /learn 视觉语言一致） */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-[60%] bg-[#4CAF50] transform -skew-y-6 opacity-10"></div>
          <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-[#81C784] transform rotate-12 opacity-10"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#A5D6A7] rounded-full opacity-10"></div>
        </div>

        <div className="relative">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-5xl mx-auto">
              {/* 页头 */}
              <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#2E7D32] dark:text-[#81C784]">
                  {t('title')}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {t('subtitle')}
                </p>
              </header>

              {/* 课程总进度 */}
              <section
                id="course-progress"
                aria-labelledby="course-progress-heading"
                aria-busy={!progressReady}
                className="mb-10 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <h2
                      id="course-progress-heading"
                      className="text-lg font-semibold text-gray-800 dark:text-gray-100"
                    >
                      {t('progressLabel')}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {progressReady
                        ? t('masteredCount', { count: masteredKana, total: totalKana })
                        : '—'}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-2xl font-bold text-[#2E7D32] dark:text-[#81C784]"
                  >
                    {progressReady ? `${percent}%` : '—'}
                  </span>
                </div>
                <ProgressBar
                  value={percent}
                  label={t('progressLabel')}
                  className="mt-4 h-3"
                />
              </section>

              {/* 7 个单元 */}
              <div className="grid gap-6 md:grid-cols-2">
                {curriculum.map((unit) => {
                  const unitSummary = unitSummaries?.[unit.id];
                  const unitTotal = unit.kana.length;
                  const unitMastered = unitSummary?.mastered ?? 0;
                  const unitTitle = t(`units.${unit.id}.title`);
                  const unitGoal = t(`units.${unit.id}.goal`);
                  const ctaKey =
                    unitMastered === 0
                      ? 'startUnit'
                      : unitMastered < unitTotal
                        ? 'continueUnit'
                        : 'reviewUnit';
                  const primaryQuizLesson =
                    unit.lessons.find(
                      (lesson) => lesson.kind === 'quiz' && lesson.quiz?.quizType === 'choice'
                    ) ?? unit.lessons.find((lesson) => lesson.kind === 'quiz');
                  const ctaHref = primaryQuizLesson
                    ? lessonHref(primaryQuizLesson, unit.id)
                    : lessonHref(unit.lessons[0], unit.id);

                  return (
                    <section
                      key={unit.id}
                      id={unit.id}
                      aria-label={`${unit.order}. ${unitTitle}`}
                      className="flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg p-6"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4CAF50]/15 text-[#2E7D32] dark:text-[#81C784] font-bold"
                        >
                          {unit.order}
                        </span>
                        <div className="min-w-0">
                          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                            {unitTitle}
                          </h2>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{unitGoal}</p>
                        </div>
                      </div>

                      {/* 单元进度 */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">
                            {unitSummary
                              ? t('unitProgress', { count: unitMastered, total: unitTotal })
                              : '—'}
                          </span>
                          {unitSummary && unitMastered === unitTotal && unitTotal > 0 ? (
                            <CheckCircle2
                              className="h-4 w-4 text-[#2E7D32] dark:text-[#81C784]"
                              aria-hidden="true"
                            />
                          ) : null}
                        </div>
                        <ProgressBar
                          value={unitTotal > 0 ? Math.round((unitMastered / unitTotal) * 100) : 0}
                          label={t('unitProgress', {
                            count: unitMastered,
                            total: unitTotal,
                          })}
                          className="mt-2 h-2"
                        />
                      </div>

                      {/* 课时列表 */}
                      <h3 className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {t('lessonsLabel')}
                      </h3>
                      <ul className="space-y-1">
                        {unit.lessons.map((lesson) => {
                          const Icon = lessonIcon(lesson);
                          const href = lessonHref(lesson, unit.id);
                          return (
                            <li key={lesson.id}>
                              <Link
                                href={href}
                                className="group flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#4CAF50]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32]"
                              >
                                <Icon
                                  className="h-4 w-4 shrink-0 text-[#2E7D32] dark:text-[#81C784]"
                                  aria-hidden="true"
                                />
                                <span className="min-w-0 flex-1 truncate">
                                  {t(`lessons.${lesson.id}.title`)}
                                </span>
                                <span className="shrink-0 rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:text-gray-300">
                                  {t(`lessonTypes.${lesson.kind}`)}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      {/* 主按钮：0 → startUnit；部分 → continueUnit；全部掌握 → reviewUnit */}
                      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Link
                          href={ctaHref}
                          onClick={() =>
                            trackEvent('course_unit_click', {
                              unit: unit.id,
                              cta: ctaKey,
                              href: ctaHref,
                            })
                          }
                          aria-label={`${t(ctaKey, { number: unit.order })} — ${unitTitle}`}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2E7D32] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#256B2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2"
                        >
                          {t(ctaKey, { number: unit.order })}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        {!courseStarted && unit.order > 1 ? (
                          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {t('lockedHint')}
                          </p>
                        ) : null}
                      </div>
                    </section>
                  );
                })}

                {/* 综合测试 */}
                <section
                  id="final-test"
                  aria-labelledby="final-test-heading"
                  className="relative flex flex-col rounded-2xl border border-[#4CAF50]/30 bg-gradient-to-br from-[#4CAF50]/10 to-[#2B7FFF]/10 p-6"
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4CAF50] text-white"
                    >
                      <Trophy className="h-5 w-5" />
                    </span>
                    <div>
                      <h2
                        id="final-test-heading"
                        className="text-lg font-bold text-gray-800 dark:text-gray-100"
                      >
                        {t('finalTest')}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {t('finalTestDesc')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto pt-5">
                    <Link
                      href="/hiragana-katakana-quiz?start=all"
                      onClick={() =>
                        trackEvent('course_unit_click', {
                          unit: 'final',
                          cta: 'startFinalTest',
                          href: '/hiragana-katakana-quiz?start=all',
                        })
                      }
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2B7FFF] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1f6ae0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B7FFF] focus-visible:ring-offset-2"
                    >
                      {t('startFinalTest')}
                      <GraduationCap className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </section>
              </div>

              {/* 文章库 */}
              <div className="mt-10 text-center">
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-[#2E7D32] dark:text-[#81C784] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  {t('articleLibrary')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
