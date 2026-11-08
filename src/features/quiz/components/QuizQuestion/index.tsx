"use client";

import { useState, useEffect, useRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { ChoiceQuestion } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';

interface QuizQuestionProps {
  question: ChoiceQuestion;
  onSubmit: (answer: string) => boolean;
  onNext: () => void;
}

export function QuizQuestion({ question, onSubmit, onNext }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
  }, [question.id]);

  // 答完后把焦点交给 Next，键盘用户可以直接回车继续
  useEffect(() => {
    if (isAnswered) nextButtonRef.current?.focus();
  }, [isAnswered]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    const correct = onSubmit(answer);

    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  // 键盘：1–4 选择选项，Enter 进入下一题
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      // 输入框/按钮里的按键留给原生行为，避免重复触发
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (!isAnswered) {
        const numeric = Number(event.key);
        if (numeric >= 1 && numeric <= question.options.length) {
          event.preventDefault();
          handleAnswer(question.options[numeric - 1]);
        }
        return;
      }

      if (event.key === 'Enter') {
        // 焦点在按钮上时由原生 Enter 触发 click
        if (target?.tagName === 'BUTTON') return;
        event.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const displayText = question.type === 'kanaToRomaji' ? question.kana : question.romaji;
  const correctAnswer = question.type === 'kanaToRomaji' ? question.romaji : question.kana;
  const kanaOnScreen = question.type === 'kanaToRomaji';
  const prompt = question.type === 'kanaToRomaji'
    ? 'Choose the right romaji'
    : 'Choose the right kana';

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div
          lang={kanaOnScreen ? 'ja' : undefined}
          className={`text-4xl font-bold mb-2 ${kanaOnScreen ? 'font-japanese' : ''}`}
        >
          {displayText}
        </div>
        <div className="text-sm text-gray-500">{prompt}</div>
        <div className="text-xs text-gray-400 mt-1">Tip: press 1–4 to answer, Enter for next</div>
      </div>

      <div className="grid grid-cols-2 gap-4" role="group" aria-label="Answer options">
        {question.options.map((option, index) => {
          const isSelected = option === selectedAnswer;
          const isCorrectAnswer = option === correctAnswer;

          let variant: ButtonProps['variant'] = 'outline';
          if (isAnswered) {
            if (isSelected && isCorrect) {
              variant = 'correct';
            } else if (isSelected && !isCorrect) {
              variant = 'incorrect';
            } else if (isCorrectAnswer && !isCorrect) {
              variant = 'correct';
            }
          }

          return (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              variant={variant}
              size="quiz"
              lang={kanaOnScreen ? undefined : 'ja'}
              aria-label={`Option ${index + 1}: ${option}`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="font-mono text-xs opacity-60">{index + 1}</span>
                <span>{option}</span>
              </span>
            </Button>
          );
        })}
      </div>

      {/* 反馈闸门：答完停住，等用户点 Next / 按 Enter */}
      <div aria-live="polite" role="status" className="min-h-[88px]">
        {isAnswered && (
          <div
            className={`rounded-lg border p-4 text-center space-y-1 ${
              isCorrect
                ? 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                : 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
            }`}
          >
            <p className="font-semibold">
              {isCorrect ? '✅ Correct!' : '❌ Not quite'}
            </p>
            <p className="text-sm">
              Correct answer:{' '}
              <span lang="ja" className="font-japanese text-lg font-bold">
                {question.kana}
              </span>
              {' = '}
              <span className="font-mono font-bold">{question.romaji}</span>
            </p>
            {!isCorrect && selectedAnswer && (
              <p className="text-sm text-red-700 dark:text-red-300">
                Your answer:{' '}
                <span lang={kanaOnScreen ? undefined : 'ja'}>
                  {selectedAnswer}
                </span>
              </p>
            )}
            <Button
              ref={nextButtonRef}
              onClick={onNext}
              className="mt-2"
              aria-label="Next question"
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
