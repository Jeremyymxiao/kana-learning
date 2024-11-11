import { Button } from '@/components/ui/button';
import { Question } from '@/hooks/useTest';

interface TestResultProps {
  score: number;
  wrongAnswers: Question[];
  onRetry: () => void;
}

export default function TestResult({ score, wrongAnswers, onRetry }: TestResultProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">测试完成！</h2>
        <p className="text-2xl">
          你的得分: {score}/100
        </p>
      </div>

      {wrongAnswers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">错题回顾</h3>
          <div className="space-y-2">
            {wrongAnswers.map((q, index) => (
              <div 
                key={q.id} 
                className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-500">问题 {index + 1}</span>
                    <p className="text-lg font-medium mt-1">{q.question}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 dark:text-green-400">
                      正确答案: {q.correctAnswer}
                    </div>
                    {q.userAnswer && (
                      <div className="text-red-600 dark:text-red-400">
                        你的答案: {q.userAnswer}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button className="w-full" onClick={onRetry}>
        再次测试
      </Button>
    </div>
  );
}