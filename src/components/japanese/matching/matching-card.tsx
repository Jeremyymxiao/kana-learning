import { Button } from '@/components/ui/button';

interface MatchingCardProps {
  content: string;
  type: 'kana' | 'romaji';
  matched: boolean;
  selected: boolean;
  onClick: () => void;
}

export default function MatchingCard({ content, type, matched, selected, onClick }: MatchingCardProps) {
  return (
    <Button
      onClick={onClick}
      disabled={matched}
      variant={matched ? 'default' : selected ? 'secondary' : 'outline'}
      className={`h-24 text-2xl transition-all duration-300 ${
        matched ? 'bg-green-500 hover:bg-green-600 text-white' : 
        selected ? 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800' : ''
      }`}
    >
      {content}
    </Button>
  );
}