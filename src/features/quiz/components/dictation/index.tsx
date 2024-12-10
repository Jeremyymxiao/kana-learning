"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { KanaType } from '../../types';
import { gojuonData } from '@/data/gojuon';

interface DictationQuizProps {
  difficulty: KanaType;
  onComplete: () => void;
}

interface Question {
  id: number;
  kana: string;
  romaji: string;
  userAnswer?: string;
}

export function DictationQuiz({ difficulty, onComplete }: DictationQuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
  }, [difficulty]);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

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

  const playSound = async () => {
    if (isPlaying || isComplete) return;
    
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(questions[currentIndex].kana);
    utterance.lang = 'ja-JP';
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (answer: string) => {
    const newQuestions = [...questions];
    const currentQuestion = newQuestions[currentIndex];
    currentQuestion.userAnswer = answer;

    if (answer === currentQuestion.romaji) {
      setScore(score + 10);
    }

    setQuestions(newQuestions);

    if (currentIndex === questions.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Dictation Quiz</h2>
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
          <Button
            onClick={playSound}
            disabled={isPlaying}
            className="w-full h-24 text-2xl"
          >
            {isPlaying ? 'Playing...' : 'Play Sound'}
          </Button>

          <div className="grid grid-cols-2 gap-4">
            {['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 
              'sa', 'shi', 'su', 'se', 'so', 'ta', 'chi', 'tsu', 'te', 'to'].map(romaji => (
              <Button
                key={romaji}
                onClick={() => handleSubmit(romaji)}
                variant="outline"
                className="h-12"
              >
                {romaji}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 