import { Button } from '@/components/ui/button';
import { Question, KanaType } from '../../types';

interface QuizResultProps {
  score: number;
  wrongAnswers: Question[];
  onRetry: () => void;
  kanaType: KanaType;
}

export function QuizResult({ score, wrongAnswers, onRetry, kanaType }: QuizResultProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Test Complete!</h2>
        <p className="text-2xl">
          Your Score: {score}/100
        </p>
      </div>

      {wrongAnswers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Review Wrong Answers</h3>
          <div className="space-y-2">
            {wrongAnswers.map((q, index) => (
              <div 
                key={q.id} 
                className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-500">Question {index + 1}</span>
                    <p className="text-lg font-medium mt-1">{q.kana}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 dark:text-green-400">
                      Correct Answer: {q.romaji}
                    </div>
                    {q.userAnswer && (
                      <div className="text-red-600 dark:text-red-400">
                        Your Answer: {q.userAnswer}
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
        Try Again
      </Button>
    </div>
  );
} 