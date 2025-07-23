import { useState, useEffect, useCallback, useRef } from 'react';

export type GameState = 'entry' | 'waiting' | 'indicator';
export type IndicatorSide = 'left' | 'right';
export type Feedback = 'success' | 'wrong' | 'tooSoon' | 'tooLate' | null;

export function useGame() {
  const [username, setUsername] = useState('');
  const [gameState, setGameState] = useState<GameState>('entry');
  const [indicatorSide, setIndicatorSide] = useState<IndicatorSide | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [steps, setSteps] = useState(0);
  const [indicatorProgress, setIndicatorProgress] = useState(0); // 0=start, 1=end
  const rafRef = useRef<number | null>(null);

  // Start the game: go to waiting, then indicator
  const startGame = useCallback(() => {
    setGameState('waiting');
    setFeedback(null);
    setIndicatorProgress(0);
    // Wait 2-5 seconds, then show indicator
    const delay = 2000 + Math.random() * 3000;
    setTimeout(() => {
      // Randomly pick left or right
      const side: IndicatorSide = Math.random() < 0.5 ? 'left' : 'right';
      setIndicatorSide(side);
      setGameState('indicator');
    }, delay);
  }, []);

  // Animate indicator progress (for fading)
  useEffect(() => {
    if (gameState !== 'indicator' || feedback) {
      setIndicatorProgress(0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    let start: number | null = null;
    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / 1000, 1); // 1s duration
      setIndicatorProgress(progress);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameState, feedback]);

  // Handle keypress during waiting state (Too Soon)
  useEffect(() => {
    if (gameState !== 'waiting') return;
    const handleKey = () => {
      if (!feedback) setFeedback('tooSoon');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, feedback]);

  // After 'tooSoon' feedback, restart game
  useEffect(() => {
    if (feedback !== 'tooSoon') return;
    const timeout = setTimeout(() => {
      startGame();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [feedback, startGame]);

  // Handle keypress during indicator state
  useEffect(() => {
    if (gameState !== 'indicator' || !indicatorSide) return;

    const handleKey = (e: KeyboardEvent) => {
      if (feedback) return; // Ignore if feedback is already shown
      if (
        (indicatorSide === 'left' && e.key.toLowerCase() === 'a') ||
        (indicatorSide === 'right' && e.key.toLowerCase() === 'l')
      ) {
        setFeedback('success');
      } else {
        setFeedback('wrong');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, indicatorSide, feedback]);

  // After 1s, if no feedback, set feedback to 'tooLate'
  useEffect(() => {
    if (gameState !== 'indicator' || feedback) return;
    const timeout = setTimeout(() => {
      setFeedback('tooLate');
    }, 1000);
    return () => clearTimeout(timeout);
  }, [gameState, feedback]);

  // On success, increment steps and POST to backend (fixed loop)
  useEffect(() => {
    if (feedback !== 'success' || !username) return;
    setSteps(prevSteps => {
      const newSteps = prevSteps + 1;
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, steps: newSteps }),
      });
      return newSteps;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback, username]);

  // After feedback (except tooSoon), restart game (go to waiting state)
  useEffect(() => {
    if (!feedback || feedback === 'tooSoon') return;
    const timeout = setTimeout(() => {
      startGame();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [feedback, startGame]);

  // Reset to entry state (if needed)
  const reset = () => {
    setUsername('');
    setGameState('entry');
    setIndicatorSide(null);
    setFeedback(null);
    setSteps(0);
    setIndicatorProgress(0);
  };

  return {
    username,
    setUsername,
    gameState,
    indicatorSide,
    startGame,
    reset,
    feedback,
    steps,
    indicatorProgress,
  };
} 