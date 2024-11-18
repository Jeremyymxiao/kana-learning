import { useState, useCallback } from 'react';
import { Difficulty } from '@/types/test';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { gojuonData } from '@/data/gojuon';

interface KanaChar {
  hiragana: string;
  katakana: string;
  romaji: string;
}

interface DictationState {
  kanaList: KanaChar[];
  currentIndex: number;
  score: number;
  wrongAnswers: Array<{
    kana: string;
    romaji: string;
    userAnswer: string;
  }>;
  isComplete: boolean;
}

// 从 useTest.ts 复用的函数
const getAvailableKana = (difficulty: Difficulty): KanaChar[] => {
  const kanaChars: KanaChar[] = [];
  
  const addSeion = () => {
    kanaChars.push(...gojuonData.seion.vowels);
    gojuonData.seion.consonants.forEach(row => kanaChars.push(...row));
  };

  const addKatakana = (chars: KanaChar[]) => {
    return chars.map(char => ({ ...char }));
  };

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

const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useDictationTest = (difficulty: Difficulty) => {
  const [state, setState] = useState<DictationState>({
    kanaList: [],
    currentIndex: 0,
    score: 0,
    wrongAnswers: [],
    isComplete: false
  });

  const initTest = useCallback(() => {
    const availableKana = getAvailableKana(difficulty);
    const selectedKana = shuffle(availableKana).slice(0, 10);
    
    setState({
      kanaList: selectedKana,
      currentIndex: 0,
      score: 0,
      wrongAnswers: [],
      isComplete: false
    });
  }, [difficulty]);

  const currentKana = state.kanaList[state.currentIndex];
  const questionIndex = state.currentIndex;

  const playSound = useCallback(() => {
    // TODO: 实现播放当前假名的发音
    console.log('播放发音:', currentKana?.hiragana);
  }, [currentKana]);

  const checkAnswer = useCallback((answer: string) => {
    if (!currentKana) return;

    const isCorrect = 
      answer === currentKana.romaji || 
      answer === currentKana.hiragana || 
      answer === currentKana.katakana;

    if (isCorrect) {
      playCorrectSound();
      setState(prev => ({
        ...prev,
        score: prev.score + 10,
        currentIndex: prev.currentIndex + 1,
        isComplete: prev.currentIndex === 9
      }));
    } else {
      playWrongSound();
      setState(prev => ({
        ...prev,
        score: Math.max(0, prev.score - 10),
        currentIndex: prev.currentIndex + 1,
        isComplete: prev.currentIndex === 9,
        wrongAnswers: [...prev.wrongAnswers, {
          kana: currentKana.hiragana,
          romaji: currentKana.romaji,
          userAnswer: answer
        }]
      }));
    }
  }, [currentKana]);

  return {
    currentKana,
    score: state.score,
    questionIndex,
    isComplete: state.isComplete,
    wrongAnswers: state.wrongAnswers,
    playSound,
    checkAnswer,
    initTest
  };
};