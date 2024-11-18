import { useState } from 'react';
import { useTest, Difficulty } from '@/hooks/useTest';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TestQuestion from './test-question';
import TestResult from './test-result';
import MatchingGame from './matching/matching-game';
import { DictationTest } from './dictation/dictation-test';

export default function TestPanel() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [testType, setTestType] = useState<'choice' | 'matching' | 'dictation'>('choice');
  const [showConfig, setShowConfig] = useState(true);
  const { 
    startTest, 
    submitAnswer, 
    getCurrentQuestion, 
    currentQuestionIndex, 
    score, 
    isComplete,
    wrongAnswers,
  } = useTest();

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
        <h3 className="text-lg font-medium">Test Type</h3>
        <Select value={testType} onValueChange={(value: 'choice' | 'matching' | 'dictation') => setTestType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="选择测试类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="choice">选择题测试</SelectItem>
            <SelectItem value="matching">配对游戏</SelectItem>
            <SelectItem value="dictation">听写测试</SelectItem>
          </SelectContent>
        </Select>

        
          <>
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
          </>
        
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
          {testType === 'choice' && (
            !isComplete ? (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>进度: {currentQuestionIndex}/10</span>
                    <span>得分: {score}</span>
                  </div>
                  <Progress value={(currentQuestionIndex / 10) * 100} />
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
            )
          )}
          
          {testType === 'matching' && (
            <MatchingGame
              difficulty={selectedDifficulty}
              onComplete={handleReset}
            />
          )}
          
          {testType === 'dictation' && (
            <DictationTest
              difficulty={selectedDifficulty}
              onComplete={handleReset}
            />
          )}
        </div>
      )}
    </div>
  );
}