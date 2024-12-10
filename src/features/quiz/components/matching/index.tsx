"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { KanaType } from '../../types';
import { gojuonData } from '@/data/gojuon';

interface MatchingGameProps {
  difficulty: KanaType;
  onComplete: () => void;
}

export function MatchingGame({ difficulty, onComplete }: MatchingGameProps) {
  const [cards, setCards] = useState<Array<{ id: number; content: string; isFlipped: boolean; isMatched: boolean }>>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    const pairs = generatePairs();
    const shuffledCards = shuffleArray([...pairs, ...pairs]).map((content, index) => ({
      id: index,
      content,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffledCards);
    setSelectedCards([]);
    setScore(0);
    setIsComplete(false);
  };

  const generatePairs = () => {
    const availableKana = getAvailableKana();
    const shuffled = shuffleArray(availableKana);
    return shuffled.slice(0, 6); // 6 pairs = 12 cards
  };

  const getAvailableKana = () => {
    const pairs: Array<{ kana: string; romaji: string }> = [];
    
    const addSeion = () => {
      gojuonData.seion.vowels.forEach(k => pairs.push({ kana: difficulty === 'katakana' ? k.katakana : k.hiragana, romaji: k.romaji }));
      gojuonData.seion.consonants.forEach(row => 
        row.forEach(k => pairs.push({ kana: difficulty === 'katakana' ? k.katakana : k.hiragana, romaji: k.romaji }))
      );
    };

    const addSpecial = () => {
      gojuonData.dakuon.consonants.forEach(row =>
        row.forEach(k => pairs.push({ kana: difficulty === 'katakana' ? k.katakana : k.hiragana, romaji: k.romaji }))
      );
      gojuonData.youon.combinations.forEach(row =>
        row.forEach(k => pairs.push({ kana: difficulty === 'katakana' ? k.katakana : k.hiragana, romaji: k.romaji }))
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

    return pairs.map(p => p.kana);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleCardClick = (id: number) => {
    if (selectedCards.length === 2 || cards[id].isMatched || cards[id].isFlipped) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    if (selectedCards.length === 0) {
      setSelectedCards([id]);
    } else {
      setSelectedCards([...selectedCards, id]);
      checkMatch(selectedCards[0], id);
    }
  };

  const checkMatch = (firstId: number, secondId: number) => {
    setTimeout(() => {
      const newCards = [...cards];
      if (cards[firstId].content === cards[secondId].content) {
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setScore(score + 10);

        if (newCards.every(card => card.isMatched)) {
          setIsComplete(true);
        }
      } else {
        newCards[firstId].isFlipped = false;
        newCards[secondId].isFlipped = false;
      }
      setCards(newCards);
      setSelectedCards([]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Matching Game</h2>
        <p className="text-lg">Score: {score}</p>
      </div>

      {isComplete ? (
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold">Congratulations!</h3>
          <p className="text-xl">Final Score: {score}</p>
          <Button onClick={onComplete}>Try Again</Button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <Button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              variant={card.isFlipped ? 'default' : 'outline'}
              className={`h-24 text-lg transition-all ${
                card.isMatched ? 'bg-green-500 hover:bg-green-600' : ''
              }`}
              disabled={card.isMatched}
            >
              {card.isFlipped || card.isMatched ? card.content : '?'}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
} 