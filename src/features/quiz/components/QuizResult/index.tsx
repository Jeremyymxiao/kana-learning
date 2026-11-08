"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Question, KanaType, QuizType } from '../../types';
import { SignupCTA } from '@/components/auth/SignupCTA';
import { trackQuizComplete } from '@/lib/tracking';
import { getQuizKana } from '@/data/gojuon';
import { getMastery, getProgressSummary, loadProgress, type ProgressMap } from '@/lib/progress';
import ReactMarkdown from 'react-markdown';

interface QuizResultProps {
  score: number;
  wrongAnswers: Question[];
  onRetry: () => void;
  onSwitchKana?: () => void;
  kanaType: KanaType;
  quizType: QuizType;
}

/**
 * 掌握度小结的基准池：全部假名（清音 + 浊音 + 拗音，已排除 っ 与 ぢ/づ）。
 * 掌握度以平假名为 key（片假名共用），分母用整个池的长度。
 */
const PROGRESS_POOL = getQuizKana('all');

export function QuizResult({ score, wrongAnswers, onRetry, onSwitchKana, kanaType, quizType }: QuizResultProps) {
  // TODO(i18n): 固定键都走 QuizPage.*；analyze 失败没有专属键，先用已有的 Common.error
  const t = useTranslations('QuizPage');
  const tCommon = useTranslations('Common');

  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>('');
  // 累计掌握度：进入结果页时从 localStorage 读一次（本轮最后一题的成绩已写入）
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress());
  const trackedRef = useRef(false);

  // 四种题型统一在结果页上报完成（只报一次）
  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    trackQuizComplete(kanaType, quizType, score);
  }, [kanaType, quizType, score]);

  // 兜底：父组件若在挂载后才写入进度，这里再同步一次
  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError('');
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wrongAnswers }),
      });

      if (!response.ok) {
        throw new Error('analyze request failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let analysisText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                analysisText += data.content;
                setAnalysis(analysisText);
              } catch (e) {
                console.error('Error parsing SSE data:', e);
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('analyze error:', err);
      setError('analyze_failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 题型 / 假名类型显示名（沿用 QuizPage 已有键，不新增字面量）
  const quizTypeLabels: Record<QuizType, string> = {
    choice: t('singleChoice'),
    spelling: t('spelling'),
    matching: t('matching'),
    dictation: t('dictation'),
  };

  const kanaTypeLabels: Record<KanaType, string> = {
    hiragana: t('hiraganaOnly'),
    katakana: t('katakanaOnly'),
    mixed: t('mixedKana'),
    special: t('specialKana'),
    all: t('allKana'),
  };

  // 本轮结束时的累计掌握度（mastered 只数基准池内的，避免「x > y」）
  const progressSummary = useMemo(
    () => getProgressSummary(PROGRESS_POOL, progress),
    [progress]
  );
  const masteredCount = useMemo(
    () => PROGRESS_POOL.filter(kana => getMastery(progress[kana.hiragana]) === 3).length,
    [progress]
  );

  /**
   * 按题型决定「哪个是正确答案」：
   * - romajiToKana：正确答案是假名
   * - 其余（kanaToRomaji / dictation / spelling / matching）：正确答案是 romaji
   */
  const getAnswerPair = (question: Question) => {
    const kanaFirst = question.type === 'romajiToKana';
    return {
      primary: kanaFirst ? question.kana : question.romaji,
      primaryIsKana: kanaFirst,
      secondary: kanaFirst ? question.romaji : question.kana,
    };
  };

  // 听写题选项是假名、降级后输入是 romaji，按内容判断是否需要 lang="ja"
  const containsKana = (value?: string) => !!value && /[\u3040-\u30ff]/.test(value);

  return (
    <div className="space-y-6">
      {/* 本轮得分 */}
      <div className="text-center space-y-2">
        <p className="text-xl text-gray-600 dark:text-gray-300">{t('yourScore')}</p>
        <p className="text-5xl font-bold text-primary">
          {score}
          <span className="text-2xl text-gray-500 dark:text-gray-400">/100</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {kanaTypeLabels[kanaType]} · {quizTypeLabels[quizType]}
        </p>
      </div>

      {/* 累计掌握度小结 */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-blue-50/70 dark:bg-blue-900/10 p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t('progressLabel')}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t('masteredCount', { count: masteredCount, total: progressSummary.total })}
        </p>
        <Progress
          className="h-2"
          value={progressSummary.total ? (masteredCount / progressSummary.total) * 100 : 0}
          aria-label={t('progressLabel')}
        />
      </div>

      {wrongAnswers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{t('reviewWrong')}</h3>
          <div className="space-y-2">
            {wrongAnswers.map((q, index) => {
              const answer = getAnswerPair(q);
              const yourAnswerIsKana = q.type === 'romajiToKana' || containsKana(q.userAnswer);
              return (
                <div
                  key={`${q.id}-${index}`}
                  className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <span className="text-sm text-gray-500">
                        {t('questionOf', { current: index + 1, total: wrongAnswers.length })}
                      </span>
                      <p className="text-lg font-medium mt-1">
                        <span lang="ja" className="font-japanese">{q.kana}</span>
                        <span className="text-sm text-gray-500"> ({q.romaji})</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 dark:text-green-400">
                        {t('correctAnswer')}:{' '}
                        <span
                          lang={answer.primaryIsKana ? 'ja' : undefined}
                          className={answer.primaryIsKana ? 'font-japanese text-lg font-bold' : 'font-mono font-bold'}
                        >
                          {answer.primary}
                        </span>
                        <span className="ml-1 text-xs text-gray-500">
                          ({answer.primaryIsKana ? (
                            <span className="font-mono">{answer.secondary}</span>
                          ) : (
                            <span lang="ja" className="font-japanese">{answer.secondary}</span>
                          )})
                        </span>
                      </div>
                      <div className="text-red-600 dark:text-red-400">
                        {t('yourAnswer')}:{' '}
                        <span
                          lang={yourAnswerIsKana ? 'ja' : undefined}
                          className={yourAnswerIsKana ? 'font-japanese font-bold' : 'font-mono font-bold'}
                        >
                          {q.userAnswer ?? '—'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
              variant="outline"
            >
              {isAnalyzing ? t('analyzing') : t('aiAnalysis')}
            </Button>

            {error && (
              <div className="text-red-500 text-center" role="alert">
                {tCommon('error')}
              </div>
            )}

            {analysis && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">{t('aiAnalysis')}</h4>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <ReactMarkdown>
                    {analysis}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          className="w-full bg-primary hover:bg-primary/90"
          onClick={onRetry}
        >
          {t('tryAgain')}
        </Button>
        {onSwitchKana && (
          <Button variant="outline" className="w-full" onClick={onSwitchKana}>
            {kanaType === 'katakana' ? t('switchToHiragana') : t('switchToKatakana')}
          </Button>
        )}
      </div>

      <SignupCTA context="quiz_result" />
    </div>
  );
}
