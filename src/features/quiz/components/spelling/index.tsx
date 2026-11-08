"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KanaType, SpellingQuestion } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { getQuizKana, isRomajiMatch } from '@/data/gojuon';
import { trackQuizAnswer } from '@/lib/tracking';
import { QuizResult } from '../QuizResult';

interface SpellingQuizProps {
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

export function SpellingQuiz({ difficulty, onRetry, onSwitchKana }: SpellingQuizProps) {
  const [questions, setQuestions] = useState<SpellingQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<SpellingQuestion[]>([]);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // 出题：统一取池（排除 っ/ッ、ぢ/づ）
  const initializeQuiz = useCallback(() => {
    const pool = getQuizKana(difficulty);
    const newQuestions: SpellingQuestion[] = shuffle(pool)
      .slice(0, TOTAL_QUESTIONS)
      .map((kana, index) => ({
        id: index,
        type: 'spelling' as const,
        kana: kana.kana,
        romaji: kana.romaji,
        aliases: kana.aliases,
      }));

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    setCurrentAnswer('');
    setShowHint(false);
    setIsAnswered(false);
    setIsCorrect(null);
    setWrongAnswers([]);
  }, [difficulty]);

  useEffect(() => {
    initializeQuiz();
  }, [initializeQuiz]);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (isAnswered) nextButtonRef.current?.focus();
  }, [isAnswered]);

  const handleNext = () => {
    if (!isAnswered) return;
    if (currentIndex >= questions.length - 1) {
      setIsComplete(true);
      return;
    }
    setCurrentIndex(index => index + 1);
    setCurrentAnswer('');
    setShowHint(false);
    setIsAnswered(false);
    setIsCorrect(null);
  };

  const handleSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();

    // 已作答：Enter 直接进入下一题
    if (isAnswered) {
      handleNext();
      return;
    }

    if (!currentQuestion || !currentAnswer.trim()) return;

    // 放宽判定：忽略大小写/空白，接受 aliases 与长音变体
    const correct = isRomajiMatch(
      currentAnswer,
      currentQuestion.romaji,
      currentQuestion.aliases
    );

    if (correct) {
      playCorrectSound();
      setScore(prev => prev + 10);
    } else {
      playWrongSound();
      setWrongAnswers(prev => [...prev, { ...currentQuestion, userAnswer: currentAnswer, isCorrect: false }]);
    }

    setQuestions(prev => {
      const next = [...prev];
      next[currentIndex] = {
        ...currentQuestion,
        userAnswer: currentAnswer,
        isCorrect: correct,
      };
      return next;
    });

    trackQuizAnswer(difficulty, 'spelling', correct);
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  if (isComplete) {
    return (
      <QuizResult
        score={score}
        wrongAnswers={wrongAnswers}
        onRetry={onRetry}
        onSwitchKana={onSwitchKana}
        kanaType={difficulty}
        quizType="spelling"
      />
    );
  }

  if (!currentQuestion) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Spelling Quiz</h2>
        <p className="text-lg font-medium">
          <span className="text-primary">Question {currentIndex + 1}/{TOTAL_QUESTIONS}</span> |
          <span className="ml-2">Score: <span className="text-primary">{score}</span></span>
        </p>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div lang="ja" className="text-6xl font-bold mb-4 font-japanese">
            {currentQuestion.kana}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type the romaji..."
                className={`text-center text-xl py-6 ${
                  isCorrect === null ? '' :
                  isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                }`}
                disabled={isAnswered}
                aria-label="Type the romaji for this kana"
              />
              {isCorrect !== null && (
                <div className={`absolute right-0 top-0 h-full flex items-center pr-4 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? '✓' : '✗'}
                </div>
              )}
            </div>
            <div className="flex justify-center gap-4">
              <Button
                type="submit"
                disabled={!currentAnswer.trim() || isAnswered}
                className="px-8 py-2"
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowHint(!showHint)}
                className="px-4"
                disabled={isAnswered}
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
            </div>
          </form>

          {showHint && !isAnswered && (
            <div className="mt-4 text-sm text-gray-500 animate-fade-in">
              Hint: First letter is &quot;{currentQuestion.romaji[0]}&quot;
            </div>
          )}
        </div>

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
                Correct spelling:{' '}
                <span className="font-mono text-lg font-bold">{currentQuestion.romaji}</span>
                {' '}
                <span lang="ja" className="font-japanese text-lg">({currentQuestion.kana})</span>
              </p>
              {!isCorrect && (
                <p className="text-sm text-red-700 dark:text-red-300">
                  Your answer: <span className="font-mono">{currentAnswer}</span>
                </p>
              )}
              <Button
                ref={nextButtonRef}
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
      </div>
    </div>
  );
}
