import { Button } from '@/components/ui/button';

interface MatchingResultProps {
  score: number;
  wrongPairs: Array<{
    kana: string;
    romaji: string;
  }>;
  onRetry: () => void;
}

export default function MatchingResult({ score, wrongPairs, onRetry }: MatchingResultProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">游戏完成！</h2>
        <p className="text-2xl">
          你的得分: {score}/100
        </p>
      </div>

      {wrongPairs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">错误配对</h3>
          <div className="space-y-2">
            {wrongPairs.map((pair, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">配对 {index + 1}</span>
                    <p className="text-lg font-medium mt-1">{pair.kana}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 dark:text-green-400">
                      正确罗马音: {pair.romaji}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button className="w-full" onClick={onRetry}>
        再次挑战
      </Button>
    </div>
  );
}