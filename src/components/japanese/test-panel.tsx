"use client"

import { useState } from 'react';
import { useTest, Difficulty } from '@/hooks/useTest';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import TestQuestion from './test-question';
import TestResult from './test-result';
import MatchingGame from './matching/matching-game';
import { DictationTest } from './dictation/dictation-test';
import { ArrowLeft } from 'lucide-react';

interface TestPanelProps {
  onConfigChange: (showConfig: boolean) => void;
}

export default function TestPanel({ onConfigChange }: TestPanelProps) {
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
    onConfigChange(false);
  };

  // 重新开始测试
  const handleReset = () => {
    setShowConfig(true);
    onConfigChange(true);
  };

  // 定义测试类型选项
  const quizTypes = [
    { value: 'choice', label: 'Single Choice', description: 'Choose the correct kana or romaji' },
    { value: 'matching', label: 'Matching Game', description: 'Match kana with their romaji' },
    { value: 'dictation', label: 'Dictation', description: 'Listen and select the correct kana' }
  ] as const;

  // 定义难度选项
  const difficultyLevels = [
    { value: 'easy', label: 'Easy', description: 'Hiragana Only' },
    { value: 'middle', label: 'Middle', description: 'Hiragana + Katakana' },
    { value: 'hard', label: 'Hard', description: 'All Kana Types' }
  ] as const;

  // 渲染配置面板
  const renderConfig = () => (
    <div className="space-y-8 p-4 w-full max-w-4xl mx-auto">
      {/* Quiz Type Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-center">Select Quiz Type</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {quizTypes.map((type) => (
            <div
              key={type.value}
              onClick={() => setTestType(type.value)}
              className={`cursor-pointer rounded-lg p-6 border-2 transition-all h-40 flex flex-col justify-center items-center text-center
                ${testType === type.value 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 hover:border-blue-300'
                }`}
            >
              <h4 className="font-bold mb-3">{type.label}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-center">Select Difficulty Level</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {difficultyLevels.map((level) => (
            <div
              key={level.value}
              onClick={() => setSelectedDifficulty(level.value)}
              className={`cursor-pointer rounded-lg p-6 border-2 transition-all h-40 flex flex-col justify-center items-center text-center
                ${selectedDifficulty === level.value 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 hover:border-blue-300'
                }`}
            >
              <h4 className="font-bold mb-3">{level.label}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{level.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Button 
        className="w-full text-lg py-6" 
        onClick={handleStart}
      >
        Start the Quiz
      </Button>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[650px] flex flex-col">
      {showConfig ? (
        renderConfig()
      ) : (
        <div className="relative space-y-4 p-4 flex-1 flex flex-col">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="absolute -top-2 -left-2 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {/* Progress and Score */}
          <div className="text-right text-sm mb-8 pt-1">
            <span>Progress: {currentQuestionIndex}/10</span>
            <span className="ml-4">Score: {score}</span>
          </div>

          {/* 包装测试内容的容器 */}
          <div className="flex-1 flex flex-col justify-center">
            {testType === 'choice' && (
              !isComplete ? (
                <>
                  <div className="space-y-2">
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
        </div>
      )}
    </div>
  );
}