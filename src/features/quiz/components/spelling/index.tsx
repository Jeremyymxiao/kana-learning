"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KanaType, SpellingQuestion } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { gojuonData } from '@/data/gojuon';
import { QuizResult } from '../QuizResult';

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
      {isComplete ? (
        <QuizResult
          score={score}
          wrongAnswers={questions.filter(q => q.userAnswer?.toLowerCase() !== q.romaji.toLowerCase())}
          onRetry={onComplete}
          kanaType={difficulty}
          quizType="spelling"
        />
      ) : (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Spelling Quiz</h2>
            <p className="text-lg font-medium">
              <span className="text-primary">Question {currentIndex + 1}/10</span> | 
              <span className="ml-2">Score: <span className="text-primary">{score}</span></span>
            </p>
          </div>

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
                  Hint: First letter is &quot;{questions[currentIndex]?.romaji[0]}&quot;
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}