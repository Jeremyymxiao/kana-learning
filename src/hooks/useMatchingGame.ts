import { useState, useCallback } from 'react';
import { gojuonData } from '@/data/gojuon';
import { KanaType } from '@/types/test';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';

interface KanaChar {
  hiragana: string;
  katakana: string;
  romaji: string;
}

interface MatchingCard {
  id: number;
  content: string;
  type: 'kana' | 'romaji';
  matched: boolean;
  selected: boolean;
}

interface MatchingGameState {
  cards: MatchingCard[];
  score: number;
  selectedCard: MatchingCard | null;
  isComplete: boolean;
  wrongPairs: Array<{
    kana: string;
    romaji: string;
  }>;
}

// 根据假名类型获取可用的假名字符
const getAvailableKana = (kanaType: KanaType): KanaChar[] => {
  const kanaChars: KanaChar[] = [];

  const addSeion = () => {
    kanaChars.push(...gojuonData.seion.vowels);
    gojuonData.seion.consonants.forEach(row => kanaChars.push(...row));
  };

  const addSpecial = () => {
    gojuonData.dakuon.consonants.forEach(row => kanaChars.push(...row));
    gojuonData.youon.combinations.forEach(row => kanaChars.push(...row));
  };

  switch (kanaType) {
    case 'hiragana':
      addSeion();
      return kanaChars;
    case 'katakana':
      addSeion();
      return kanaChars;
    case 'mixed':
      addSeion();
      return kanaChars;
    case 'special':
      addSpecial();
      return kanaChars;
    default:
      return kanaChars;
  }
};

export const useMatchingGame = (kanaType: KanaType) => {
  const [state, setState] = useState<MatchingGameState>({
    cards: [],
    score: 0,
    selectedCard: null,
    isComplete: false,
    wrongPairs: []
  });

  // 初始化游戏
  const initGame = useCallback(() => {
    const availableKana = getAvailableKana(kanaType);
    const selectedKana = availableKana.slice(0, 10); // 只取10个字符
    
    const cards: MatchingCard[] = [];
    selectedKana.forEach((kana, index) => {
      // 添加假名卡片
      cards.push({
        id: index * 2,
        content: kana.hiragana,
        type: 'kana',
        matched: false,
        selected: false
      });
      // 添加罗马音卡片
      cards.push({
        id: index * 2 + 1,
        content: kana.romaji,
        type: 'romaji',
        matched: false,
        selected: false
      });
    });

    setState({
      cards: shuffle(cards),
      score: 0,
      selectedCard: null,
      isComplete: false,
      wrongPairs: []
    });
  }, [kanaType]);

  // 处理卡片选择
  const handleCardSelect = useCallback((card: MatchingCard) => {
    setState(prevState => {
      if (card.matched || card.selected) return prevState;

      const updatedCards = prevState.cards.map(c => 
        c.id === card.id ? { ...c, selected: true } : c
      );

      if (!prevState.selectedCard) {
        return {
          ...prevState,
          cards: updatedCards,
          selectedCard: card
        };
      }

      if (prevState.selectedCard.type === card.type) {
        return {
          ...prevState,
          cards: prevState.cards.map(c => ({ ...c, selected: false })),
          selectedCard: null
        };
      }

      const isMatch = checkMatch(prevState.selectedCard, card);
      
      if (isMatch) {
        playCorrectSound();
        const newScore = Math.min(100, prevState.score + 10);
        const matchedCards = updatedCards.map(c => 
          (c.id === card.id || c.id === prevState.selectedCard!.id)
            ? { ...c, matched: true, selected: false }
            : c
        );

        const matchedCount = matchedCards.filter(c => c.matched).length / 2;

        return {
          ...prevState,
          cards: matchedCards,
          score: newScore,
          selectedCard: null,
          isComplete: matchedCount === 10
        };
      } else {
        playWrongSound();
        const wrongPair = {
          kana: prevState.selectedCard.type === 'kana' 
            ? prevState.selectedCard.content 
            : card.content,
          romaji: prevState.selectedCard.type === 'romaji' 
            ? prevState.selectedCard.content 
            : card.content
        };

        setTimeout(() => {
          setState(prev => ({
            ...prev,
            cards: prev.cards.map(c => ({ ...c, selected: false })),
            selectedCard: null
          }));
        }, 1000);

        return {
          ...prevState,
          cards: updatedCards,
          wrongPairs: [...prevState.wrongPairs, wrongPair],
          score: Math.max(0, prevState.score - 10)
        };
      }
    });
  }, []);

  // 检查两张卡片是否匹配
  const checkMatch = (card1: MatchingCard, card2: MatchingCard) => {
    const kanaCard = card1.type === 'kana' ? card1 : card2;
    const romajiCard = card1.type === 'romaji' ? card1 : card2;
    
    // Find the matching kana in gojuonData
    const availableKana = getAvailableKana(kanaType);
    return availableKana.some(kana => 
      (kana.hiragana === kanaCard.content || kana.katakana === kanaCard.content) && 
      kana.romaji === romajiCard.content
    );
  };

  // Fisher-Yates 洗牌算法
  const shuffle = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return {
    ...state,
    initGame,
    handleCardSelect
  };
};