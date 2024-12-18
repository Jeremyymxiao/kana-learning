"use client";

import { useState, useEffect } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { ChoiceQuestion } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';

interface QuizQuestionProps {
  question: ChoiceQuestion;
  onSubmit: (answer: string) => boolean;
}

export function QuizQuestion({ question, onSubmit }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
  }, [question.id]);

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
      >
        {option}
      </Button>
    );
  })}
</div>
    </div>
  );
}