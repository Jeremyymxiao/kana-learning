import { useState, useCallback } from 'react';
import { gojuonData } from '@/data/gojuon';
import { Difficulty } from '@/types/test';
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

// 根据难度获取可用的假名字符
const getAvailableKana = (difficulty: Difficulty): KanaChar[] => {
  const kanaChars: KanaChar[] = [];

  // 收集清音
  const addSeion = () => {
    kanaChars.push(...gojuonData.seion.vowels);
    gojuonData.seion.consonants.forEach(row => kanaChars.push(...row));
  };

  // 添加片假名
  const addKatakana = (chars: KanaChar[]) => {
    return chars.map(char => ({ ...char }));
  };

  // 收集浊音和拗音
  const addDakuonAndYouon = () => {
    gojuonData.dakuon.consonants.forEach(row => kanaChars.push(...row));
    gojuonData.youon.combinations.forEach(row => kanaChars.push(...row));
  };

  switch (difficulty) {
    case 'easy':
      addSeion();
      return kanaChars;
    case 'middle':
      addSeion();
      return [...kanaChars, ...addKatakana(kanaChars)];
    case 'hard':
      addSeion();
      addDakuonAndYouon();
      return [...kanaChars, ...addKatakana(kanaChars)];
    default:
      return kanaChars;
  }
};

export const useMatchingGame = (difficulty: Difficulty) => {
  const [state, setState] = useState<MatchingGameState>({
    cards: [],
    score: 0,
    selectedCard: null,
    isComplete: false,
    wrongPairs: []
  });

  // 初始化游戏
  const initGame = useCallback(() => {
    const availableKana = getAvailableKana(difficulty);
    const selectedKana = availableKana.slice(0, 10); // 只取10个字符
    
    const cards: MatchingCard[] = [];
    selectedKana.forEach((kana, index) => {
      // 添加假名卡片
      cards.push({
        id: index * 2,
        content: difficulty === 'easy' ? kana.hiragana : Math.random() > 0.5 ? kana.hiragana : kana.katakana,
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
  }, [difficulty]);

  // 处理卡片选择
  const handleCardSelect = useCallback((card: MatchingCard) => {
    setState(prevState => {
      // 如果卡片已匹配或已选中，则不处理
      if (card.matched || card.selected) return prevState;

      const updatedCards = prevState.cards.map(c => 
        c.id === card.id ? { ...c, selected: true } : c
      );

      // 如果没有选中的卡片，则选中当前卡片
      if (!prevState.selectedCard) {
        return {
          ...prevState,
          cards: updatedCards,
          selectedCard: card
        };
      }

      // 如果选中了相同类型的卡片，则取消之前的选择
      if (prevState.selectedCard.type === card.type) {
        return {
          ...prevState,
          cards: prevState.cards.map(c => ({ ...c, selected: false })),
          selectedCard: null
        };
      }

      // 检查匹配
      const isMatch = checkMatch(prevState.selectedCard, card);
      
      if (isMatch) {
        playCorrectSound();
        const newScore = Math.min(100, prevState.score + 10);
        const matchedCards = updatedCards.map(c => 
          (c.id === card.id || c.id === prevState.selectedCard!.id)
            ? { ...c, matched: true }
            : c
        );

        return {
          ...prevState,
          cards: matchedCards,
          score: newScore,
          selectedCard: null,
          isComplete: matchedCards.every(c => c.matched)
        };
      } else {
        playWrongSound();
        // 记录错误配对
        const wrongPair = {
          kana: prevState.selectedCard.type === 'kana' 
            ? prevState.selectedCard.content 
            : card.content,
          romaji: prevState.selectedCard.type === 'romaji' 
            ? prevState.selectedCard.content 
            : card.content
        };

        // 延迟重置选中状态
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            cards: prev.cards.map(c => ({ ...c, selected: false })),
            selectedCard: null,
            score: Math.max(0, prev.score - 10)
          }));
        }, 1000);

        return {
          ...prevState,
          cards: updatedCards,
          wrongPairs: [...prevState.wrongPairs, wrongPair]
        };
      }
    });
  }, []);

  // 检查两张卡片是否匹配
  const checkMatch = (card1: MatchingCard, card2: MatchingCard) => {
    const kanaCard = card1.type === 'kana' ? card1 : card2;
    const romajiCard = card1.type === 'romaji' ? card1 : card2;
    
    // Check if the kana and romaji content match
    return kanaCard.content === romajiCard.content;
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