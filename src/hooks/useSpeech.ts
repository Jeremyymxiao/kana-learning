import { useCallback } from 'react';

export const useSpeech = () => {
  const speak = useCallback((text: string) => {
    try {
      if (!window.speechSynthesis) {
        console.warn('Speech synthesis not supported');
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis failed:', error);
    }
  }, []);

  return { speak };
};