"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { KanaType, Question } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { gojuonData } from '@/data/gojuon';
import { QuizResult } from '../QuizResult';

interface MatchingGameProps {
  difficulty: KanaType;
  onComplete: () => void;
}

interface Card {
  id: number;
  content: string;
  type: 'kana' | 'romaji';
  isMatched: boolean;
  isWrong: boolean;
  matchId: number;
  matchContent: string;
}

interface KanaPair {
  kana: string;
  romaji: string;
}

// 获取可用的假名对
const getAvailableKana = (difficulty: KanaType): KanaPair[] => {
  const pairs: KanaPair[] = [];
  
  const addSeion = () => {
    gojuonData.seion.vowels.forEach(k => {
      pairs.push({
        kana: difficulty === 'katakana' ? k.katakana : k.hiragana,
        romaji: k.romaji
      });
    });
    gojuonData.seion.consonants.forEach(row => {
      row.forEach(k => {
        pairs.push({
          kana: difficulty === 'katakana' ? k.katakana : k.hiragana,
          romaji: k.romaji
        });
      });
    });
  };

  const addSpecial = () => {
    gojuonData.dakuon.consonants.forEach(row => {
      row.forEach(k => {
        pairs.push({
          kana: difficulty === 'katakana' ? k.katakana : k.hiragana,
          romaji: k.romaji
        });
      });
    });
    gojuonData.youon.combinations.forEach(row => {
      row.forEach(k => {
        pairs.push({
          kana: difficulty === 'katakana' ? k.katakana : k.hiragana,
          romaji: k.romaji
        });
      });
    });
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

export function MatchingGame({ difficulty, onComplete }: MatchingGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // 初始化游戏
  useEffect(() => {
    const initializeGame = () => {
      const availablePairs = getAvailableKana(difficulty);
      const shuffledPairs = [...availablePairs].sort(() => Math.random() - 0.5).slice(0, 10);
      
      const cards: Card[] = [];
      shuffledPairs.forEach((pair, index) => {
        // 添加假名卡片
        cards.push({
          id: index * 2,
          content: pair.kana,
          type: 'kana',
          isMatched: false,
          isWrong: false,
          matchId: index,
          matchContent: pair.romaji
        });
        // 添加罗马字卡片
        cards.push({
          id: index * 2 + 1,
          content: pair.romaji,
          type: 'romaji',
          isMatched: false,
          isWrong: false,
          matchId: index,
          matchContent: pair.kana
        });
      });

      // 随机排序卡片
      setCards(cards.sort(() => Math.random() - 0.5));
      setSelectedCards([]);
      setScore(100);
      setMatchedPairs(0);
    };

    initializeGame();
  }, [difficulty]);

  // 处理卡片点击
  const handleCardClick = (index: number) => {
    if (cards[index].isMatched || selectedCards.length === 2) return;

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
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setMatchedPairs(prev => prev + 1);
        setScore(prev => prev + 10);

        if (matchedPairs + 1 === 10) {
          setIsComplete(true);
        }
      } else {
        // Not matched
        playWrongSound();
        const kanaCard = firstCard.type === 'kana' ? firstCard : secondCard;
        const romajiCard = firstCard.type === 'romaji' ? firstCard : secondCard;
        
        setWrongAnswers(prev => [...prev, {
          id: kanaCard.matchId,
          kana: kanaCard.content,
          romaji: kanaCard.matchContent,
          userAnswer: romajiCard.content,
          type: 'matching',
          isFlipped: false,
          isMatched: false
        }]);

        const newCards = [...cards];
        newCards[firstIndex].isWrong = true;
        newCards[secondIndex].isWrong = true;
        setCards(newCards);

        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex].isWrong = false;
          resetCards[secondIndex].isWrong = false;
          setCards(resetCards);
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
        onRetry={onComplete}
        kanaType={difficulty}
        quizType="matching"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Matching Game</h2>
        <div className="flex justify-between items-center max-w-2xl mx-auto mb-4">
          <span className="text-lg">
            Progress: {matchedPairs}/10
          </span>
          <span className="text-lg">
            Score: {score}
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