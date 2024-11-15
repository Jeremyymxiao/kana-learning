import { useState } from 'react';
import { useTest, Difficulty } from '@/hooks/useTest';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TestQuestion from './test-question';
import TestResult from './test-result';

export default function TestPanel() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [showConfig, setShowConfig] = useState(true);
  const { 
    startTest, 
    submitAnswer, 
    getCurrentQuestion, 
    currentQuestionIndex, 
    score, 
    isComplete,
    wrongAnswers,
    //questions 
  } = useTest();

  // 计算进度
  const progress = (currentQuestionIndex / 10) * 100;

  // 开始测试
  const handleStart = () => {
    startTest(selectedDifficulty);
    setShowConfig(false);
  };

  // 重新开始测试
  const handleReset = () => {
    setShowConfig(true);
  };

  // 渲染配置面板
  const renderConfig = () => (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Level Option</h3>
        <Select value={selectedDifficulty} onValueChange={(value: Difficulty) => setSelectedDifficulty(value)}>
          <SelectTrigger>
            <SelectValue placeholder="选择难度" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy - Hiragana Only</SelectItem>
            <SelectItem value="middle">Middle - Hiragana+Katakana</SelectItem>
            <SelectItem value="hard">Hard - Including Voice/Contacted Consonants</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full" onClick={handleStart}>
        Start Test
      </Button>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showConfig ? (
        renderConfig()
      ) : (
        <div className="space-y-4 p-4">
          {!isComplete ? (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>进度: {currentQuestionIndex}/10</span>
                  <span>得分: {score}</span>
                </div>
                <Progress value={progress} />
              </div>
              <TestQuestion
                question={getCurrentQuestion()}
                onSubmit={submitAnswer}
              />
            </>
          ) : (
            <TestResult
              score={score}
              wrongAnswers={wrongAnswers}
              onRetry={handleReset}
            />
          )}
        </div>
      )}
    </div>
  );
}