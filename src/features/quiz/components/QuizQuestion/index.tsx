"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChoiceQuestion } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';

interface QuizQuestionProps {
  question: ChoiceQuestion;
  onSubmit: (answer: string) => boolean;
}

export function QuizQuestion({ question, onSubmit }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = onSubmit(answer);
    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
    
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 1000);
  };

  const displayText = question.type === 'kanaToRomaji' ? question.kana : question.romaji;
  const correctAnswer = question.type === 'kanaToRomaji' ? question.romaji : question.kana;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl font-bold mb-2">{displayText}</div>
        <div className="text-sm text-gray-500">
          {question.type === 'kanaToRomaji' ? 'Choose the right romaji' : 'Choose the right kana'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={isAnswered}
            variant={isAnswered ? (
              option === correctAnswer ? 'default' :
              option === selectedAnswer ? 'destructive' : 'outline'
            ) : 'outline'}
            className={`h-16 text-lg ${
              isAnswered && option === selectedAnswer
                ? option === correctAnswer
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
                : ''
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}