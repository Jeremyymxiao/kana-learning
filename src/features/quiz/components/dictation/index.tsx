"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KanaType, DictationQuestion } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { gojuonData } from '@/data/gojuon';
import { QuizResult } from '../QuizResult';
import { Progress } from '@/components/ui/progress';

interface DictationQuizProps {
  difficulty: KanaType;
  onComplete: () => void;
  onScoreChange?: (score: number) => void;
  onProgressChange?: (current: number, total: number) => void;
}

type FeedbackStatus = {
  show: boolean;
  isCorrect: boolean;
};

export function DictationQuiz({ difficulty, onComplete, onScoreChange, onProgressChange }: DictationQuizProps) {
  const [questions, setQuestions] = useState<DictationQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<FeedbackStatus>({ show: false, isCorrect: false });

  const playSound = async () => {
    if (isPlaying || isComplete) return;
    
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(questions[currentIndex].kana);
    utterance.lang = 'ja-JP';
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = () => {
    if (!userInput) return;
  
    const currentQuestion = questions[currentIndex];
    const isCorrect = userInput.toLowerCase() === currentQuestion.romaji.toLowerCase();
  
    setFeedback({ show: true, isCorrect });
    
    setTimeout(() => {
      setFeedback({ show: false, isCorrect: false });
    }, 1500);

    if (isCorrect) {
      playCorrectSound();
      setScore(prevScore => {
        const newScore = prevScore + 10;
        onScoreChange?.(newScore);
        return newScore;
      });
    } else {
      playWrongSound();
    }
  
    const newQuestions = [...questions];
    newQuestions[currentIndex] = {
      ...currentQuestion,
      userAnswer: userInput
    };
  
    setQuestions(newQuestions);
    setUserInput('');
  
    if (currentIndex === questions.length - 1) {
      setIsComplete(true);
      onComplete();
    } else {
      setTimeout(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          onProgressChange?.(newIndex, questions.length);
          return newIndex;
        });
      }, 0);
    }
  };

  const initQuiz = useCallback(() => {
    const availableKana = getAvailableKana();
    const shuffled = shuffleArray(availableKana);
    const selectedKana = shuffled.slice(0, 10);
    
    setQuestions(selectedKana.map((k, index) => ({
      id: index,
      type: 'dictation',
      kana: k.kana,
      romaji: k.romaji,
    })));
    setCurrentIndex(0);
    setScore(0);
    onScoreChange?.(0);
    setIsComplete(false);
  }, [difficulty, onScoreChange]);

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
    
    const addDakuon = () => {
      gojuonData.dakuon.consonants.forEach(row => 
        row.forEach(k => pairs.push({ 
          kana: difficulty === 'katakana' ? k.katakana : k.hiragana, 
          romaji: k.romaji 
        }))
      );
    };
    
    const addYouon = () => {
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
        addDakuon();
        addYouon();
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

  if (isComplete) {
    return (
      <QuizResult
        score={score}
        wrongAnswers={questions.filter(q => q.userAnswer?.toLowerCase() !== q.romaji.toLowerCase())}
        onRetry={initQuiz}
        kanaType={difficulty}
        quizType="dictation"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-8">
        <Progress value={(currentIndex / questions.length) * 100} />
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold mb-2">{questions[currentIndex]?.kana || ''}</div>
        <div className="text-sm text-gray-500">Type the romaji for this kana</div>
        <div className="text-sm text-gray-500">Current Score: {score}</div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={playSound}
          disabled={isPlaying}
          variant="outline"
          className="w-full"
        >
          {isPlaying ? 'Playing...' : 'Play Sound'}
        </Button>

        <div className="relative w-full">
          <Input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type romaji here..."
            className="text-center"
          />
          
          {feedback.show && (
            <div
              className={`
                absolute top-[-40px] left-0 right-0 text-center p-2 rounded-md
                transition-opacity duration-300
                ${feedback.isCorrect 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}
              `}
            >
              {feedback.isCorrect ? 'Correct!' : 'Incorrect!'}
            </div>
          )}
        </div>

        <Button onClick={handleSubmit} disabled={!userInput}>
          Submit
        </Button>

        <div className="text-sm text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}