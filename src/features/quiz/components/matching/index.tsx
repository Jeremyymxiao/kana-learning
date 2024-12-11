"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { KanaType } from '../../types';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { gojuonData } from '@/data/gojuon';

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
  const [score, setScore] = useState(100);
  const [matchedPairs, setMatchedPairs] = useState(0);

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
          isWrong: false
        });
        // 添加罗马字卡片
        cards.push({
          id: index * 2 + 1,
          content: pair.romaji,
          type: 'romaji',
          isMatched: false,
          isWrong: false
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
    // 如果已经选择了两张卡片，或者点击的卡片已经匹配，则不处理
    if (selectedCards.length === 2 || cards[index].isMatched) {
      return;
    }

    // 添加到已选择的卡片中
    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    // 如果已经选择了两张卡片，检查是否匹配
    if (newSelectedCards.length === 2) {
      const firstCard = cards[newSelectedCards[0]];
      const secondCard = cards[newSelectedCards[1]];

      // 检查是否匹配（一张是假名，一张是罗马字，且内容对应）
      let isMatch = false;
      if (firstCard.type !== secondCard.type) {
        const kanaCard = firstCard.type === 'kana' ? firstCard : secondCard;
        const romajiCard = firstCard.type === 'romaji' ? firstCard : secondCard;
        
        // 在所有可用假名中查找匹配
        const availablePairs = getAvailableKana(difficulty);
        isMatch = availablePairs.some(pair => 
          (kanaCard.content === pair.kana && romajiCard.content === pair.romaji)
        );
      }

      if (isMatch) {
        // 找到匹配的卡片
        setTimeout(() => {
          const newCards = [...cards];
          newCards[newSelectedCards[0]].isMatched = true;
          newCards[newSelectedCards[1]].isMatched = true;
          setCards(newCards);
          setSelectedCards([]);
          setMatchedPairs(prev => {
            const newMatchedPairs = prev + 1;
            if (newMatchedPairs === 10) {
              onComplete();
            }
            return newMatchedPairs;
          });
          playCorrectSound();
        }, 500);
      } else {
        // 不匹配，显示错误状态
        const newCards = [...cards];
        newCards[newSelectedCards[0]].isWrong = true;
        newCards[newSelectedCards[1]].isWrong = true;
        setCards(newCards);
        playWrongSound();
        setScore(Math.max(0, score - 10)); // 扣分，但不低于0分

        // 一秒后重置卡片状态
        setTimeout(() => {
          const newCards = [...cards];
          newCards[newSelectedCards[0]].isWrong = false;
          newCards[newSelectedCards[1]].isWrong = false;
          setCards(newCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

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