"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Question, KanaType, QuizType } from '../../types';
import { SignupCTA } from '@/components/auth/SignupCTA';
import { trackQuizComplete } from '@/lib/tracking';
import ReactMarkdown from 'react-markdown';

interface QuizResultProps {
  score: number;
  wrongAnswers: Question[];
  onRetry: () => void;
  onSwitchKana?: () => void;
  kanaType: KanaType;
  quizType: QuizType;
}

export function QuizResult({ score, wrongAnswers, onRetry, onSwitchKana, kanaType, quizType }: QuizResultProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>('');
  const trackedRef = useRef(false);

  // 四种题型统一在结果页上报完成（只报一次）
  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    trackQuizComplete(kanaType, quizType, score);
  }, [kanaType, quizType, score]);

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
        throw new Error('分析请求失败');
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
      console.error('分析错误:', err);
      setError('分析过程中出现错误，请稍后重试');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 获取测试类型的显示名称
  const getQuizTypeDisplay = (type: QuizType) => {
    switch (type) {
      case 'choice':
        return 'Single Choice';
      case 'spelling':
        return 'Spelling';
      case 'matching':
        return 'Matching';
      case 'dictation':
        return 'Dictation';
      default:
        return type;
    }
  };

  // 获取假名类型的显示名称
  const getKanaTypeDisplay = (type: KanaType) => {
    switch (type) {
      case 'hiragana':
        return 'Hiragana';
      case 'katakana':
        return 'Katakana';
      case 'mixed':
        return 'Mixed';
      case 'special':
        return 'Special Characters';
      case 'all':
        return 'All Characters';
      default:
        return type;
    }
  };

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

  const switchKanaTarget: KanaType = kanaType === 'katakana' ? 'hiragana' : 'katakana';
  const switchKanaLabel = `Switch to ${switchKanaTarget === 'katakana' ? 'Katakana' : 'Hiragana'}`;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Test Complete!</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {getQuizTypeDisplay(quizType)} - {getKanaTypeDisplay(kanaType)}
        </p>
        <p className="text-2xl mt-4">
          Your Score: <span className="text-primary font-bold">{score}/100</span>
        </p>
      </div>

      {wrongAnswers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Review Wrong Answers</h3>
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
                      <span className="text-sm text-gray-500">Question {index + 1}</span>
                      <p className="text-lg font-medium mt-1">
                        <span lang="ja" className="font-japanese">{q.kana}</span>
                        <span className="text-sm text-gray-500"> ({q.romaji})</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 dark:text-green-400">
                        Correct Answer:{' '}
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
                        Your Answer:{' '}
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
              {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
            </Button>

            {error && (
              <div className="text-red-500 text-center">
                An error occurred during analysis. Please try again later.
              </div>
            )}

            {analysis && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">AI Analysis Result</h4>
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
          Try Again
        </Button>
        {onSwitchKana && (
          <Button variant="outline" className="w-full" onClick={onSwitchKana}>
            {switchKanaLabel}
          </Button>
        )}
      </div>

      <SignupCTA context="quiz_result" />
    </div>
  );
}
