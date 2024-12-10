"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KanaType } from '../../types';
import { gojuonData } from '@/data/gojuon';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';

interface SpellingQuizProps {
  difficulty: KanaType;
  onComplete: () => void;
}

interface Question {
  id: number;
  kana: string;
  romaji: string;
  userAnswer?: string;
}

export function SpellingQuiz({ difficulty, onComplete }: SpellingQuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const initQuiz = useCallback(() => {
    const availableKana = getAvailableKana();
    const shuffled = shuffleArray(availableKana);
    const selectedKana = shuffled.slice(0, 10);
    
    setQuestions(selectedKana.map((k, index) => ({
      id: index,
      kana: k.kana,
      romaji: k.romaji,
    })));
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    setCurrentAnswer('');
  }, [difficulty]);

  const getAvailableKana = () => {
    const pairs: Array<{ kana: string; romaji: string }> = [];
    
    const addSeion = () => {
      gojuonData.seion.vowels.forEach(k => pairs.push({ 
        kana: difficulty === 'katakana' ? k.katakana : k.hiragana, 
        romaji: k.romaji 
      }));
      gojuonData.seion.consonants.forEach(row => 
        row.forEach(k => pairs.push({ 
          kana: difficulty === 'katakana' ? k.katakana : k.hiragana, 
          romaji: k.romaji 
        }))
      );
    };

    const addSpecial = () => {
      gojuonData.dakuon.consonants.forEach(row =>
        row.forEach(k => pairs.push({ 
          kana: difficulty === 'katakana' ? k.katakana : k.hiragana, 
          romaji: k.romaji 
        }))
      );
      gojuonData.youon.combinations.forEach(row =>
        row.forEach(k => pairs.push({ 
          kana: difficulty === 'katakana' ? k.katakana : k.hiragana, 
          romaji: k.romaji 
        }))
      );
    };

    switch (difficulty) {
      case 'hiragana':
      case 'katakana':
      case 'mixed':
        addSeion();
        break;
      case 'special':
        addSpecial();
        break;
    }

    return pairs;
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleSubmit = () => {
    const newQuestions = [...questions];
    const currentQuestion = newQuestions[currentIndex];
    const answer = currentAnswer.toLowerCase().trim();
    currentQuestion.userAnswer = answer;

    if (answer === currentQuestion.romaji) {
      setScore(score + 10);
      playCorrectSound();
    } else {
      playWrongSound();
    }

    setQuestions(newQuestions);
    setCurrentAnswer('');

    if (currentIndex === questions.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 初始化测试
  useState(() => {
    initQuiz();
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Spelling Quiz</h2>
        <p className="text-lg">
          Progress: {currentIndex + 1}/10 | Score: {score}
        </p>
      </div>

      {isComplete ? (
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold">Quiz Complete!</h3>
          <p className="text-xl">Final Score: {score}</p>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Review:</h4>
            {questions.map((q, index) => (
              <div 
                key={q.id}
                className={`p-4 rounded-lg ${
                  q.userAnswer === q.romaji 
                    ? 'bg-green-100 dark:bg-green-900/20' 
                    : 'bg-red-100 dark:bg-red-900/20'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-2xl">{q.kana}</span>
                  <div className="text-right">
                    <div className="text-sm">
                      Correct: {q.romaji}
                    </div>
                    {q.userAnswer && q.userAnswer !== q.romaji && (
                      <div className="text-sm text-red-600 dark:text-red-400">
                        Your answer: {q.userAnswer}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={onComplete} className="mt-4">
            Try Again
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">{questions[currentIndex]?.kana}</div>
            <div className="flex gap-4">
              <Input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Type romaji..."
                className="text-lg"
              />
              <Button onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 