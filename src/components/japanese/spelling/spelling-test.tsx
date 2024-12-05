import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { gojuonData } from '@/data/gojuon';
import { KanaType } from '@/hooks/useTest';

interface SpellingTestProps {
  difficulty: KanaType;
  onComplete: () => void;
}

interface KanaChar {
  hiragana: string;
  katakana: string;
  romaji: string;
}

interface SpellingState {
  questions: KanaChar[];
  currentIndex: number;
  score: number;
  wrongAnswers: Array<{
    kana: string;
    romaji: string;
    userAnswer: string;
  }>;
  isComplete: boolean;
}

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

export const SpellingTest: React.FC<SpellingTestProps> = ({ difficulty: kanaType, onComplete }) => {
  const [state, setState] = useState<SpellingState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    wrongAnswers: [],
    isComplete: false
  });
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  // 初始化测试
  const initTest = useCallback(() => {
    const availableKana = getAvailableKana(kanaType);
    const selectedKana = shuffle(availableKana).slice(0, 10);
    
    setState({
      questions: selectedKana,
      currentIndex: 0,
      score: 0,
      wrongAnswers: [],
      isComplete: false
    });
  }, [kanaType]);

  // 检查答案
  const checkAnswer = useCallback(() => {
    if (isAnswered) return;

    const currentQuestion = state.questions[state.currentIndex];
    const isCorrect = userInput.toLowerCase() === currentQuestion.romaji.toLowerCase();

    setIsAnswered(true);

    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    // 延迟更新状态，让用户看到答案反馈
    setTimeout(() => {
      setState(prev => {
        const nextIndex = prev.currentIndex + 1;
        return {
          ...prev,
          score: isCorrect ? prev.score + 10 : prev.score,
          currentIndex: nextIndex,
          isComplete: nextIndex >= prev.questions.length,
          wrongAnswers: isCorrect 
            ? prev.wrongAnswers 
            : [...prev.wrongAnswers, {
                kana: getDisplayKana(currentQuestion),
                romaji: currentQuestion.romaji,
                userAnswer: userInput
              }]
        };
      });

      setUserInput('');
      setIsAnswered(false);
    }, 1000);
  }, [state.questions, state.currentIndex, userInput, isAnswered]);

  // 获取显示的假名
  const getDisplayKana = (kana: KanaChar) => {
    switch (kanaType) {
      case 'hiragana':
        return kana.hiragana;
      case 'katakana':
        return kana.katakana;
      case 'mixed':
      case 'special':
        return Math.random() > 0.5 ? kana.hiragana : kana.katakana;
      default:
        return kana.hiragana;
    }
  };

  // Fisher-Yates 洗牌算法
  const shuffle = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // 初始化测试
  if (state.questions.length === 0) {
    initTest();
    return <div>Loading...</div>;
  }

  // 显示结果
  if (state.isComplete) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Test Complete!</h2>
          <p className="text-2xl">
            Score: {state.score} / 100
          </p>
        </div>

        {state.wrongAnswers.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Wrong Answers:</h3>
            <div className="space-y-2">
              {state.wrongAnswers.map((wrong, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm text-gray-500">Question {index + 1}</span>
                      <p className="text-lg font-medium mt-1">{wrong.kana}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 dark:text-green-400">
                        Correct: {wrong.romaji}
                      </div>
                      <div className="text-red-600 dark:text-red-400">
                        Your answer: {wrong.userAnswer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button className="w-full" onClick={onComplete}>
          Try Again
        </Button>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentIndex];
  const progress = (state.currentIndex / state.questions.length) * 100;

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Spelling Test</h2>
      <div className="w-full max-w-md mb-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-500 mt-2 text-center">
          Progress: {state.currentIndex + 1} / {state.questions.length}
        </p>
      </div>

      <div className="text-center mb-8">
        <div className="text-6xl font-japanese mb-4">
          {getDisplayKana(currentQuestion)}
        </div>
        <p className="text-sm text-gray-500">Type the romaji for this kana</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && userInput.trim() && !isAnswered) {
              checkAnswer();
            }
          }}
          placeholder="Type romaji here..."
          className={`text-center text-xl h-12 ${
            isAnswered 
              ? userInput.toLowerCase() === currentQuestion.romaji.toLowerCase()
                ? 'border-green-500 bg-green-50'
                : 'border-red-500 bg-red-50'
              : ''
          }`}
          disabled={isAnswered}
        />
        <Button 
          onClick={checkAnswer}
          disabled={!userInput.trim() || isAnswered}
          className="w-full"
        >
          Check Answer
        </Button>
      </div>
    </div>
  );
}; 