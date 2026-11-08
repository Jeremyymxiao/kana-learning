"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQuiz, TOTAL_QUESTIONS } from '../hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { KanaType, QuizType, ChoiceQuestion } from '../types';
import { ArrowLeft } from 'lucide-react';
import { trackQuizStart } from '@/lib/tracking';
import { getQuizKana } from '@/data/gojuon';
import { getMastery, getProgressSummary, loadProgress, type ProgressMap } from '@/lib/progress';
import { QuizQuestion } from './QuizQuestion/index';
import { QuizResult } from './QuizResult/index';
import { MatchingGame } from './matching/index';
import { DictationQuiz } from './dictation/index';
import { SpellingQuiz } from './spelling/index';

interface QuizPanelProps {
  onConfigChange: (showConfig: boolean) => void;
}

/** 配置页「最弱假名」最多展示几个 */
const WEAKEST_SHOWN = 6;

/**
 * 进度汇总的基准池：全部假名（清音 + 浊音 + 拗音，已排除 っ 与 ぢ/づ）。
 * 掌握度以平假名为 key（片假名共用），分母用整个池的长度，这样练特殊音也计入。
 */
const PROGRESS_POOL = getQuizKana('all');

/** ?start= 允许的假名类型（与 KanaType 一致） */
const START_KANA_TYPES: readonly KanaType[] = ['hiragana', 'katakana', 'mixed', 'special', 'all'];
/** ?start= 允许的题型后缀（缺省时用 choice） */
const START_QUIZ_TYPES: readonly QuizType[] = ['choice', 'spelling', 'matching', 'dictation'];

/**
 * 解析一键开练参数：
 * - `?start=hiragana` → 平假名 + 单选
 * - `?start=katakana-spelling` → 片假名 + 拼写（兼容未来带题型的形式）
 * 非法值返回 null，走正常配置页流程。
 */
const parseStartParam = (raw: string | null): { kanaType: KanaType; quizType: QuizType } | null => {
  if (!raw) return null;
  const [kanaPart, quizPart] = raw.split('-');
  if (!START_KANA_TYPES.includes(kanaPart as KanaType)) return null;
  const quizType = START_QUIZ_TYPES.includes(quizPart as QuizType)
    ? (quizPart as QuizType)
    : 'choice';
  return { kanaType: kanaPart as KanaType, quizType };
};

export function QuizPanel({ onConfigChange }: QuizPanelProps) {
  const t = useTranslations('QuizPage');
  const searchParams = useSearchParams();
  const startParam = searchParams.get('start');

  const [selectedDifficulty, setSelectedDifficulty] = useState<KanaType>('hiragana');
  const [activeKanaType, setActiveKanaType] = useState<KanaType>('hiragana');
  const [testType, setTestType] = useState<QuizType>('choice');
  const [showConfig, setShowConfig] = useState(true);
  // 子题型重开一局时用 key 重挂载，重新初始化题目
  const [runKey, setRunKey] = useState(0);
  // 配置页展示的进度快照（每次回到配置页都从 localStorage 重新读）
  const [progressMap, setProgressMap] = useState<ProgressMap>({});
  // 一键开练只触发一次（避免 searchParams 变化 / 重渲染重复开局）
  const autoStartedRef = useRef(false);

  const {
    startTest,
    submitAnswer,
    nextQuestion,
    getCurrentQuestion,
    currentQuestionIndex,
    score,
    isComplete,
    wrongAnswers,
  } = useQuiz();

  // 回到配置页时重新读取进度：上一轮（含其他题型）刚写入的掌握度要立刻可见
  useEffect(() => {
    if (showConfig) setProgressMap(loadProgress());
  }, [showConfig]);

  // 开始测试：配置页按钮与一键开练共用同一条路径
  const launchQuiz = useCallback(
    (kanaType: KanaType, quizType: QuizType) => {
      setSelectedDifficulty(kanaType);
      setActiveKanaType(kanaType);
      setTestType(quizType);
      startTest(kanaType, quizType);
      trackQuizStart(kanaType, quizType);
      setShowConfig(false);
      onConfigChange(false);
      setRunKey(key => key + 1);
    },
    [onConfigChange, startTest]
  );

  // 一键开练：?start=hiragana / katakana / mixed / special / all（可带题型后缀）
  useEffect(() => {
    if (autoStartedRef.current) return;
    const start = parseStartParam(startParam);
    if (!start) return;
    autoStartedRef.current = true;
    launchQuiz(start.kanaType, start.quizType);
  }, [launchQuiz, startParam]);

  // 开始测试
  const handleStart = () => {
    launchQuiz(selectedDifficulty, testType);
  };

  // 中途返回配置页
  const handleBack = () => {
    setShowConfig(true);
    onConfigChange(true);
  };

  // 再来一轮（同题型、同假名类型）
  const handleRetry = () => {
    if (testType === 'choice') {
      startTest(activeKanaType, 'choice');
    }
    setRunKey(key => key + 1);
  };

  // 换平假名 / 片假名
  const handleSwitchKana = () => {
    const nextKanaType: KanaType = activeKanaType === 'katakana' ? 'hiragana' : 'katakana';
    setActiveKanaType(nextKanaType);
    if (testType === 'choice') {
      startTest(nextKanaType, 'choice');
    }
    setRunKey(key => key + 1);
  };

  // 进度汇总（基准池 = 平假名清音）；mastered 只数这个池子里的，避免「x > y」
  const progressSummary = useMemo(
    () => getProgressSummary(PROGRESS_POOL, progressMap),
    [progressMap]
  );
  const masteredCount = useMemo(
    () => PROGRESS_POOL.filter(kana => getMastery(progressMap[kana.hiragana]) === 3).length,
    [progressMap]
  );
  const weakest = progressSummary.weakest.slice(0, WEAKEST_SHOWN);

  // 定义测试类型选项（文案全部来自 QuizPage.* i18n 键）
  const quizTypes: Array<{ value: QuizType; label: string; description: string }> = [
    { value: 'choice', label: t('singleChoice'), description: t('singleChoiceDesc') },
    { value: 'spelling', label: t('spelling'), description: t('spellingDesc') },
    { value: 'matching', label: t('matching'), description: t('matchingDesc') },
    { value: 'dictation', label: t('dictation'), description: t('dictationDesc') }
  ];

  // 定义假名类型选项（文案全部来自 QuizPage.* i18n 键）
  const kanaTypes: Array<{ value: KanaType; label: string; description: string }> = [
    { value: 'hiragana', label: t('hiraganaOnly'), description: t('hiraganaOnlyDesc') },
    { value: 'katakana', label: t('katakanaOnly'), description: t('katakanaOnlyDesc') },
    { value: 'mixed', label: t('mixedKana'), description: t('mixedKanaDesc') },
    { value: 'special', label: t('specialKana'), description: t('specialKanaDesc') },
    { value: 'all', label: t('allKana'), description: t('allKanaDesc') }
  ];

  const optionCardClass = (selected: boolean) => `
    w-full cursor-pointer rounded-lg p-6 border-2 transition-all min-h-24 flex flex-col justify-center items-center text-center
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
    ${selected
      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
    }`;

  // 进度卡：累计掌握度 + 最弱假名（掌握度以平假名为 key，无历史时只显示 0 of N）
  const renderProgressSummary = () => (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-blue-50/70 dark:bg-blue-900/10 p-4 space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {t('masteredCount', { count: masteredCount, total: progressSummary.total })}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{t('weakHint')}</p>
      </div>

      <Progress
        className="h-2"
        value={progressSummary.total ? (masteredCount / progressSummary.total) * 100 : 0}
        aria-label={t('progressLabel')}
      />

      {weakest.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {weakest.map(item => (
            <span
              key={item.hiragana}
              lang="ja"
              className="font-japanese rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-0.5 text-sm text-gray-800 dark:text-gray-100"
            >
              {item.hiragana}
            </span>
          ))}
          <Button size="sm" variant="outline" onClick={handleStart}>
            {t('startNow')}
          </Button>
        </div>
      )}
    </div>
  );

  // 渲染配置面板
  const renderConfig = () => (
    <div className="space-y-8 p-4 w-full max-w-4xl mx-auto">
      {renderProgressSummary()}

      {/* Kana Type Selection */}
      <div className="space-y-4">
        <h3 id="kana-type-label" className="text-xl font-medium text-center">{t('selectKanaType')}</h3>
        <div role="radiogroup" aria-labelledby="kana-type-label" className="grid md:grid-cols-2 gap-4">
          {kanaTypes.map((level) => (
            <button
              key={level.value}
              type="button"
              role="radio"
              aria-checked={selectedDifficulty === level.value}
              onClick={() => setSelectedDifficulty(level.value)}
              className={optionCardClass(selectedDifficulty === level.value)}
            >
              <span className="block font-bold mb-3">{level.label}</span>
              <span className="block text-sm text-gray-600 dark:text-gray-300">{level.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Type Selection */}
      <div className="space-y-4">
        <h3 id="quiz-type-label" className="text-xl font-medium text-center">{t('selectQuizType')}</h3>
        <div role="radiogroup" aria-labelledby="quiz-type-label" className="grid md:grid-cols-2 gap-4">
          {quizTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              role="radio"
              aria-checked={testType === type.value}
              onClick={() => setTestType(type.value)}
              className={optionCardClass(testType === type.value)}
            >
              <span className="block font-bold mb-3">{type.label}</span>
              <span className="block text-sm text-gray-600 dark:text-gray-300">{type.description}</span>
            </button>
          ))}
        </div>
      </div>

      <Button
        className="w-full text-lg py-6"
        onClick={handleStart}
      >
        {t('startQuiz')}
      </Button>
    </div>
  );

  const currentQuestion = getCurrentQuestion();
  let choiceQuestion: ChoiceQuestion | null = null;
  if (
    currentQuestion &&
    (currentQuestion.type === 'kanaToRomaji' || currentQuestion.type === 'romajiToKana')
  ) {
    choiceQuestion = currentQuestion;
  }
  const answeredCount = Math.min(currentQuestionIndex + 1, TOTAL_QUESTIONS);

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[650px] flex flex-col">
      {showConfig ? (
        renderConfig()
      ) : (
        <div className="space-y-4 p-4 flex-1 flex flex-col">
          {/* Back + 进度/得分：不用绝对定位，长语言文案（德语/葡萄牙语）可以换行不重叠 */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToQuizzes')}
            </Button>

            {/* 进度/得分：只有选择题走 useQuiz 的计分，其它题型在自己的组件里显示 */}
            {testType === 'choice' && (
              <div className="text-sm text-right ml-auto">
                <span>{t('progressLabel')}: {answeredCount}/{TOTAL_QUESTIONS}</span>
                <span className="ml-4">{t('scoreLabel')}: {score}</span>
              </div>
            )}
          </div>

          {/* 包装测试内容的容器 */}
          <div className="flex-1 flex flex-col">
            {testType === 'choice' && (
              isComplete ? (
                <QuizResult
                  score={score}
                  wrongAnswers={wrongAnswers}
                  onRetry={handleRetry}
                  onSwitchKana={handleSwitchKana}
                  kanaType={activeKanaType}
                  quizType="choice"
                />
              ) : choiceQuestion ? (
                <>
                  <div className="mb-8">
                    <Progress
                      value={(answeredCount / TOTAL_QUESTIONS) * 100}
                      aria-label={t('progressLabel')}
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex-[0.7]" /> {/* 上部空白 */}
                    <QuizQuestion
                      question={choiceQuestion}
                      onSubmit={submitAnswer}
                      onNext={nextQuestion}
                    />
                    <div className="flex-[1.3]" /> {/* 下部空白，比上部空白更大 */}
                  </div>
                </>
              ) : null
            )}

            {testType === 'matching' && (
              <MatchingGame
                key={`matching-${runKey}`}
                difficulty={activeKanaType}
                onRetry={handleRetry}
                onSwitchKana={handleSwitchKana}
              />
            )}

            {testType === 'dictation' && (
              <DictationQuiz
                key={`dictation-${runKey}`}
                difficulty={activeKanaType}
                onRetry={handleRetry}
                onSwitchKana={handleSwitchKana}
              />
            )}

            {testType === 'spelling' && (
              <SpellingQuiz
                key={`spelling-${runKey}`}
                difficulty={activeKanaType}
                onRetry={handleRetry}
                onSwitchKana={handleSwitchKana}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
