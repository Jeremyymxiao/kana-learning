import { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { useMatchingGame } from '@/hooks/useMatchingGame';
import { Difficulty } from '@/types/test';
import MatchingCard from './matching-card';
import MatchingResult from './matching-result';

interface MatchingGameProps {
  difficulty: Difficulty;
  onComplete: () => void;
}

export default function MatchingGame({ difficulty, onComplete }: MatchingGameProps) {
  const { cards, score, isComplete, wrongPairs, initGame, handleCardSelect } = useMatchingGame(difficulty);

  // 游戏开始时初始化
  useEffect(() => {
    initGame();
  }, [initGame]);

  if (isComplete) {
    return <MatchingResult score={score} wrongPairs={wrongPairs} onRetry={onComplete} />;
  }

  const matchedCount = cards.filter(card => card.matched).length / 2;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>进度: {matchedCount}/10</span>
          <span>得分: {score}</span>
        </div>
        <Progress value={(matchedCount / 10) * 100} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <MatchingCard
            key={card.id}
            content={card.content}
            type={card.type}
            matched={card.matched}
            selected={card.selected}
            onClick={() => handleCardSelect(card)}
          />
        ))}
      </div>
    </div>
  );
}