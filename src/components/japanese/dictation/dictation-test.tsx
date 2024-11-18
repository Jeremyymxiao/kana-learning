import { useState, useCallback, useEffect } from 'react';
import { Difficulty } from '@/types/test';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { gojuonData } from '@/data/gojuon';
import { Button } from '@/components/ui/button';

interface KanaChar {
  hiragana: string;
  katakana: string;
  romaji: string;
}

interface DictationState {
  questions: Array<{
    correct: KanaChar;
    options: KanaChar[];
  }>;
  currentIndex: number;
  score: number;
  wrongAnswers: Array<{
    correct: string;
    selected: string;
  }>;
  isComplete: boolean;
}

interface DictationTestProps {
  difficulty: Difficulty;
  onComplete: () => void;
}

export const DictationTest: React.FC<DictationTestProps> = ({ difficulty, onComplete }) => {
  const [state, setState] = useState<DictationState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    wrongAnswers: [],
    isComplete: false
  });

  // 检查数据是否正确加载
  useEffect(() => {
    // 获取所有假名字符
    const allKana: KanaChar[] = [];
    console.log('Available kana:', allKana.length);
    
    // 添加清音
    allKana.push(...gojuonData.seion.vowels);
    gojuonData.seion.consonants.forEach(row => allKana.push(...row));
    
    // 根据难度添加其他假名
    if (difficulty === 'middle' || difficulty === 'hard') {
      // 添加浊音
      gojuonData.dakuon.consonants.forEach(row => allKana.push(...row));
    }
    
    if (difficulty === 'hard') {
      // 添加拗音
      gojuonData.youon.combinations.forEach(row => allKana.push(...row));
    }

    // 生成问题
    const questions = Array(10).fill(null).map(() => {
      const correctAnswer = allKana[Math.floor(Math.random() * allKana.length)];
      const wrongOptions = allKana
        .filter(k => k.romaji !== correctAnswer.romaji)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const options = [...wrongOptions, correctAnswer]
        .sort(() => Math.random() - 0.5);
      
      return {
        correct: correctAnswer,
        options
      };
    });
    
    setState(prev => ({ ...prev, questions }));
  }, [difficulty]);

  // 播放当前假名的音频
  const playCurrentKana = useCallback(() => {
    const currentQuestion = state.questions[state.currentIndex];
    if (currentQuestion) {
      const audio = new Audio(`/audio/${currentQuestion.correct.romaji}.mp3`);
      audio.play().catch(error => console.error('播放音频失败:', error));
    }
  }, [state.questions, state.currentIndex]);

  // 处理选择答案
  const handleSelect = (selected: KanaChar) => {
    const currentQuestion = state.questions[state.currentIndex];
    const isCorrect = selected.romaji === currentQuestion.correct.romaji;

    if (isCorrect) {
      playCorrectSound();
      setState(prev => ({
        ...prev,
        score: prev.score + 1,
        currentIndex: prev.currentIndex + 1,
        isComplete: prev.currentIndex + 1 >= prev.questions.length
      }));
    } else {
      playWrongSound();
      setState(prev => ({
        ...prev,
        wrongAnswers: [...prev.wrongAnswers, {
          correct: currentQuestion.correct.hiragana,
          selected: selected.hiragana
        }],
        currentIndex: prev.currentIndex + 1,
        isComplete: prev.currentIndex + 1 >= prev.questions.length
      }));
    }

    if (state.currentIndex + 1 >= state.questions.length) {
      onComplete();
    }
  };

  if (state.questions.length === 0) {
    return <div>加载中...</div>;
  }

  if (state.isComplete) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">测试完成！</h2>
        <p>得分: {state.score} / {state.questions.length}</p>
        {state.wrongAnswers.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">错误答案:</h3>
            <ul>
              {state.wrongAnswers.map((wrong, index) => (
                <li key={index}>
                  正确答案: {wrong.correct} - 你的选择: {wrong.selected}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentIndex];

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">听写测试</h2>
      <p className="mb-4">当前进度: {state.currentIndex + 1} / 10</p>
      
      {/* 播放音频按钮 */}
      <Button
        onClick={playCurrentKana}
        className="w-32 h-32 rounded-full mb-8 bg-primary text-white"
      >
        播放读音
      </Button>

      {/* 选项按钮组 */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {currentQuestion?.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleSelect(option)}
            variant="outline"
            className="p-6 text-2xl h-24"
          >
            {option.hiragana}
          </Button>
        ))}
      </div>
    </div>
  );
};