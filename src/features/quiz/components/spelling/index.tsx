"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KanaType, SpellingQuestion } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { gojuonData } from '@/data/gojuon';

interface SpellingQuizProps {
  difficulty: KanaType;
  onComplete: () => void;
}

export function SpellingQuiz({ difficulty, onComplete }: SpellingQuizProps) {
  const [questions, setQuestions] = useState<SpellingQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    initializeQuiz();
  }, [difficulty]);

  const initializeQuiz = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    setCurrentAnswer('');
    setShowHint(false);
    setIsCorrect(null);
  };

  const generateQuestions = (): SpellingQuestion[] => {
    const availableKana = getAvailableKana();
    const shuffled = shuffleArray(availableKana);
    return shuffled.slice(0, 10).map((kana, index) => ({
      id: index,
      type: 'spelling' as const,
      kana,
      romaji: getRomaji(kana),
      userAnswer: undefined,
    }));
  };

  const getAvailableKana = () => {
    const pairs: string[] = [];
    
    const addSeion = () => {
      gojuonData.seion.vowels.forEach(k => pairs.push(difficulty === 'katakana' ? k.katakana : k.hiragana));
      gojuonData.seion.consonants.forEach(row => 
        row.forEach(k => pairs.push(difficulty === 'katakana' ? k.katakana : k.hiragana))
      );
    };

    const addSpecial = () => {
      gojuonData.dakuon.consonants.forEach(row =>
        row.forEach(k => pairs.push(difficulty === 'katakana' ? k.katakana : k.hiragana))
      );
      gojuonData.youon.combinations.forEach(row =>
        row.forEach(k => pairs.push(difficulty === 'katakana' ? k.katakana : k.hiragana))
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

  const getRomaji = (kana: string): string => {
    const findInData = (data: typeof gojuonData.seion.vowels[0][]) => 
      data.find(k => k.hiragana === kana || k.katakana === kana)?.romaji || '';

    // Search in seion
    const seionVowel = findInData(gojuonData.seion.vowels);
    if (seionVowel) return seionVowel;

    const seionConsonant = gojuonData.seion.consonants.flatMap(row => row).find(k => 
      k.hiragana === kana || k.katakana === kana
    )?.romaji;
    if (seionConsonant) return seionConsonant;

    // Search in dakuon
    const dakuon = gojuonData.dakuon.consonants.flatMap(row => row).find(k => 
      k.hiragana === kana || k.katakana === kana
    )?.romaji;
    if (dakuon) return dakuon;

    // Search in youon
    const youon = gojuonData.youon.combinations.flatMap(row => row).find(k => 
      k.hiragana === kana || k.katakana === kana
    )?.romaji;
    if (youon) return youon;

    return '';
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentAnswer.trim()) return;

    const currentQuestion = questions[currentIndex];
    const isAnswerCorrect = currentAnswer.toLowerCase() === currentQuestion.romaji.toLowerCase();

    // Play sound feedback
    if (isAnswerCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    // Update question with user's answer
    const newQuestions = [...questions];
    newQuestions[currentIndex] = {
      ...currentQuestion,
      userAnswer: currentAnswer
    };

    setQuestions(newQuestions);
    setIsCorrect(isAnswerCorrect);

    // Update score and show result
    if (isAnswerCorrect) {
      setScore(score + 10);
    }

    // Wait a moment to show the result before moving to next question
    setTimeout(() => {
      if (currentIndex === questions.length - 1) {
        setIsComplete(true);
      } else {
        setCurrentIndex(currentIndex + 1);
        setCurrentAnswer('');
        setIsCorrect(null);
        setShowHint(false);
      }
    }, 1500);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event as unknown as React.FormEvent);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Spelling Quiz</h2>
        <p className="text-lg font-medium">
          <span className="text-primary">Question {currentIndex + 1}/10</span> | 
          <span className="ml-2">Score: <span className="text-primary">{score}</span></span>
        </p>
      </div>

      {isComplete ? (
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold mb-6 animate-fade-in">Quiz Complete!</h3>
          <p className="text-xl mb-8">
            Final Score: <span className="font-bold text-2xl text-primary">{score}</span>
          </p>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-4">Review:</h4>
            {questions.map((q, index) => (
              <div 
                key={q.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  q.userAnswer?.toLowerCase() === q.romaji.toLowerCase()
                    ? 'bg-green-100 dark:bg-green-900/20 border-green-500' 
                    : 'bg-red-100 dark:bg-red-900/20 border-red-500'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">{q.kana}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      Correct: <span className="text-green-600 dark:text-green-400">{q.romaji}</span>
                    </div>
                    {q.userAnswer && q.userAnswer.toLowerCase() !== q.romaji.toLowerCase() && (
                      <div className="text-sm font-medium">
                        Your answer: <span className="text-red-600 dark:text-red-400">{q.userAnswer}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button 
            onClick={onComplete}
            className="mt-8 px-8 py-2 text-lg font-medium hover:scale-105 transition-transform"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold mb-4">{questions[currentIndex]?.kana}</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type the romaji..."
                  className={`text-center text-xl py-6 ${
                    isCorrect === null ? '' :
                    isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                  }`}
                  disabled={isCorrect !== null}
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
                  disabled={!currentAnswer.trim() || isCorrect !== null}
                  className="px-8 py-2"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowHint(!showHint)}
                  className="px-4"
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </Button>
              </div>
            </form>
            {showHint && (
              <div className="mt-4 text-sm text-gray-500 animate-fade-in">
                Hint: First letter is "{questions[currentIndex]?.romaji[0]}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}