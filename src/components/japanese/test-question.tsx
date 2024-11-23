"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Question } from '@/hooks/useTest';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';

interface TestQuestionProps {
  question: Question;
  onSubmit: (answer: string) => void;
}

export default function TestQuestion({ question, onSubmit }: TestQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === question.correctAnswer) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
    
    // 播放音效
    //const audio = new Audio(answer === question.correctAnswer ? '/correct.mp3' : '/wrong.mp3');
    //audio.play().catch(() => {});
    
    setTimeout(() => {
      onSubmit(answer);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl font-bold mb-2">{question.question}</div>
        <div className="text-sm text-gray-500">
          {question.type === 'kanaToRomaji' ? '选择正确的罗马音' : '选择正确的假名'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={isAnswered}
            variant={isAnswered ? (
              option === question.correctAnswer ? 'default' :
              option === selectedAnswer ? 'destructive' : 'outline'
            ) : 'outline'}
            className={`h-16 text-lg ${
              isAnswered && option === selectedAnswer
                ? option === question.correctAnswer
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