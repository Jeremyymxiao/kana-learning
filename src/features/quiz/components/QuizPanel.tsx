"use client"

import { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { KanaType, QuizType, Question } from '../types';
import { ArrowLeft } from 'lucide-react';
import { QuizQuestion } from './QuizQuestion/index';
import { QuizResult } from './QuizResult/index';
import { MatchingGame } from './matching/index';
import { DictationQuiz } from './dictation/index';
import { SpellingQuiz } from './spelling/index';

interface QuizPanelProps {
  onConfigChange: (showConfig: boolean) => void;
}

export function QuizPanel({ onConfigChange }: QuizPanelProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<KanaType>('hiragana');
  const [testType, setTestType] = useState<QuizType>('choice');
  const [showConfig, setShowConfig] = useState(true);
  const { 
    startTest, 
    submitAnswer, 
    getCurrentQuestion, 
    currentQuestionIndex, 
    score, 
    isComplete,
    wrongAnswers,
    setScore,
    setCurrentQuestionIndex
  } = useQuiz();

  // 开始测试
  const handleStart = () => {
    startTest(selectedDifficulty, testType);
    setShowConfig(false);
    onConfigChange(false);
  };

  // 重新开始测试
  const handleReset = () => {
    if (isComplete) {
      // 如果是测试完成后的重试，直接开始新测试
      startTest(selectedDifficulty, testType);
    } else {
      // 如果是中途返回，才显示配置页面
      setShowConfig(true);
      onConfigChange(true);
    }
  };

  // 定义测试类型选项
  const quizTypes = [
    { value: 'choice' as const, label: 'Single Choice', description: 'Choose the correct kana or romaji' },
    { value: 'spelling' as const, label: 'Spelling', description: 'Type the romaji for the given kana' },
    { value: 'matching' as const, label: 'Matching Game', description: 'Match kana with their romaji' },
    { value: 'dictation' as const, label: 'Dictation', description: 'Listen and select the correct kana' }
  ];

  // 定义难度选项
  const difficultyLevels = [
    { value: 'hiragana' as const, label: 'Hiragana Only', description: 'Basic Hiragana Characters (あ、い、う...)' },
    { value: 'katakana' as const, label: 'Katakana Only', description: 'Basic Katakana Characters (ア、イ、ウ...)' },
    { value: 'mixed' as const, label: 'Hiragana & Katakana', description: 'Mix of Basic Hiragana and Katakana' },
    { value: 'special' as const, label: 'Special Combinations', description: 'Dakuten, Handakuten & Yōon (が、ぱ、きょ...)' }
  ];

  // 渲染配置面板
  const renderConfig = () => (
    <div className="space-y-8 p-4 w-full max-w-4xl mx-auto">
      {/* Kana Type Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-center">Select Kana Type</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {difficultyLevels.map((level) => (
            <div
              key={level.value}
              onClick={() => setSelectedDifficulty(level.value)}
              className={`cursor-pointer rounded-lg p-6 border-2 transition-all h-24 flex flex-col justify-center items-center text-center
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

      {/* Quiz Type Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-center">Select Quiz Type</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {quizTypes.map((type) => (
            <div
              key={type.value}
              onClick={() => setTestType(type.value)}
              className={`cursor-pointer rounded-lg p-6 border-2 transition-all h-24 flex flex-col justify-center items-center text-center
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

      <Button 
        className="w-full text-lg py-6" 
        onClick={handleStart}
      >
        Start the Quiz
      </Button>
    </div>
  );

  const currentQuestion = getCurrentQuestion();

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
          <div className="flex-1 flex flex-col">
            {testType === 'choice' && (
              isComplete ? (
                <QuizResult
                  score={score}
                  wrongAnswers={wrongAnswers}
                  onRetry={handleReset}
                  kanaType={selectedDifficulty}
                  quizType="choice"
                />
              ) : (
                currentQuestion?.type === 'kanaToRomaji' || currentQuestion?.type === 'romajiToKana' ? (
                  <>
                    <div className="mb-8">
                      <Progress value={(currentQuestionIndex / 10) * 100} />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex-[0.7]" /> {/* 上部空白 */}
                      <QuizQuestion
                        question={currentQuestion}
                        onSubmit={submitAnswer}
                      />
                      <div className="flex-[1.3]" /> {/* 下部空白，比上部空白更大 */}
                    </div>
                  </>
                ) : null
              )
            )}
            
            {testType === 'matching' && (
              <MatchingGame
                difficulty={selectedDifficulty}
                onComplete={handleReset}
              />
            )}
            
            {testType === 'dictation' && (
              <DictationQuiz
                difficulty={selectedDifficulty}
                onComplete={handleReset}
                onScoreChange={setScore}
                onProgressChange={setCurrentQuestionIndex}
              />
            )}

            {testType === 'spelling' && (
              <SpellingQuiz
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