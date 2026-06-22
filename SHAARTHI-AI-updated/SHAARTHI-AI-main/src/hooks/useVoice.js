import { useCallback } from 'react';

export const useVoice = () => {
  const speakMockText = useCallback((text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  }, []);

  return { speakMockText };
};
