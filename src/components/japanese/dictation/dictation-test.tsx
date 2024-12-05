import { useState, useCallback, useEffect } from 'react';
import { KanaType } from '@/types/test';
import { playCorrectSound, playWrongSound } from '@/lib/audio-utils';
import { gojuonData } from '@/data/gojuon';
import { Button } from '@/components/ui/button';
import { useSpeech } from '@/hooks/useSpeech';
import { Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

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
    question: KanaChar;
    selected: KanaChar;
  }>;
  isComplete: boolean;
}

interface DictationTestProps {
  difficulty: KanaType;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<KanaChar | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const { speak } = useSpeech();

  // 检查数据是否正确加载
  useEffect(() => {
    // 获取所有假名字符
    const allKana: KanaChar[] = [];
    
    // 添加基本假名
    allKana.push(...gojuonData.seion.vowels);
    gojuonData.seion.consonants.forEach(row => allKana.push(...row));
    
    // 根据类型添加其他假名
    if (difficulty === 'special') {
      gojuonData.dakuon.consonants.forEach(row => allKana.push(...row));
      gojuonData.youon.combinations.forEach(row => allKana.push(...row));
    }

    // 随机选择10个不重复的假名作为正确答案
    const shuffledKana = [...allKana].sort(() => Math.random() - 0.5);
    const selectedKana = shuffledKana.slice(0, 10);

    // 生成问题
    const questions = selectedKana.map(correctAnswer => {
      // 从剩余的假名中选择3个作为错误选项
      const wrongOptions = shuffledKana
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
    if (currentQuestion && !isPlaying) {
      setIsPlaying(true);
      speak(currentQuestion.correct.hiragana);
      setTimeout(() => setIsPlaying(false), 1000); // 1秒后重置状态
    }
  }, [state.questions, state.currentIndex, speak, isPlaying]);

  // 处理选择答案
  const handleSelect = (selected: KanaChar) => {
    if (isAnswered) return;
    
    const currentQuestion = state.questions[state.currentIndex];
    const isCorrect = selected.romaji === currentQuestion.correct.romaji;

    setSelectedAnswer(selected);
    setIsAnswered(true);

    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    // 延迟更新状态，让用户看到答案反馈
    setTimeout(() => {
      const nextIndex = state.currentIndex + 1;
      const isTestComplete = nextIndex >= state.questions.length;

      setState(prev => ({
        ...prev,
        score: isCorrect ? prev.score + 10 : prev.score,
        currentIndex: nextIndex,
        isComplete: isTestComplete,
        wrongAnswers: isCorrect 
          ? prev.wrongAnswers 
          : [...prev.wrongAnswers, {
              question: currentQuestion.correct,
              selected: selected
            }]
      }));

      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 1000);
  };

  if (state.questions.length === 0) {
    return <div>Loading...</div>;
  }

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
                      <p className="text-lg font-medium mt-1">{wrong.question.hiragana}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 dark:text-green-400">
                        Correct: {wrong.question.romaji}
                      </div>
                      <div className="text-red-600 dark:text-red-400">
                        Your answer: {wrong.selected.romaji}
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
      <h2 className="text-xl font-bold mb-4">Dictation Test</h2>
      <div className="w-full max-w-md mb-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-500 mt-2 text-center">
          Progress: {state.currentIndex + 1} / {state.questions.length}
        </p>
      </div>
      
      {/* 播放音频按钮 */}
      <Button
        onClick={playCurrentKana}
        disabled={isPlaying}
        className={cn(
          "w-32 h-32 rounded-full mb-8 bg-primary text-white relative",
          "transition-transform duration-200 hover:scale-105",
          isPlaying && "animate-pulse"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Play className={cn(
            "w-8 h-8",
            "transition-transform duration-200",
            isPlaying && "scale-90"
          )} />
          <span className="text-sm">Play Sound</span>
        </div>
      </Button>

      {/* 选项按钮组 */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {currentQuestion?.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={isAnswered}
            variant={isAnswered ? (
              option.romaji === currentQuestion.correct.romaji ? 'default' :
              option === selectedAnswer ? 'destructive' : 'outline'
            ) : 'outline'}
            className={cn(
              "p-6 text-2xl h-24",
              isAnswered && option === selectedAnswer && (
                option.romaji === currentQuestion.correct.romaji
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              )
            )}
          >
            {option.hiragana}
          </Button>
        ))}
      </div>
    </div>
  );
}