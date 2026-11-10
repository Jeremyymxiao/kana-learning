"use client";

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { KanaType, Question } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { getQuizKana } from '@/data/gojuon';
import { useKanaRows } from '../../hooks/useKanaRows';
import { recordKanaResult } from '@/lib/progress';
import { trackQuizAnswer } from '@/lib/tracking';
import { QuizResult } from '../QuizResult';

interface MatchingGameProps {
  difficulty: KanaType;
  onRetry: () => void;
  onSwitchKana: () => void;
}

interface Card {
  id: number;
  content: string;
  /** 进度统计用的稳定 key（平假名） */
  hiragana: string;
  type: 'kana' | 'romaji';
  isMatched: boolean;
  isWrong: boolean;
  matchId: number;
  matchContent: string;
}

const TOTAL_PAIRS = 10;
const POINTS_PER_PAIR = 10;

// Fisher-Yates 洗牌
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function MatchingGame({ difficulty, onRetry, onSwitchKana }: MatchingGameProps) {
  const rows = useKanaRows();
  const t = useTranslations('QuizPage');
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // 初始化游戏：出题走统一取池（排除 っ/ッ、ぢ/づ）
  const initializeGame = useCallback(() => {
    const availablePairs = getQuizKana(difficulty, rows);
    const pickedPairs = shuffle(availablePairs).slice(0, TOTAL_PAIRS);

    const newCards: Card[] = [];
    pickedPairs.forEach((pair, index) => {
      // 假名卡片
      newCards.push({
        id: index * 2,
        content: pair.kana,
        hiragana: pair.hiragana,
        type: 'kana',
        isMatched: false,
        isWrong: false,
        matchId: index,
        matchContent: pair.romaji,
      });
      // 罗马字卡片
      newCards.push({
        id: index * 2 + 1,
        content: pair.romaji,
        hiragana: pair.hiragana,
        type: 'romaji',
        isMatched: false,
        isWrong: false,
        matchId: index,
        matchContent: pair.kana,
      });
    });

    setCards(shuffle(newCards));
    setSelectedCards([]);
    setScore(0);
    setMatchedPairs(0);
    setWrongAnswers([]);
    setIsComplete(false);
  }, [difficulty, rows]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // 处理卡片点击
  const handleCardClick = (index: number) => {
    if (!cards[index] || cards[index].isMatched || selectedCards.length === 2) return;

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [firstIndex, secondIndex] = newSelectedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (
        firstCard.matchId === secondCard.matchId &&
        firstCard.type !== secondCard.type
      ) {
        // Matched
        playCorrectSound();
        const newCards = [...cards];
        newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
        newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
        setCards(newCards);
        setMatchedPairs(prev => prev + 1);
        setScore(prev => prev + POINTS_PER_PAIR);
        trackQuizAnswer(difficulty, 'matching', true);
        recordKanaResult(firstCard.hiragana, true);

        if (matchedPairs + 1 === TOTAL_PAIRS) {
          setIsComplete(true);
        }
      } else {
        // Not matched
        playWrongSound();
        trackQuizAnswer(difficulty, 'matching', false);
        const kanaCard = firstCard.type === 'kana' ? firstCard : secondCard;
        const romajiCard = firstCard.type === 'romaji' ? firstCard : secondCard;

        // 同一对只记一次，避免重复错误淹没结果页
        setWrongAnswers(prev => {
          if (prev.some(item => item.id === kanaCard.matchId)) return prev;
          return [...prev, {
            id: kanaCard.matchId,
            kana: kanaCard.content,
            hiragana: kanaCard.hiragana,
            romaji: romajiCard.content,
            userAnswer: romajiCard.type === 'romaji' ? romajiCard.content : kanaCard.content,
            type: 'matching',
            isFlipped: false,
            isMatched: false,
          }];
        });

        const newCards = [...cards];
        newCards[firstIndex] = { ...newCards[firstIndex], isWrong: true };
        newCards[secondIndex] = { ...newCards[secondIndex], isWrong: true };
        setCards(newCards);

        setTimeout(() => {
          setCards(prev => {
            const resetCards = [...prev];
            resetCards[firstIndex] = { ...resetCards[firstIndex], isWrong: false };
            resetCards[secondIndex] = { ...resetCards[secondIndex], isWrong: false };
            return resetCards;
          });
        }, 1000);
      }

      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  };

  if (isComplete) {
    return (
      <QuizResult
        score={score}
        wrongAnswers={wrongAnswers}
        onRetry={onRetry}
        onSwitchKana={onSwitchKana}
        kanaType={difficulty}
        quizType="matching"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t('matching')}</h2>
        <p className="text-sm text-gray-500 mb-4">{t('matchingDesc')}</p>
        <div className="flex justify-between items-center max-w-2xl mx-auto mb-4">
          <span className="text-lg">
            {t('progressLabel')}: {matchedPairs}/{TOTAL_PAIRS}
          </span>
          <span className="text-lg">
            {t('scoreLabel')}: {score}/{TOTAL_PAIRS * POINTS_PER_PAIR}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto p-4">
        {cards.map((card, index) => (
          <Button
            key={card.id}
            onClick={() => handleCardClick(index)}
            disabled={card.isMatched || selectedCards.length === 2}
            variant={selectedCards.includes(index) ? "default" : "outline"}
            lang={card.type === 'kana' ? 'ja' : undefined}
            className={`
              h-32 text-3xl font-medium p-4
              transition-all duration-300
              ${card.isMatched ? 'bg-green-100 dark:bg-green-900/20 border-green-500 text-green-700' : ''}
              ${card.isWrong ? 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-700' : ''}
              ${!card.isMatched ? 'hover:bg-primary/10' : ''}
              ${selectedCards.includes(index) ? 'ring-2 ring-blue-500' : ''}
              shadow-sm hover:shadow-md
            `}
          >
            <span>{card.content}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
