"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KanaType, DictationQuestion } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { getQuizKana, isRomajiMatch } from '@/data/gojuon';
import { trackQuizAnswer } from '@/lib/tracking';
import { QuizResult } from '../QuizResult';
import { Progress } from '@/components/ui/progress';

interface DictationQuizProps {
  difficulty: KanaType;
  onRetry: () => void;
  onSwitchKana: () => void;
}

const TOTAL_QUESTIONS = 10;

const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function DictationQuiz({ difficulty, onRetry, onSwitchKana }: DictationQuizProps) {
  const [questions, setQuestions] = useState<DictationQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<DictationQuestion[]>([]);
  // TTS 不可用 / 播放出错时降级为「看假名打罗马字」
  const [degraded, setDegraded] = useState(false);

  // 出题：统一取池（排除 っ/ッ 与 ぢ/づ）
  const buildQuestions = useCallback((): DictationQuestion[] => {
    const pool = getQuizKana(difficulty);
    const picked = shuffle(pool).slice(0, TOTAL_QUESTIONS);

    return picked.map((kana, index) => {
      const distractors = shuffle(
        pool.filter(
          item => item.kana !== kana.kana && item.romaji !== kana.romaji
        )
      )
        .slice(0, 3)
        .map(item => item.kana);

      return {
        id: index,
        type: 'dictation',
        kana: kana.kana,
        romaji: kana.romaji,
        aliases: kana.aliases,
        options: shuffle([kana.kana, ...distractors]),
      };
    });
  }, [difficulty]);

  useEffect(() => {
    setQuestions(buildQuestions());
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    setUserInput('');
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setWrongAnswers([]);
  }, [buildQuestions]);

  // 检测浏览器语音合成能力
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      setDegraded(true);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      setDegraded(true);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => {
        setIsPlaying(false);
        setDegraded(true);
      };
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn('[dictation] speech synthesis failed, switching to typing mode', error);
      setIsPlaying(false);
      setDegraded(true);
    }
  }, []);

  const currentQuestion = questions[currentIndex];
  const currentKana = currentQuestion?.kana;

  // 每道新题自动播放一次
  useEffect(() => {
    if (!currentKana || degraded) return;
    speak(currentKana);
    // 只依赖当前题的假名，答完更新 userAnswer 时不会重播
  }, [currentIndex, currentKana, degraded, speak]);

  const answerQuestion = (answer: string) => {
    if (!currentQuestion || isAnswered || !answer) return;

    const correct = degraded
      ? isRomajiMatch(answer, currentQuestion.romaji, currentQuestion.aliases)
      : answer === currentQuestion.kana;

    const answeredQuestion: DictationQuestion = {
      ...currentQuestion,
      userAnswer: answer,
      isCorrect: correct,
    };

    setQuestions(prev => {
      const next = [...prev];
      next[currentIndex] = answeredQuestion;
      return next;
    });

    if (correct) {
      setScore(prev => prev + 10);
      playCorrectSound();
    } else {
      setWrongAnswers(prev => [...prev, answeredQuestion]);
      playWrongSound();
    }

    trackQuizAnswer(difficulty, 'dictation', correct);
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (!isAnswered) return;

    if (currentIndex >= questions.length - 1) {
      setIsComplete(true);
      return;
    }

    setCurrentIndex(index => index + 1);
    setUserInput('');
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
  };

  if (isComplete) {
    return (
      <QuizResult
        score={score}
        wrongAnswers={wrongAnswers}
        onRetry={onRetry}
        onSwitchKana={onSwitchKana}
        kanaType={difficulty}
        quizType="dictation"
      />
    );
  }

  if (!currentQuestion) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="mb-8">
        <Progress value={((currentIndex + 1) / TOTAL_QUESTIONS) * 100} />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Dictation</h2>
        <p className="text-sm text-gray-500">
          {degraded
            ? 'Typing mode: read the kana and type its romaji'
            : 'Listen and choose the kana you hear'}
        </p>
        <div className="text-sm text-gray-500">
          Question {currentIndex + 1} of {TOTAL_QUESTIONS} | Score: {score}
        </div>
      </div>

      {degraded && (
        <div
          role="alert"
          className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200"
        >
          你的浏览器不支持语音，已切换为看字打罗马字。请看着下面的假名输入罗马字。
        </div>
      )}

      {degraded ? (
        <div className="space-y-4">
          <div className="text-center">
            <span lang="ja" className="text-5xl font-bold font-japanese">
              {currentQuestion.kana}
            </span>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!isAnswered) answerQuestion(userInput);
            }}
            className="space-y-3"
          >
            <Input
              type="text"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              placeholder="Type romaji here..."
              className="text-center"
              disabled={isAnswered}
              aria-label="Type the romaji for the kana shown"
            />
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!userInput.trim() || isAnswered}
                className="flex-1"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => speak(currentQuestion.kana)}
              disabled={isPlaying}
              variant="outline"
              className="w-full max-w-sm"
            >
              {isPlaying ? 'Playing...' : 'Play sound (unlimited replays)'}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4" role="group" aria-label="Choose the kana you hear">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={option}
                type="button"
                lang="ja"
                size="quiz"
                disabled={isAnswered}
                onClick={() => {
                  setSelectedOption(option);
                  answerQuestion(option);
                }}
                variant={
                  !isAnswered
                    ? 'outline'
                    : option === currentQuestion.kana
                      ? 'correct'
                      : option === selectedOption
                        ? 'incorrect'
                        : 'outline'
                }
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="font-mono text-xs opacity-60">{index + 1}</span>
                  <span>{option}</span>
                </span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 反馈闸门：答完停住，等用户点 Next / 按 Enter */}
      <div aria-live="polite" role="status" className="min-h-[96px]">
        {isAnswered && (
          <div
            className={`rounded-lg border p-4 text-center space-y-1 ${
              isCorrect
                ? 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                : 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
            }`}
          >
            <p className="font-semibold">{isCorrect ? '✅ Correct!' : '❌ Not quite'}</p>
            <p className="text-sm">
              Correct answer:{' '}
              <span lang="ja" className="font-japanese text-lg font-bold">
                {currentQuestion.kana}
              </span>
              {' = '}
              <span className="font-mono font-bold">{currentQuestion.romaji}</span>
            </p>
            {!isCorrect && (
              <p className="text-sm text-red-700 dark:text-red-300">
                Your answer: <span>{selectedOption ?? userInput}</span>
              </p>
            )}
            <Button
              type="button"
              onClick={handleNext}
              className="mt-2"
              aria-label="Next question"
            >
              Next →
            </Button>
          </div>
        )}
      </div>

      {/* 已作答时按 Enter 继续 */}
      <KeyboardNext enabled={isAnswered} onNext={handleNext} />
    </div>
  );
}

function KeyboardNext({ enabled, onNext }: { enabled: boolean; onNext: () => void }) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'BUTTON')) return;
      if (event.key === 'Enter') {
        event.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled, onNext]);

  return null;
}
