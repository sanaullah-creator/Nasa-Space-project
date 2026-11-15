import { useCallback, useEffect, useRef, useState } from 'react';

/** Browser text-to-speech wrapper (Web Speech API). Degrades gracefully when unsupported. */
export function useSpeech() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  }, [supported]);

  const speak = useCallback(
    (text: string, onStart?: () => void) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      setError(false);
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      u.pitch = 1;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) => /en[-_](GB|US)/i.test(v.lang) && /natural|google|samantha|daniel/i.test(v.name)) ??
        voices.find((v) => v.lang.startsWith('en'));
      if (preferred) u.voice = preferred;
      u.onstart = () => {
        setSpeaking(true);
        setPaused(false);
      };
      u.onend = () => {
        setSpeaking(false);
        setPaused(false);
      };
      u.onerror = (e) => {
        setSpeaking(false);
        setPaused(false);
        // 'interrupted' / 'canceled' happen when the user presses Stop — not real failures
        if (e.error !== 'interrupted' && e.error !== 'canceled') setError(true);
      };
      utterRef.current = u;
      window.speechSynthesis.speak(u);
      // Some browsers never fire onstart when muted — mark speaking optimistically.
      setSpeaking(true);
      onStart?.();
    },
    [supported],
  );

  const togglePause = useCallback(() => {
    if (!supported || !speaking) return;
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  }, [supported, speaking, paused]);

  // Stop speaking when the component using this hook unmounts (e.g. navigating away)
  useEffect(() => () => {
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  return { supported, speaking, paused, error, speak, stop, togglePause };
}
